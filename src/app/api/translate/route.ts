import { NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;

export async function POST(request: Request) {
  if (!API_KEY) {
    console.error("Google Translate API key is not set");
    return NextResponse.json({ error: "API key is not configured" }, { status: 500 });
  }

  const { korean } = await request.json();
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

  try {
    // 러시아어 번역만 API로 요청
    const translationResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "http://localhost:3000",
      },
      body: JSON.stringify({
        q: korean,
        target: "ru",
        source: "ko",
        format: "text",
      }),
    });

    const translationData = await translationResponse.json();

    if (!translationResponse.ok) {
      console.error("Translation API error:", translationData);
      throw new Error("Translation failed");
    }

    return NextResponse.json({
      russian: translationData.data?.translations[0]?.translatedText || "",
    });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json({ russian: "" });
  }
}
