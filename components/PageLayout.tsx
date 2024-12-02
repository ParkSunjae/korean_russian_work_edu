interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">{title}</h1>
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">{children}</div>
    </div>
  );
}
