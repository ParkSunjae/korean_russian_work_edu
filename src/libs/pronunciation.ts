const KOREAN_TO_ENGLISH: { [key: string]: string } = {
  // 초성
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

  // 중성
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

const KOREAN_SYLLABLE_START = 0xac00;
const KOREAN_SYLLABLE_END = 0xd7a3;

const CONSONANTS = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const VOWELS = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
const FINAL_CONSONANTS = " ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";

export function koreanToEnglish(text: string): string {
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const code = char.charCodeAt(0);

    if (code >= KOREAN_SYLLABLE_START && code <= KOREAN_SYLLABLE_END) {
      const offset = code - KOREAN_SYLLABLE_START;
      const initial = Math.floor(offset / 28 / 21);
      const medial = Math.floor((offset / 28) % 21);
      const final = offset % 28;

      result += KOREAN_TO_ENGLISH[CONSONANTS[initial]] || "";
      result += KOREAN_TO_ENGLISH[VOWELS[medial]] || "";
      if (final > 0) {
        result += KOREAN_TO_ENGLISH[FINAL_CONSONANTS[final]] || "";
      }
    } else {
      result += char;
    }
  }

  return result;
}
