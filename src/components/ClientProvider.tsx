"use client";

import React from "react";
import Navigation from "@/components/Navigation";

const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Navigation />
      <main className="flex-1 md:ml-56">{children}</main>
    </div>
  );
};

export default ClientProvider;
