import { Navigation } from "@/components/Navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
          <Navigation />
          <main className="flex-1 p-4 lg:p-8 mt-16 lg:mt-0">{children}</main>
        </div>
      </body>
    </html>
  );
}
