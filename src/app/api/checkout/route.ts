import { NextResponse } from "next/server";
import {
  createCheckoutSession,
  type CheckoutLineInput,
} from "@/modules/commerce/checkout";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      lines?: CheckoutLineInput[];
    };

    const result = await createCheckoutSession({
      email: typeof body.email === "string" ? body.email : "",
      lines: Array.isArray(body.lines) ? body.lines : [],
    });

    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Checkout failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
