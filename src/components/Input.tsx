export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      {...props}
    />
  );
} 