import { NextResponse } from "next/server";
import { v2 } from "@google-cloud/translate";
const { Translate } = v2;

export async function POST(request: Request) {
  try {
    const { korean } = await request.json();

    if (!process.env.GOOGLE_TRANSLATE_API_KEY) {
      throw new Error("Google Translate API key is not configured");
    }

    const translate = new Translate({
      key: process.env.GOOGLE_TRANSLATE_API_KEY,
    });

    const [translation] = await translate.translate(korean, {
      from: "ko",
      to: "ru",
    });

    return NextResponse.json({
      russian: translation,
    });
  } catch (error) {
    console.error("Translation API error:", error);
    return NextResponse.json({ error: "Translation failed", details: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
