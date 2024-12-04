"use client";

import React, { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";

interface Suggestion {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const SuggestionsPage: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    const res = await fetch("/api/suggestions");
    const data = await res.json();
    setSuggestions(data);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleAddSuggestion = async () => {
    if (!newTitle || !newContent) return;

    const newSuggestion = { title: newTitle, content: newContent };
    await fetch("/api/suggestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSuggestion),
    });

    setNewTitle("");
    setNewContent("");
    fetchSuggestions();
  };

  const filteredSuggestions = suggestions.filter(
    (s) => s.title.toLowerCase().includes(searchTerm.toLowerCase()) || s.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedSuggestions = filteredSuggestions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredSuggestions.length / itemsPerPage);

  return (
    <PageLayout title="건의사항" titleRu="Предложения">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">건의사항 / Предложения</h2>
          <input type="text" placeholder="검색 / Поиск" value={searchTerm} onChange={handleSearch} className="w-full p-2 mb-4 border rounded" />
          <div className="mb-4">
            <input
              type="text"
              placeholder="제목 / Заголовок"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <textarea
              placeholder="내용 / Содержание"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <button onClick={handleAddSuggestion} className="w-full bg-blue-500 text-white p-2 rounded">
              등록 / Добавить
            </button>
          </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">제목</th>
                <th className="py-2">날짜</th>
                <th className="py-2">작업</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSuggestions.map((suggestion) => (
                <tr key={suggestion.id}>
                  <td className="border px-4 py-2">{suggestion.title}</td>
                  <td className="border px-4 py-2">{new Date(suggestion.createdAt).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">
                    <button className="text-blue-500 hover:text-blue-700">수정</button>
                    <button className="text-red-500 hover:text-red-700 ml-2">삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SuggestionsPage;
