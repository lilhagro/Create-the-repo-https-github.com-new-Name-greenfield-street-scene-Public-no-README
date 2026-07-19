import { NextResponse } from "next/server";
import { recommendFromPrompt } from "@/modules/ai/recommend";
import { listMeets } from "@/modules/meets/repository";
import { listProducts } from "@/modules/catalog/repository";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { prompt?: string };
    const prompt = typeof body.prompt === "string" ? body.prompt : "";
    const [products, meets] = await Promise.all([listProducts(), listMeets()]);
    const result = recommendFromPrompt(prompt, products, meets);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Could not process that request." },
      { status: 400 },
    );
  }
}
