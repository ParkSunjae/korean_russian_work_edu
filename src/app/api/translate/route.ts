import { NextResponse } from "next/server";
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { korean } = await request.json();
    const requestHeaders = request.headers;
    const host = requestHeaders.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const referer = `${protocol}://${host}`;

    if (!korean) {
      return NextResponse.json({
        success: false,
        error: "Korean text is required"
      }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: "Translation API key is not configured"
      }, { status: 500 });
    }

    // Google Translate API 호출
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Referer": referer,
          "Origin": referer
        },
        body: JSON.stringify({
          q: korean,
          source: "ko",
          target: "ru",
          format: "text"
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Translation API error:", data);
      return NextResponse.json({
        success: false,
        error: "Translation failed",
        details: data.error?.message || "Unknown error"
      }, { status: response.status });
    }

    return NextResponse.json({
      success: true,
      russian: data.data.translations[0].translatedText
    });

  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json({
      success: false,
      error: "Translation service error",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
