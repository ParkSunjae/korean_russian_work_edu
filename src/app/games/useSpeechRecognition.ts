"use client";

import { useState, useCallback, useEffect, useRef } from "react";

type RecognitionCallback = (text: string, isFinal: boolean) => void;

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface SpeechRecognitionOptions {
  onResult: (text: string) => void;
  language?: string;
}

// SpeechRecognition 이벤트와 결과 타입 정의
interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: SpeechRecognitionResult;
      isFinal: boolean;
      length: number;
    };
    length: number;
  };
}

export const useSpeechRecognition = ({ onResult, language = "ko-KR" }: SpeechRecognitionOptions) => {
  const SpeechRecognition = typeof window !== "undefined" ? window.SpeechRecognition || window.webkitSpeechRecognition : null;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(Array(event.results.length).keys())
        .map((index) => event.results[index][0].transcript)
        .join("");
      onResult(transcript);
    };
  }

  const startListening = () => {
    if (recognition) {
      try {
        recognition.start();
      } catch (error) {
        console.error("Speech recognition error:", error);
      }
    }
  };

  const stopListening = () => {
    if (recognition) {
      try {
        recognition.stop();
      } catch (error) {
        console.error("Speech recognition error:", error);
      }
    }
  };

  return { startListening, stopListening };
};
