-- CreateTable
CREATE TABLE "Dictionary" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "korean" TEXT NOT NULL,
    "english" TEXT,
    "russian" TEXT NOT NULL,
    "pronunciation" TEXT NOT NULL,
    "definition" TEXT,
    "definition_ru" TEXT,
    "category" TEXT NOT NULL DEFAULT '기본',
    "difficulty" TEXT NOT NULL DEFAULT '초급',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Statistics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "totalVisits" INTEGER NOT NULL DEFAULT 0,
    "lastUpdated" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MenuStats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "menuId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "lastClicked" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "WordStats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "korean" TEXT NOT NULL,
    "russian" TEXT NOT NULL,
    "pronunciation" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "lastUsed" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WordStats_korean_fkey" FOREIGN KEY ("korean") REFERENCES "Dictionary" ("korean") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Notice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "GameRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "score" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Example" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "dictionaryId" TEXT NOT NULL,
    CONSTRAINT "Example_dictionaryId_fkey" FOREIGN KEY ("dictionaryId") REFERENCES "Dictionary" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Dictionary_korean_key" ON "Dictionary"("korean");

-- CreateIndex
CREATE UNIQUE INDEX "MenuStats_menuId_key" ON "MenuStats"("menuId");

-- CreateIndex
CREATE UNIQUE INDEX "WordStats_korean_key" ON "WordStats"("korean");
