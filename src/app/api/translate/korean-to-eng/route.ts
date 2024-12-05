import { NextResponse } from "next/server";

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
    if (/[가-힣]/.test(char)) {
      const code = char.charCodeAt(0) - 0xac00;
      const first = Math.floor(code / 28 / 21);
      const middle = Math.floor((code / 28) % 21);
      const final = code % 28;

      const firstChar = String.fromCharCode(0x1100 + first);
      const middleChar = String.fromCharCode(0x1161 + middle);
      const finalChar = final > 0 ? String.fromCharCode(0x11a7 + final) : "";

      result += (KOREAN_TO_ENG[firstChar] || "") + (KOREAN_TO_ENG[middleChar] || "") + (final > 0 ? KOREAN_TO_ENG[finalChar] || "" : "");
    }
  }
  return result;
}

export async function POST(request: Request) {
  const { korean } = await request.json();
  const pronunciation = koreanToEnglish(korean);
  return NextResponse.json({ pronunciation });
}
