import { TextToSpeechClient, protos } from '@google-cloud/text-to-speech'
import { writeFile } from 'fs/promises'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const client = new TextToSpeechClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
})

async function generateAudio(text: string, filename: string, folder: string) {
  const ssml = `
    <speak>
      <prosody rate="medium">${text}</prosody>
    </speak>
  `

  const request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
    input: { ssml },
    voice: { languageCode: 'ko-KR', name: 'ko-KR-Standard-A' },
    audioConfig: {
      audioEncoding: 'MP3' as const,
      speakingRate: 0.9,
    },
  }

  try {
    const [response] = await client.synthesizeSpeech(request)
    const audioPath = path.join(process.cwd(), `public/audio/${folder}`, filename)
    await writeFile(audioPath, response.audioContent as Buffer)
    console.log(`Audio content written to file: ${filename}`)
  } catch (error) {
    console.error('Error generating audio:', error)
  }
}

// 모든 자음+모음 조합 발음 생성
async function generateAllSyllables() {
  const combinations = [
    // ㅏ 행
    { syllable: '가', romaja: 'ga' }, { syllable: '나', romaja: 'na' },
    { syllable: '다', romaja: 'da' }, { syllable: '라', romaja: 'ra' },
    { syllable: '마', romaja: 'ma' }, { syllable: '바', romaja: 'ba' },
    { syllable: '사', romaja: 'sa' }, { syllable: '아', romaja: 'a' },
    { syllable: '자', romaja: 'ja' }, { syllable: '차', romaja: 'cha' },
    { syllable: '카', romaja: 'ka' }, { syllable: '타', romaja: 'ta' },
    { syllable: '파', romaja: 'pa' }, { syllable: '하', romaja: 'ha' },
    
    // ㅑ 행
    { syllable: '갸', romaja: 'gya' }, { syllable: '냐', romaja: 'nya' },
    { syllable: '댜', romaja: 'dya' }, { syllable: '랴', romaja: 'rya' },
    { syllable: '먀', romaja: 'mya' }, { syllable: '뱌', romaja: 'bya' },
    { syllable: '샤', romaja: 'sya' }, { syllable: '야', romaja: 'ya' },
    { syllable: '쟈', romaja: 'jya' }, { syllable: '챠', romaja: 'chya' },
    { syllable: '캬', romaja: 'kya' }, { syllable: '탸', romaja: 'tya' },
    { syllable: '퍄', romaja: 'pya' }, { syllable: '햐', romaja: 'hya' },

    // ㅓ 행
    { syllable: '거', romaja: 'geo' }, { syllable: '너', romaja: 'neo' },
    { syllable: '더', romaja: 'deo' }, { syllable: '러', romaja: 'reo' },
    { syllable: '머', romaja: 'meo' }, { syllable: '버', romaja: 'beo' },
    { syllable: '서', romaja: 'seo' }, { syllable: '어', romaja: 'eo' },
    { syllable: '저', romaja: 'jeo' }, { syllable: '처', romaja: 'cheo' },
    { syllable: '커', romaja: 'keo' }, { syllable: '터', romaja: 'teo' },
    { syllable: '퍼', romaja: 'peo' }, { syllable: '허', romaja: 'heo' },

    // ㅕ 행
    { syllable: '겨', romaja: 'gyeo' }, { syllable: '녀', romaja: 'nyeo' },
    { syllable: '뎌', romaja: 'dyeo' }, { syllable: '려', romaja: 'ryeo' },
    { syllable: '며', romaja: 'myeo' }, { syllable: '벼', romaja: 'byeo' },
    { syllable: '셔', romaja: 'syeo' }, { syllable: '여', romaja: 'yeo' },
    { syllable: '져', romaja: 'jyeo' }, { syllable: '쳐', romaja: 'chyeo' },
    { syllable: '켜', romaja: 'kyeo' }, { syllable: '텨', romaja: 'tyeo' },
    { syllable: '펴', romaja: 'pyeo' }, { syllable: '혀', romaja: 'hyeo' },

    // ㅗ 행
    { syllable: '고', romaja: 'go' }, { syllable: '노', romaja: 'no' },
    { syllable: '도', romaja: 'do' }, { syllable: '로', romaja: 'ro' },
    { syllable: '모', romaja: 'mo' }, { syllable: '보', romaja: 'bo' },
    { syllable: '소', romaja: 'so' }, { syllable: '오', romaja: 'o' },
    { syllable: '조', romaja: 'jo' }, { syllable: '초', romaja: 'cho' },
    { syllable: '코', romaja: 'ko' }, { syllable: '토', romaja: 'to' },
    { syllable: '포', romaja: 'po' }, { syllable: '호', romaja: 'ho' },

    // ㅛ 행
    { syllable: '교', romaja: 'gyo' }, { syllable: '뇨', romaja: 'nyo' },
    { syllable: '됴', romaja: 'dyo' }, { syllable: '료', romaja: 'ryo' },
    { syllable: '묘', romaja: 'myo' }, { syllable: '뵤', romaja: 'byo' },
    { syllable: '쇼', romaja: 'syo' }, { syllable: '요', romaja: 'yo' },
    { syllable: '죠', romaja: 'jyo' }, { syllable: '쵸', romaja: 'chyo' },
    { syllable: '쿄', romaja: 'kyo' }, { syllable: '툐', romaja: 'tyo' },
    { syllable: '표', romaja: 'pyo' }, { syllable: '효', romaja: 'hyo' },

    // ㅜ 행
    { syllable: '구', romaja: 'gu' }, { syllable: '누', romaja: 'nu' },
    { syllable: '두', romaja: 'du' }, { syllable: '루', romaja: 'ru' },
    { syllable: '무', romaja: 'mu' }, { syllable: '부', romaja: 'bu' },
    { syllable: '수', romaja: 'su' }, { syllable: '우', romaja: 'u' },
    { syllable: '주', romaja: 'ju' }, { syllable: '추', romaja: 'chu' },
    { syllable: '쿠', romaja: 'ku' }, { syllable: '투', romaja: 'tu' },
    { syllable: '푸', romaja: 'pu' }, { syllable: '후', romaja: 'hu' },

    // ㅠ 행
    { syllable: '규', romaja: 'gyu' }, { syllable: '뉴', romaja: 'nyu' },
    { syllable: '듀', romaja: 'dyu' }, { syllable: '류', romaja: 'ryu' },
    { syllable: '뮤', romaja: 'myu' }, { syllable: '뷰', romaja: 'byu' },
    { syllable: '슈', romaja: 'syu' }, { syllable: '유', romaja: 'yu' },
    { syllable: '쥬', romaja: 'jyu' }, { syllable: '츄', romaja: 'chyu' },
    { syllable: '큐', romaja: 'kyu' }, { syllable: '튜', romaja: 'tyu' },
    { syllable: '퓨', romaja: 'pyu' }, { syllable: '휴', romaja: 'hyu' },

    // ㅡ 행
    { syllable: '그', romaja: 'geu' }, { syllable: '느', romaja: 'neu' },
    { syllable: '드', romaja: 'deu' }, { syllable: '르', romaja: 'reu' },
    { syllable: '므', romaja: 'meu' }, { syllable: '브', romaja: 'beu' },
    { syllable: '스', romaja: 'seu' }, { syllable: '으', romaja: 'eu' },
    { syllable: '즈', romaja: 'jeu' }, { syllable: '츠', romaja: 'cheu' },
    { syllable: '크', romaja: 'keu' }, { syllable: '트', romaja: 'teu' },
    { syllable: '프', romaja: 'peu' }, { syllable: '흐', romaja: 'heu' },

    // ㅣ 행
    { syllable: '기', romaja: 'gi' }, { syllable: '니', romaja: 'ni' },
    { syllable: '디', romaja: 'di' }, { syllable: '리', romaja: 'ri' },
    { syllable: '미', romaja: 'mi' }, { syllable: '비', romaja: 'bi' },
    { syllable: '시', romaja: 'si' }, { syllable: '이', romaja: 'i' },
    { syllable: '지', romaja: 'ji' }, { syllable: '치', romaja: 'chi' },
    { syllable: '키', romaja: 'ki' }, { syllable: '티', romaja: 'ti' },
    { syllable: '피', romaja: 'pi' }, { syllable: '히', romaja: 'hi' },
  ]

  console.log('자음+모음 조합 발음 생성 시작...')
  for (const combo of combinations) {
    const text = `${combo.syllable}. ${combo.syllable}. ${combo.syllable}`
    await generateAudio(text, `${combo.romaja}.mp3`, 'syllables')
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  console.log('자음+모음 조합 발음 생성 완료!')
}

// 실행
generateAllSyllables() 