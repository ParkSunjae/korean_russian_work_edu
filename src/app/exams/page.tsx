"use client";

import { useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";

const TOPIK_EXAMS = [
  {
    id: "91B",
    fileId: "91_B",
    name: "제91회 한국어능력시험 I B형",
    section: "듣기 통합 (1번 ~ 31번)",
    type: "listening",
    totalQuestions: 30,
  },
];

export default function ExamsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader title="TOPIK 시험" />

        <div className="grid gap-4 md:grid-cols-2">
          {TOPIK_EXAMS.map((exam) => (
            <button
              key={exam.id}
              onClick={() => router.push(`/exams/${exam.id}`)}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-left hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{exam.name}</h2>
              <p className="text-sm text-gray-600 mb-1">{exam.section}</p>
              <p className="text-sm text-gray-500">총 {exam.totalQuestions}문항</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
