import { Notice } from '@/types/notice';

export const getNotices = async (): Promise<Notice[]> => {
  try {
    const response = await fetch('/api/notices');
    if (!response.ok) throw new Error('Failed to fetch notices');
    return response.json();
  } catch (error) {
    console.error('Error fetching notices:', error);
    return [];
  }
};
