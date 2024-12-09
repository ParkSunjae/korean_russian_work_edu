export interface TopikQuestion {
  number: number;
  points: number;
  type?: string;
  dialogue?: {
    speaker: string;
    text: string;
    isAnswer?: boolean;
  }[];
  text?: string;
  options: string[];
  correct: string;
  question?: string;
  imageDescription?: string;
  relatedTo?: number;
}

export interface TopikTest {
  testInfo: {
    name: string;
    section: string;
    type: "listening" | "reading";
    totalQuestions: number;
  };
  questions: TopikQuestion[];
}

export interface TopikExample {
  문제번호: string;
  지시문: string;
  보기대화: {
    대화내용?: {
      첫발화: string;
      마지막발화?: string;
    };
    안내문?: string;
    질문?: string;
    답변?: string;
    답변보기: string[];
  };
  적용문제: number[];
}

export interface TopikExamples {
  예제문제: {
    [key: string]: TopikExample;
  };
}
