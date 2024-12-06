"use client";

import { useState, useCallback, useEffect, useRef } from "react";

type RecognitionCallback = (text: string, isFinal: boolean) => void;

declare global {
  interface Window {
    SpeechGrammarList: any;
    webkitSpeechGrammarList: any;
  }
}

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const callbackRef = useRef<RecognitionCallback | null>(null);

  const createRecognitionInstance = useCallback(() => {
    if (typeof window === "undefined") return null;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const instance = new SpeechRecognition();
    instance.continuous = true;
    instance.interimResults = true;
    instance.lang = "ko-KR";

    instance.onstart = () => {
      console.log("Voice recognition started");
      setIsListening(true);
    };

    instance.onend = () => {
      console.log("Voice recognition ended");
      if (callbackRef.current && recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (error) {
          console.warn("Failed to restart recognition:", error);
          setIsListening(false);
        }
      } else {
        setIsListening(false);
      }
    };

    instance.onresult = (event: any) => {
      const results = event.results;
      const lastResult = results[results.length - 1];

      if (lastResult && callbackRef.current) {
        const transcript = lastResult[0].transcript.trim();
        const isFinal = lastResult.isFinal;

        if (transcript) {
          console.log("Recognized:", transcript, isFinal);
          callbackRef.current(transcript, isFinal);
        }
      }
    };

    instance.onerror = (event: any) => {
      console.warn("Recognition error:", event.error);
      setIsListening(false);
    };

    return instance;
  }, []);

  const startListening = useCallback(
    (callback: RecognitionCallback) => {
      callbackRef.current = callback;

      if (!recognitionRef.current) {
        recognitionRef.current = createRecognitionInstance();
      }

      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (error) {
          console.warn("Failed to start recognition:", error);
          setIsListening(false);
        }
      }
    },
    [createRecognitionInstance]
  );

  const stopListening = useCallback(() => {
    callbackRef.current = null;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.warn("Error stopping recognition:", error);
      }
      setIsListening(false);
      recognitionRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    isListening,
    startListening,
    stopListening,
  };
}
