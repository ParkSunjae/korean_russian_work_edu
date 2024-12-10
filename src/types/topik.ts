export interface TopikQuestion {
  id: number;
  number: number;
  points: number;
  type: "dialogue" | "passage" | "sequence" | "webPage";
  options: string[];
  correct: string;

  // 듣기 시험 속성
  dialogue?: {
    speaker: string;
    text: string;
  }[];
  text?: string;

  // 읽기 시험 속성
  passage?: string; // 일반 지문
  context?: string; // 대화문이나 짧은 지문
  question?: string; // 문제 질문
  content?: {
    // 웹페이지 형식 문제
    website?: string;
    dialog?: string[];
  };
  sentences?: string[]; // 순서 배열 문제
}

export interface TopikTest {
  testInfo: {
    name: string;
    level: string;
    section: string;
    type: "listening" | "reading";
    totalQuestions: number;
  };
  questions: TopikQuestion[];
}

export interface TopikExample {
  문제번호: string;
  순서: number;
  지시문: string;
  보기대화: {
    // 공통 속성
    본문: string;
    질문?: string;
    답변보기: string[];
    correct: string | number;

    // 듣기 시험 전용 속성 (기존 호환성 유지)
    대화내용?: {
      첫발화: string;
      마지막발화?: string;
    };
    안내문?: string;
    답변?: string;
  };
  적용문제: number[];
}

export interface TopikExamples {
  예제문제: {
    [key: string]: TopikExample;
  };
}
