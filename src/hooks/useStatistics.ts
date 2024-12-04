import { useState, useEffect } from 'react';
import { Statistics } from '@/types/statistics';

export const useStatistics = (interval = 3000) => {
  const [stats, setStats] = useState<Statistics | null>(null);

  const updateStats = async () => {
    try {
      const response = await fetch('/api/statistics', {
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('통계 업데이트 실패:', error);
    }
  };

  useEffect(() => {
    updateStats();
    const timer = setInterval(updateStats, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return { stats, updateStats };
}; 