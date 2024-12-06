import type { Word } from "@/types/prisma";

export interface GameWord extends Word {
  x: number;
  y: number;
  matched: boolean;
  speed: number;
}
