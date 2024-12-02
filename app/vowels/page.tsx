import { PageLayout } from "@/components/PageLayout";

export default function VowelsPage() {
  return (
    <PageLayout title="모음 (Гласные)">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vowels.map((vowel) => (
          <div key={vowel.char} className="bg-gray-50 p-4 rounded-lg">
            <div className="text-4xl md:text-5xl font-bold text-center mb-2">{vowel.char}</div>
            <div className="text-sm text-gray-600 text-center">
              <div>{vowel.romanization}</div>
              <div className="mt-1">{vowel.pronunciation}</div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
