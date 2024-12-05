import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface DictionaryWord {
  korean: string;
  english: string;
  russian: string;
  pronunciation: string;
  definition?: string;
  definition_ru?: string;
  category?: string;
  difficulty?: string;
  examples?: string[];
}

interface Statistics {
  totalVisits: number;
  lastUpdated: string;
  menuStats: Record<string, {
    name: string;
    nameRu: string;
    count: number;
    lastClicked: string;
  }>;
  wordStats: Array<{
    korean: string;
    russian: string;
    pronunciation: string;
    count: number;
  }>;
}

interface Notice {
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

const prisma = new PrismaClient();

async function migrateData() {
  try {
    // 기존 데이터 삭제
    await prisma.example.deleteMany();
    await prisma.wordStats.deleteMany();
    await prisma.dictionary.deleteMany();
    await prisma.menuStats.deleteMany();
    await prisma.statistics.deleteMany();
    await prisma.notice.deleteMany();

    // 단어 데이터 마이그레이션
    console.log('단어 데이터 마이그레이션 시작...');
    const dictionaryData = await fs.readFile(
      path.join(process.cwd(), 'public', 'data', 'dictionary-data.json'),
      'utf-8'
    );
    const { words } = JSON.parse(dictionaryData) as { words: DictionaryWord[] };

    for (const word of words) {
      try {
        const { examples, ...wordData } = word;
        await prisma.dictionary.create({
          data: {
            ...wordData,
            examples: {
              create: examples?.map((text: string) => ({ text })) || []
            }
          }
        });
        console.log(`단어 "${word.korean}" 추가됨`);
      } catch (error) {
        console.error(`단어 "${word.korean}" 추가 실패:`, error);
      }
    }

    // 통계 데이터 마이그레이션
    console.log('\n통계 데이터 마이그레이션 시작...');
    try {
      const statsData = await fs.readFile(
        path.join(process.cwd(), 'public', 'data', 'statistics.json'),
        'utf-8'
      );
      const stats = JSON.parse(statsData) as Statistics;

      // 기본 통계 생성
      await prisma.statistics.create({
        data: {
          totalVisits: stats.totalVisits || 0,
          lastUpdated: new Date(stats.lastUpdated || Date.now())
        }
      });

      // 메뉴 통계 생성
      if (stats.menuStats) {
        for (const [menuId, stat] of Object.entries(stats.menuStats)) {
          await prisma.menuStats.create({
            data: {
              menuId,
              name: stat.name,
              nameRu: stat.nameRu,
              count: stat.count || 0,
              lastClicked: new Date(stat.lastClicked || Date.now())
            }
          });
        }
      }

      // 단어 통계 생성
      if (Array.isArray(stats.wordStats)) {
        for (const stat of stats.wordStats) {
          try {
            await prisma.wordStats.create({
              data: {
                korean: stat.korean,
                russian: stat.russian,
                pronunciation: stat.pronunciation,
                count: stat.count || 0,
                lastUsed: new Date()
              }
            });
          } catch (error) {
            console.error(`단어 통계 "${stat.korean}" 추가 실패:`, error);
          }
        }
      }
      console.log('통계 데이터 마이그레이션 완료');
    } catch (error) {
      console.error('통계 데이터 마이그레이션 실패:', error);
    }

    // 공지사항 마이그레이션
    console.log('\n공지사항 마이그레이션 시작...');
    try {
      const noticesData = await fs.readFile(
        path.join(process.cwd(), 'public', 'data', 'notices.json'),
        'utf-8'
      );
      const notices = JSON.parse(noticesData) as Notice[];

      for (const notice of notices) {
        await prisma.notice.create({
          data: {
            title: notice.title,
            content: notice.content,
            createdAt: new Date(notice.createdAt),
            updatedAt: new Date(notice.updatedAt || notice.createdAt)
          }
        });
        console.log(`공지사항 "${notice.title}" 추가됨`);
      }
      console.log('공지사항 마이그레이션 완료');
    } catch (error: any) {
      if (error?.code === 'ENOENT') {
        console.log('공지사항 파일이 없습니다. 건너뜁니다.');
      } else {
        console.error('공지사항 마이그레이션 실패:', error);
      }
    }

    console.log('\n전체 마이그레이션 완료');
  } catch (error) {
    console.error('마이그레이션 중 오류 발생:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateData(); 