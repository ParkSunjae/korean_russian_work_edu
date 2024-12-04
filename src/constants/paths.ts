import path from 'path';

export const DATA_PATHS = {
  STATISTICS: path.join(process.cwd(), 'src', 'data', 'statistics.json'),
  CONSONANTS: path.join(process.cwd(), 'src', 'data', 'consonants.ts'),
  DICTIONARY: path.join(process.cwd(), 'src', 'data', 'dictionary-data.json'),
} as const; 