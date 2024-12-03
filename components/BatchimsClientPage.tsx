"use client";

import { useState, useEffect } from "react";
import BatchimsContent from "./BatchimsContent";

export default function BatchimsClientPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <BatchimsContent />;
}
