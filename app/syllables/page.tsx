import { PageLayout } from "@/components/PageLayout";

export default function SyllablesPage() {
  return (
    <PageLayout title="자음 + 모음 (Слоги)">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {syllables.map((group) => (
            <div key={group.consonant} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{group.consonant}</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                {group.combinations.map((combo) => (
                  <div key={combo} className="p-2 bg-white rounded">
                    {combo}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
