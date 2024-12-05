import { PrismaClient } from '@prisma/client';

async function checkWordCount() {
  const prisma = new PrismaClient();
  try {
    const count = await prisma.dictionary.count();
    console.log(`단어 테이블의 총 데이터 수: ${count}개`);
  } catch (error) {
    console.error('데이터 확인 중 오류 발생:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkWordCount(); 