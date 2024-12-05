import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { Suggestion } from "@/types/suggestion";

const SUGGESTIONS_FILE = path.join(process.cwd(), "src/data/suggestions.json");

async function readSuggestions(): Promise<Suggestion[]> {
  const data = await fs.readFile(SUGGESTIONS_FILE, "utf-8");
  return JSON.parse(data);
}

async function writeSuggestions(suggestions: Suggestion[]): Promise<void> {
  await fs.writeFile(SUGGESTIONS_FILE, JSON.stringify(suggestions, null, 2));
}

export async function GET() {
  const suggestions = await readSuggestions();
  return NextResponse.json(suggestions);
}

export async function POST(request: Request) {
  const newSuggestion: Omit<Suggestion, "id" | "createdAt"> = await request.json();
  const suggestions = await readSuggestions();

  const suggestionToAdd: Suggestion = {
    ...newSuggestion,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };

  suggestions.push(suggestionToAdd);
  await writeSuggestions(suggestions);
  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  const updatedSuggestion = await request.json();
  const suggestions = await readSuggestions();
  const index = suggestions.findIndex((s) => s.id === updatedSuggestion.id);
  if (index !== -1) {
    suggestions[index] = { ...suggestions[index], ...updatedSuggestion };
    await writeSuggestions(suggestions);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Suggestion not found" }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const suggestions = await readSuggestions();
  const filtered = suggestions.filter((s) => s.id !== id);
  await writeSuggestions(filtered);
  return NextResponse.json({ success: true });
}
