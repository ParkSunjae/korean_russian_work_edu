import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

async function verifyMigration() {
  try {
    // JSON 파일의 데이터 수
    const dictionaryPath = path.join(process.cwd(), 'public/data/dictionary-data.json');
    const dictionaryContent = await fs.readFile(dictionaryPath, 'utf-8');
    const dictionaryData = JSON.parse(dictionaryContent);
    const jsonWordCount = dictionaryData.words.length;

    // DB의 데이터 수
    const dbWordCount = await prisma.dictionary.count();
    const dbExampleCount = await prisma.example.count();

    console.log('마이그레이션 검증 결과:');
    console.log(`JSON 파일 단어 수: ${jsonWordCount}`);
    console.log(`DB 단어 수: ${dbWordCount}`);
    console.log(`DB 예문 수: ${dbExampleCount}`);

    if (jsonWordCount === dbWordCount) {
      console.log('마이그레이션이 성공적으로 완료되었습니다.');
    } else {
      console.log('마이그레이션 중 일부 데이터가 누락되었을 수 있습니다.');
    }
  } catch (error) {
    console.error('검증 중 오류 발생:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyMigration(); 