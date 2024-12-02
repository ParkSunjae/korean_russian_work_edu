'use client'

import { Volume2, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function VowelsPage() {
  const router = useRouter()
  const vowels = [
    { char: 'ㅏ', name: '아', romanization: 'a', audio: '/audio/vowels/a.mp3' },
    { char: 'ㅑ', name: '야', romanization: 'ya', audio: '/audio/vowels/ya.mp3' },
    { char: 'ㅓ', name: '어', romanization: 'eo', audio: '/audio/vowels/eo.mp3' },
    { char: 'ㅕ', name: '여', romanization: 'yeo', audio: '/audio/vowels/yeo.mp3' },
    { char: 'ㅗ', name: '오', romanization: 'o', audio: '/audio/vowels/o.mp3' },
    { char: 'ㅛ', name: '요', romanization: 'yo', audio: '/audio/vowels/yo.mp3' },
    { char: 'ㅜ', name: '우', romanization: 'u', audio: '/audio/vowels/u.mp3' },
    { char: 'ㅠ', name: '유', romanization: 'yu', audio: '/audio/vowels/yu.mp3' },
    { char: 'ㅡ', name: '으', romanization: 'eu', audio: '/audio/vowels/eu.mp3' },
    { char: 'ㅣ', name: '이', romanization: 'i', audio: '/audio/vowels/i.mp3' },
    { char: 'ㅐ', name: '애', romanization: 'ae', audio: '/audio/vowels/ae.mp3' },
    { char: 'ㅒ', name: '얘', romanization: 'yae', audio: '/audio/vowels/yae.mp3' },
    { char: 'ㅔ', name: '에', romanization: 'e', audio: '/audio/vowels/e.mp3' },
    { char: 'ㅖ', name: '예', romanization: 'ye', audio: '/audio/vowels/ye.mp3' },
    { char: 'ㅘ', name: '와', romanization: 'wa', audio: '/audio/vowels/wa.mp3' },
    { char: 'ㅙ', name: '왜', romanization: 'wae', audio: '/audio/vowels/wae.mp3' },
    { char: 'ㅚ', name: '외', romanization: 'oe', audio: '/audio/vowels/oe.mp3' },
    { char: 'ㅝ', name: '워', romanization: 'wo', audio: '/audio/vowels/wo.mp3' },
    { char: 'ㅞ', name: '웨', romanization: 'we', audio: '/audio/vowels/we.mp3' },
    { char: 'ㅟ', name: '위', romanization: 'wi', audio: '/audio/vowels/wi.mp3' },
    { char: 'ㅢ', name: '의', romanization: 'ui', audio: '/audio/vowels/ui.mp3' },
  ]

  const playAudio = (audioPath: string) => {
    const audio = new Audio(audioPath)
    audio.play().catch(error => {
      console.error('오디오 재생 실패:', error)
      alert('오디오 파일을 재생할 수 없습니다.')
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          뒤로 가기
        </button>
        <h2 className="text-2xl font-bold">한글 모음</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vowels.map((vowel) => (
          <div 
            key={vowel.char}
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="text-5xl font-bold text-blue-600">
                {vowel.char}
              </div>
              <button
                onClick={() => playAudio(vowel.audio)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={`${vowel.name} 발음 듣기`}
              >
                <Volume2 className="w-6 h-6 text-blue-600" />
              </button>
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-gray-800">{vowel.name}</p>
              <p className="text-sm text-gray-600">로마자: {vowel.romanization}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 