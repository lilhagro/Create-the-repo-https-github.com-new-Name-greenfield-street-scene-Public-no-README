import type { Metadata } from "next";
import { Archivo_Black, Outfit } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/modules/commerce/cart-context";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display-family",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body-family",
});

export const metadata: Metadata = {
  title: "Greenfield Street Scene — Car Meets & Merch | Greenfield, IN",
  description:
    "Greenfield, Indiana car meets and merch. Shop the drop, find local lots, and get AI Fit recommendations from Greenfield Street Scene.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivoBlack.variable} ${outfit.variable}`}>
      <body>
        <CartProvider>
          <div className="page-shell">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
