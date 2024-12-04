"use client";

import React, { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";

interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const SuggestionsPage: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    fetch("/api/notices")
      .then((res) => res.json())
      .then(setNotices)
      .catch((error) => console.error("Error fetching suggestions:", error));
  }, []);

  return (
    <PageLayout title="건의사항" titleRu="Предложения">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">건의사항 / Предложения</h2>
          <ul className="space-y-4">
            {notices.map((notice) => (
              <li key={notice.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">{notice.title}</h3>
                <p className="text-sm text-gray-500">{new Date(notice.createdAt).toLocaleDateString()}</p>
                <p className="mt-2">{notice.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageLayout>
  );
};

export default SuggestionsPage;
