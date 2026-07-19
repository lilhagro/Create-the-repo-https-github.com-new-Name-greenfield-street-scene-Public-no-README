import Stripe from "stripe";
import { getProductById } from "@/modules/catalog/repository";
import { isDatabaseEnabled, prisma } from "@/shared/db/prisma";

export type CheckoutLineInput = {
  productId: string;
  quantity: number;
};

export type CheckoutResult =
  | { mode: "stripe"; url: string; orderId: string }
  | { mode: "demo"; orderId: string; message: string };

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

function appUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.AUTH_URL) return process.env.AUTH_URL;
  if (process.env.VERCEL_URL) {
    return process.env.VERCEL_URL.startsWith("http")
      ? process.env.VERCEL_URL
      : `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export async function createCheckoutSession(input: {
  email: string;
  lines: CheckoutLineInput[];
  userId?: string;
}): Promise<CheckoutResult> {
  const email = input.email.trim().toLowerCase();
  if (!email || !email.includes("@")) {
    throw new Error("A valid email is required.");
  }
  if (!input.lines.length) {
    throw new Error("Cart is empty.");
  }

  const resolved = [];
  for (const line of input.lines) {
    if (line.quantity < 1 || line.quantity > 20) {
      throw new Error("Invalid quantity.");
    }
    const product = await getProductById(line.productId);
    if (!product) throw new Error(`Unknown product: ${line.productId}`);
    resolved.push({ product, quantity: line.quantity });
  }

  const totalCents = resolved.reduce(
    (sum, row) => sum + row.product.priceCents * row.quantity,
    0,
  );

  let orderId = `demo_${Date.now()}`;

  if (isDatabaseEnabled()) {
    try {
      const order = await prisma.order.create({
        data: {
          email,
          userId: input.userId,
          status: "PENDING",
          totalCents,
          currency: "USD",
          items: {
            create: resolved.map((row) => ({
              productId: row.product.id,
              quantity: row.quantity,
              priceCents: row.product.priceCents,
            })),
          },
        },
      });
      orderId = order.id;
    } catch {
      // Keep demo checkout flowing if product rows aren't in DB yet.
    }
  }

  const stripe = getStripe();
  if (!stripe) {
    return {
      mode: "demo",
      orderId,
      message:
        "Order recorded in demo mode. Add STRIPE_SECRET_KEY to enable real checkout.",
    };
  }

  const base = appUrl();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    line_items: resolved.map((row) => ({
      quantity: row.quantity,
      price_data: {
        currency: "usd",
        unit_amount: row.product.priceCents,
        product_data: {
          name: row.product.name,
          description: row.product.tagline,
        },
      },
    })),
    success_url: `${base}/checkout/success?orderId=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/checkout/cancel?orderId=${orderId}`,
    metadata: { orderId },
  });

  if (isDatabaseEnabled() && session.id && !orderId.startsWith("demo_")) {
    try {
      await prisma.order.update({
        where: { id: orderId },
        data: { stripeSessionId: session.id },
      });
    } catch {
      // non-fatal
    }
  }

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL.");
  }

  return { mode: "stripe", url: session.url, orderId };
}

export async function markOrderPaid(opts: {
  orderId?: string;
  stripeSessionId?: string;
  stripePaymentId?: string;
}) {
  if (!isDatabaseEnabled()) return;

  if (opts.orderId && !opts.orderId.startsWith("demo_")) {
    await prisma.order.updateMany({
      where: { id: opts.orderId },
      data: {
        status: "PAID",
        stripePaymentId: opts.stripePaymentId,
        stripeSessionId: opts.stripeSessionId,
      },
    });
    return;
  }

  if (opts.stripeSessionId) {
    await prisma.order.updateMany({
      where: { stripeSessionId: opts.stripeSessionId },
      data: {
        status: "PAID",
        stripePaymentId: opts.stripePaymentId,
      },
    });
  }
}
