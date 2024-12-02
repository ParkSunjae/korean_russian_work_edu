import { PageLayout } from "@/components/PageLayout";

export default function WordsPage() {
  return (
    <PageLayout title="단어 (Слова)">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {words.map((word) => (
          <div key={word.korean} className="bg-gray-50 p-4 rounded-lg">
            <div className="text-2xl font-bold mb-2">{word.korean}</div>
            <div className="text-sm text-gray-600">
              <div>러시아어: {word.russian}</div>
              <div>로마자: {word.romanization}</div>
              <div className="mt-2 text-gray-700">{word.description}</div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
