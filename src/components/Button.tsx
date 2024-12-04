interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export function Button({ 
  children, 
  className = "", 
  variant = 'default',
  size = 'md',
  ...props 
}: ButtonProps) {
  const variants = {
    default: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    destructive: 'bg-red-600 hover:bg-red-700 text-white',
    outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
    ghost: 'text-gray-600 hover:bg-gray-100'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-2'
  };

  return (
    <button 
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-lg font-medium
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        disabled:opacity-50 disabled:cursor-not-allowed
        active:transform active:scale-95
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
} 