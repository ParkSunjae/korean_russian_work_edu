import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export type Word = {
  id: string;
  korean: string;
  russian: string;
  pronunciation?: string;
  category?: string;
  createdAt: Date;
  listenCount: number;
};

export type Sentence = {
  id: string;
  korean: string;
  russian: string;
  pronunciation?: string;
  koreanDesc?: string;
  russianDesc?: string;
  category: string;
  difficulty?: string;
  listenCount: number;
  createdAt: Date;
};

export type Notice = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Suggestion = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MenuStats = {
  id: string;
  menuName: string;
  menuNameRu: string;
  clickCount: number;
  lastClicked: Date;
};

export type VisitorStats = {
  id: string;
  totalCount: number;
  lastUpdated: Date;
};
