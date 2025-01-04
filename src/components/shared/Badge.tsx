interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Badge({ children, variant = 'primary' }: BadgeProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-400 to-teal-400 text-white',
    secondary: 'text-blue-400 bg-teal-50',
  };

  return (
    <span className={`text-sm px-3 py-1 rounded-full ${variants[variant]}`}>
      {children}
    </span>
  );
}
