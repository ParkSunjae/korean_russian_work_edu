-- CreateTable
CREATE TABLE "Word" (
    "id" TEXT NOT NULL,
    "korean" TEXT NOT NULL,
    "russian" TEXT NOT NULL,
    "pronunciation" TEXT,
    "category" TEXT,
    "subcategory" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "listenCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sentence" (
    "id" TEXT NOT NULL,
    "korean" TEXT NOT NULL,
    "russian" TEXT NOT NULL,
    "pronunciation" TEXT,
    "koreanDesc" TEXT,
    "russianDesc" TEXT,
    "category" TEXT NOT NULL,
    "difficulty" TEXT,
    "listenCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sentence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitorStats" (
    "id" TEXT NOT NULL,
    "totalCount" INTEGER NOT NULL DEFAULT 0,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisitorStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suggestion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Suggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notice" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuStats" (
    "id" TEXT NOT NULL,
    "menuName" TEXT NOT NULL,
    "menuNameRu" TEXT NOT NULL,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "lastClicked" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MenuStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordStats" (
    "id" TEXT NOT NULL,
    "wordId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "lastUsed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WordStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Word_korean_russian_key" ON "Word"("korean", "russian");

-- CreateIndex
CREATE UNIQUE INDEX "Sentence_korean_key" ON "Sentence"("korean");

-- CreateIndex
CREATE UNIQUE INDEX "MenuStats_menuName_key" ON "MenuStats"("menuName");

-- CreateIndex
CREATE INDEX "WordStats_wordId_idx" ON "WordStats"("wordId");

-- AddForeignKey
ALTER TABLE "WordStats" ADD CONSTRAINT "WordStats_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
