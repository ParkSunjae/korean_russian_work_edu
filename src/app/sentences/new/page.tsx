"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";

export default function NewSentencePage() {
  const router = useRouter();
  const [korean, setKorean] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!korean.trim()) return;

    setIsLoading(true);
    try {
      const translateResponse = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ korean: korean.trim() }),
      });

      if (!translateResponse.ok) {
        throw new Error("Translation failed");
      }

      const translateData = await translateResponse.json();
      if (!translateData.success) {
        throw new Error(translateData.error || "Translation failed");
      }

      const response = await fetch("/api/sentence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          korean: korean.trim(),
          russian: translateData.russian,
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/sentences");
      } else {
        alert(data.error || "문장 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("Failed to create sentence:", error);
      alert(error instanceof Error ? error.message : "문장 추가 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <PageHeader title="새 문장 추가" />

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="korean" className="block text-sm font-medium text-gray-700 mb-1">
                한국어 문장
              </label>
              <textarea
                id="korean"
                value={korean}
                onChange={(e) => setKorean(e.target.value)}
                placeholder="한국어 문장을 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isLoading || !korean.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                {isLoading ? "처리 중..." : "추가"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
