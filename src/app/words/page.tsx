'use client'

import { useState } from 'react'
import { ArrowLeft, Volume2, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { koreanDictionary, Word } from '@/utils/dictionary'

export default function WordsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredWords = koreanDictionary.filter((word: Word) => 
    word.korean.includes(searchTerm) ||
    (word.english?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    word.russian.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const playAudio = async (word: string) => {
    try {
      const audio = new Audio(`/audio/words/${word}.mp3`);
      await audio.play();
    } catch (error) {
      console.error('오디오 재생 실패:', error);
      alert('오디오 파일을 재생할 수 없습니다. 파일이 존재하는지 확인해주세요.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          뒤로 가기
        </button>
        <h2 className="text-2xl font-bold">단어 사전</h2>
      </div>

      {/* 검색 영역 */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="한국어, 영어 또는 러시아어로 검색"
            className="w-full pl-10 pr-4 py-2 border rounded-md"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* 단어 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWords.map((word) => (
          <div 
            key={word.korean}
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="text-3xl font-bold text-blue-600">
                {word.korean}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">영어:</span>
                <span className="text-gray-800">{word.english}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">러시아어:</span>
                <span className="text-gray-800">{word.russian}</span>
              </div>
              {word.pronunciation && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-500">발음:</span>
                  <span className="text-gray-800">{word.pronunciation}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredWords.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  )
} 