import React from "react";

interface AlertProps {
  children: React.ReactNode;
  className?: string;
}

export const Alert = ({ children, className = "" }: AlertProps) => <div className={`p-4 border rounded ${className}`}>{children}</div>;

export const AlertDescription = ({ children, className = "" }: AlertProps) => <div className={`text-sm ${className}`}>{children}</div>;
