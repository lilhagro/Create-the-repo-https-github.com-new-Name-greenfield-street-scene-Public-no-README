import { NextResponse } from "next/server";
import { recommendFromPrompt } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { prompt?: string };
    const prompt = typeof body.prompt === "string" ? body.prompt : "";
    const result = recommendFromPrompt(prompt);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Could not process that request." },
      { status: 400 },
    );
  }
}
