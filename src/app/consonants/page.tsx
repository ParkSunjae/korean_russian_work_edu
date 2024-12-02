'use client'

import { Volume2, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ConsonantsPage() {
  const router = useRouter()
  const consonants = [
    { char: 'ㄱ', name: '기역', romanization: 'g/k', audio: '/audio/consonants/giyeok.mp3' },
    { char: 'ㄴ', name: '니은', romanization: 'n', audio: '/audio/consonants/nieun.mp3' },
    { char: 'ㄷ', name: '디귿', romanization: 'd/t', audio: '/audio/consonants/digeut.mp3' },
    { char: 'ㄹ', name: '리을', romanization: 'r/l', audio: '/audio/consonants/rieul.mp3' },
    { char: 'ㅁ', name: '미음', romanization: 'm', audio: '/audio/consonants/mieum.mp3' },
    { char: 'ㅂ', name: '비읍', romanization: 'b/p', audio: '/audio/consonants/bieup.mp3' },
    { char: 'ㅅ', name: '시옷', romanization: 's', audio: '/audio/consonants/siot.mp3' },
    { char: 'ㅇ', name: '이응', romanization: 'ng', audio: '/audio/consonants/ieung.mp3' },
    { char: 'ㅈ', name: '지읒', romanization: 'j', audio: '/audio/consonants/jieut.mp3' },
    { char: 'ㅊ', name: '치읓', romanization: 'ch', audio: '/audio/consonants/chieut.mp3' },
    { char: 'ㅋ', name: '키읔', romanization: 'k', audio: '/audio/consonants/kieuk.mp3' },
    { char: 'ㅌ', name: '티읕', romanization: 't', audio: '/audio/consonants/tieut.mp3' },
    { char: 'ㅍ', name: '피읖', romanization: 'p', audio: '/audio/consonants/pieup.mp3' },
    { char: 'ㅎ', name: '히읗', romanization: 'h', audio: '/audio/consonants/hieut.mp3' },
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
        <h2 className="text-2xl font-bold">한글 자음</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {consonants.map((consonant) => (
          <div 
            key={consonant.char}
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="text-5xl font-bold text-blue-600">
                {consonant.char}
              </div>
              <button
                onClick={() => playAudio(consonant.audio)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={`${consonant.name} 발음 듣기`}
              >
                <Volume2 className="w-6 h-6 text-blue-600" />
              </button>
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-gray-800">{consonant.name}</p>
              <p className="text-sm text-gray-600">로마자: {consonant.romanization}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 