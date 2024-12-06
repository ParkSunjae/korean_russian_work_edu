import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title?: string;
  backUrl?: string;
  backLabel?: string;
  onBack?: () => void;
}

export default function PageHeader({ title, backUrl, backLabel = "뒤로 가기", onBack }: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backUrl) {
      router.push(backUrl);
    } else {
      router.back();
    }
  };

  return (
    <div className="flex items-center gap-4 mb-4">
      <button onClick={handleBack} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        {backLabel}
      </button>
      {title && <h1 className="text-lg font-medium text-gray-800">{title}</h1>}
    </div>
  );
}
