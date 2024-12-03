"use client";

import { useState, useEffect, useRef } from "react";
import PageLayout from "@/components/PageLayout";

interface Word {
  korean: string;
  russian: string;
  romanization: string;
  y: number;
  x: number;
  speed: number;
  angle: number;
  amplitude: number;
}

interface Lighthouse {
  health: number;
  maxHealth: number;
  width: number;
  height: number;
}

export default function GamesPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [score, setScore] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [lighthouse, setLighthouse] = useState<Lighthouse>({
    health: 10,
    maxHealth: 10,
    width: 60,
    height: 120,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const recognitionRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  const sampleWords = [
    { korean: "안녕", russian: "Привет", romanization: "annyeong" },
    { korean: "감사", russian: "Спасибо", romanization: "gamsa" },
    // ... 더 많은 단어 추가
  ];

  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    // Web Speech API 초기화
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = "ko-KR";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        checkPronunciation(transcript);
      };
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // 화면 크기에 따른 캔버스 크기 조정
    const handleResize = () => {
      const width = Math.min(800, window.innerWidth - 32); // 패딩 고려
      const height = (width * 3) / 4; // 4:3 비율 유지
      setCanvasSize({ width, height });

      // 캔버스 크기가 변경되면 현재 컨텍스트도 업데이트
      if (canvasRef.current) {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // 모바일 체크
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const drawWater = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // 물결 효과를 위한 그라데이션
    const gradient = ctx.createLinearGradient(0, canvas.height - 100, 0, canvas.height);
    gradient.addColorStop(0, "#2196F3");
    gradient.addColorStop(1, "#1976D2");

    ctx.fillStyle = gradient;
    ctx.beginPath();

    // 물결 효과
    ctx.moveTo(0, canvas.height - 50);
    for (let x = 0; x <= canvas.width; x += 50) {
      const y = canvas.height - 30 + Math.sin(Date.now() / 500 + x / 50) * 10;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fill();
  };

  const drawLighthouse = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const x = canvas.width / 2 - lighthouse.width / 2;
    const y = canvas.height - lighthouse.height - 30; // 물 위에 위치

    // 등대 기둥
    ctx.fillStyle = "#E0E0E0";
    ctx.fillRect(x, y + 40, lighthouse.width, lighthouse.height - 40);

    // 등대 상단
    ctx.fillStyle = "#F44336";
    ctx.beginPath();
    ctx.moveTo(x, y + 40);
    ctx.lineTo(x + lighthouse.width / 2, y);
    ctx.lineTo(x + lighthouse.width, y + 40);
    ctx.closePath();
    ctx.fill();

    // 생명력 바
    const healthBarWidth = 100;
    const healthBarHeight = 10;
    const healthBarX = x - (healthBarWidth - lighthouse.width) / 2;
    const healthBarY = y - 20;

    // 배경
    ctx.fillStyle = "#E0E0E0";
    ctx.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

    // 생명력
    ctx.fillStyle = "#4CAF50";
    const currentHealth = (lighthouse.health / lighthouse.maxHealth) * healthBarWidth;
    ctx.fillRect(healthBarX, healthBarY, currentHealth, healthBarHeight);
  };

  const drawWord = (ctx: CanvasRenderingContext2D, word: Word) => {
    ctx.save(); // 현재 컨텍스트 상태 저장

    // 텍스트 측정을 위한 폰트 설정
    ctx.font = "bold 24px Arial";
    const metrics = ctx.measureText(word.korean);
    const padding = 8;
    const bgWidth = metrics.width + padding * 2;
    const bgHeight = 40;

    // 배경 그리기
    ctx.fillStyle = word === currentWord ? "rgba(76, 175, 80, 0.2)" : "rgba(255, 255, 255, 0.9)";
    ctx.fillRect(word.x - padding, word.y - bgHeight / 2, bgWidth, bgHeight);

    // 한국어 텍스트
    ctx.fillStyle = word === currentWord ? "#4CAF50" : "#000";
    ctx.textBaseline = "middle";
    ctx.fillText(word.korean, word.x, word.y);

    // 러시아어 텍스트
    ctx.font = "12px Arial";
    ctx.fillStyle = "#666";
    ctx.fillText(word.russian, word.x, word.y + bgHeight / 2 + 4);

    ctx.restore(); // 컨텍스트 상태 복원
  };

  const startGame = () => {
    // 게임 상태 초기화
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setWords([]);
    setLighthouse((prev) => ({ ...prev, health: prev.maxHealth }));

    // 캔버스 초기화 및 첫 렌더링
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        // 초기 화면 그리기
        drawInitialScreen(ctx, canvasRef.current);

        // 첫 단어 생성
        const firstWord = {
          ...sampleWords[Math.floor(Math.random() * sampleWords.length)],
          y: 0,
          x: canvasRef.current.width / 2 - 50, // 화면 중앙에서 시작
          speed: 1 + Math.random() * 2,
          angle: Math.random() * Math.PI * 2,
          amplitude: 30 + Math.random() * 50,
        };

        setWords([firstWord]);
        requestAnimationFrame(animate); // 애니메이션 시작
        setTimeout(spawnWords, 2000); // 2초 후 추가 단어 생성 시작
      }
    }
  };

  // 초기 화면 그리기 함수 추가
  const drawInitialScreen = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // 배경 그리기
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height - 100);
    gradient.addColorStop(0, "#87CEEB");
    gradient.addColorStop(1, "#ADD8E6");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 물과 등대 그리기
    drawWater(ctx, canvas);
    drawLighthouse(ctx, canvas);
  };

  const animate = () => {
    if (!canvasRef.current || !isPlaying) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. 화면 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. 배경, 물, 등대 그리기
    drawInitialScreen(ctx, canvas);

    // 3. 단어 위치 업데이트
    const updatedWords = words.map((word) => {
      const wiggle = Math.sin(word.angle) * word.amplitude;
      const newX = word.x + wiggle * 0.02;
      const newY = word.y + word.speed;
      const newAngle = word.angle + 0.02;
      const boundedX = Math.max(50, Math.min(canvas.width - 50, newX));

      // 바다에 닿았는지 확인
      if (newY > canvas.height - 100) {
        setLighthouse((prev) => {
          const newHealth = Math.max(0, prev.health - 1);
          if (newHealth === 0) {
            setGameOver(true); // 생명력이 0일 때만 게임 오버
          }
          return { ...prev, health: newHealth };
        });

        // 새로운 위치에서 단어 재시작
        return {
          ...word,
          y: 0,
          x: Math.random() * (canvas.width - 100),
          angle: Math.random() * Math.PI * 2,
          speed: 1 + Math.random() * 2,
        };
      }

      return {
        ...word,
        x: boundedX,
        y: newY,
        angle: newAngle,
      };
    });

    // 4. 업데이트된 단어들 그리기 (배경 위에)
    updatedWords.forEach((word) => {
      drawWord(ctx, word);
    });

    setWords(updatedWords);

    if (!gameOver) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  };

  const spawnWords = () => {
    if (gameOver) return;

    const newWord = {
      ...sampleWords[Math.floor(Math.random() * sampleWords.length)],
      y: 0,
      x: Math.random() * (canvasRef.current?.width || 800 - 100),
      speed: 1 + Math.random() * 2, // 속도 범위 증가
      angle: Math.random() * Math.PI * 2, // 랜덤 각도
      amplitude: 30 + Math.random() * 50, // 좌우 움직임 폭
    };

    setWords((prev) => [...prev, newWord]);
    setTimeout(spawnWords, 2000 + Math.random() * 2000); // 랜덤 간격으로 생성
  };

  const stopGame = () => {
    setIsPlaying(false);
    resetGame(); // 게임 상태 초기화
  };

  const resetGame = () => {
    setIsPlaying(false);
    setGameOver(false);
    setScore(0);
    setWords([]);
    setLighthouse((prev) => ({ ...prev, health: prev.maxHealth }));
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!isListening) {
        // 마이크 시작
        setIsListening(true);
        recognitionRef.current?.start();
      } else {
        // 마이크 중지
        setIsListening(false);
        recognitionRef.current?.stop();
      }
    }
  };

  const checkPronunciation = (transcript: string) => {
    if (!currentWord) return;

    // 간단한 유사도 체크 (실제로는 더 복잡한 알고리즘 필요)
    const similarity = calculateSimilarity(transcript, currentWord.korean);

    if (similarity >= 0.7) {
      setScore((prev) => prev + 100);
      setWords((prev) => prev.filter((w) => w !== currentWord));
      setCurrentWord(null);
    }
  };

  const calculateSimilarity = (str1: string, str2: string): number => {
    // 여기에 발음 유사도 체크 알고리즘 구현
    // 예: Levenshtein distance 또는 다른 문자열 유사도 알고리즘 사용
    return 0.8; // 임시 반환값
  };

  return (
    <PageLayout title="발음 게임" titleRu="Игра произношения" showBackButton>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-x-4">
            <span className="text-xl font-bold">점수: {score}</span>
            <span className="text-xl font-bold">생명력: {lighthouse.health}</span>
          </div>
          {isPlaying ? (
            <button onClick={stopGame} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
              게임 종료
            </button>
          ) : (
            <button onClick={startGame} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              게임 시작
            </button>
          )}
        </div>

        <div className="w-full flex justify-center">
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            className={`border border-gray-200 rounded-lg bg-white ${!isPlaying && "opacity-50"}`}
          />
        </div>

        <div className="text-center space-y-2">
          {isPlaying && (
            <>
              {isMobile ? (
                // 모바일용 마이크 버튼
                <button
                  onClick={() => {
                    if (!isListening) {
                      setIsListening(true);
                      recognitionRef.current?.start();
                    } else {
                      setIsListening(false);
                      recognitionRef.current?.stop();
                    }
                  }}
                  className={`
                    px-6 py-3 rounded-full text-white transition-colors
                    ${isListening ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}
                  `}
                >
                  {isListening ? "마이크 끄기" : "마이크 켜기"}
                </button>
              ) : (
                <div className={`text-lg ${isListening ? "text-green-500" : "text-gray-500"}`}>
                  {isListening ? "말하세요..." : "Enter 키를 눌러 마이크 켜기"}
                </div>
              )}
              {currentWord && <div className="text-sm text-gray-600">발음: {currentWord.romanization}</div>}
            </>
          )}
          {!isPlaying && <div className="text-lg text-gray-500">게임을 시작하려면 위의 시작 버튼을 클릭하세요</div>}
        </div>

        {gameOver && lighthouse.health === 0 && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">게임 오버!</h2>
              <p className="mb-4">최종 점수: {score}</p>
              <div className="space-x-4">
                <button onClick={startGame} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  다시 시작
                </button>
                <button onClick={resetGame} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
                  나가기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
