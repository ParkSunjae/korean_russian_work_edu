import { NextResponse } from "next/server";
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    // 요청 본문이 비어있는지 확인
    if (!request.body) {
      return NextResponse.json({
        success: false,
        error: "Request body is empty"
      }, { status: 400 });
    }

    let korean;
    try {
      const body = await request.json();
      korean = body.korean;
    } catch (e) {
      return NextResponse.json({
        success: false,
        error: "Invalid JSON in request body"
      }, { status: 400 });
    }

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

    try {
      // Google Translate API 호출
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q: korean,
            source: "ko",
            target: "ru",
            format: "text"
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Translation API error response:', errorText);
        return NextResponse.json({
          success: false,
          error: "Translation API error",
          details: errorText
        }, { status: response.status });
      }

      const data = await response.json();
      
      if (!data?.data?.translations?.[0]?.translatedText) {
        return NextResponse.json({
          success: false,
          error: "Invalid translation response format"
        }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        russian: data.data.translations[0].translatedText
      });

    } catch (error) {
      console.error('Translation API call error:', error);
      return NextResponse.json({
        success: false,
        error: "Translation service error",
        details: error instanceof Error ? error.message : "Unknown error"
      }, { status: 500 });
    }

  } catch (error) {
    console.error('General error:', error);
    return NextResponse.json({
      success: false,
      error: "Server error",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
