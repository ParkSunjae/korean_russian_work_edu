import { NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;

// 한글 초성 매핑
const KOREAN_TO_ENG: { [key: string]: string } = {
  ㄱ: "g",
  ㄲ: "kk",
  ㄴ: "n",
  ㄷ: "d",
  ㄸ: "tt",
  ㄹ: "r",
  ㅁ: "m",
  ㅂ: "b",
  ㅃ: "pp",
  ㅅ: "s",
  ㅆ: "ss",
  ㅇ: "",
  ㅈ: "j",
  ㅉ: "jj",
  ㅊ: "ch",
  ㅋ: "k",
  ㅌ: "t",
  ㅍ: "p",
  ㅎ: "h",
  // 모음
  ㅏ: "a",
  ㅐ: "ae",
  ㅑ: "ya",
  ㅒ: "yae",
  ㅓ: "eo",
  ㅔ: "e",
  ㅕ: "yeo",
  ㅖ: "ye",
  ㅗ: "o",
  ㅘ: "wa",
  ㅙ: "wae",
  ㅚ: "oe",
  ㅛ: "yo",
  ㅜ: "u",
  ㅝ: "wo",
  ㅞ: "we",
  ㅟ: "wi",
  ㅠ: "yu",
  ㅡ: "eu",
  ㅢ: "ui",
  ㅣ: "i",
};

function koreanToEnglish(text: string): string {
  let result = "";
  for (let char of text) {
    // 한글인 경우
    if (/[가-힣]/.test(char)) {
      const code = char.charCodeAt(0) - 0xac00;

      // 초성, 중성, 종성 분리
      const first = Math.floor(code / 28 / 21);
      const middle = Math.floor((code / 28) % 21);
      const final = code % 28;

      const firstChar = String.fromCharCode(0x1100 + first);
      const middleChar = String.fromCharCode(0x1161 + middle);
      const finalChar = final > 0 ? String.fromCharCode(0x11a7 + final) : "";

      // 초성, 중성, 종성을 영문으로 변환
      result += (KOREAN_TO_ENG[firstChar] || "") + (KOREAN_TO_ENG[middleChar] || "") + (final > 0 ? KOREAN_TO_ENG[finalChar] || "" : "");
    }
  }
  return result;
}

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

    // 한글을 영문으로 변환
    const pronunciation = koreanToEnglish(korean);

    return NextResponse.json({
      russian: translationData.data?.translations[0]?.translatedText || "",
      pronunciation: pronunciation,
    });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json({ russian: "", pronunciation: "" });
  }
}
