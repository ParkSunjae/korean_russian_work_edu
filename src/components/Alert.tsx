import React from "react";

interface AlertProps {
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ children, className }) => <div className={`p-4 border rounded ${className}`}>{children}</div>;

export const AlertDescription: React.FC<AlertProps> = ({ children, className }) => <div className={`text-sm ${className}`}>{children}</div>;
