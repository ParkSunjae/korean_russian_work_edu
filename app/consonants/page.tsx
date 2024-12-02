import { PageLayout } from "@/components/PageLayout";

export default function ConsonantsPage() {
  return (
    <PageLayout title="자음 (Согласные)">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {consonants.map((consonant) => (
          <div key={consonant.char} className="bg-gray-50 p-4 rounded-lg">
            <div className="text-4xl md:text-5xl font-bold text-center mb-2">{consonant.char}</div>
            <div className="text-sm text-gray-600 text-center">
              <div>{consonant.romanization}</div>
              <div className="mt-1">{consonant.pronunciation}</div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
