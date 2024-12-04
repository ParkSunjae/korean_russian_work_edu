interface AlertProps {
  children: React.ReactNode;
  className?: string;
}

export function Alert({ children, className = "" }: AlertProps) {
  return (
    <div className={`bg-white border rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
}

export function AlertDescription({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-gray-700">{children}</div>;
} 