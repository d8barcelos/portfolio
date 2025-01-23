interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Badge({ children, variant = 'primary' }: BadgeProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-teal-500 text-gray-900', // Contraste claro no texto
    secondary: 'text-teal-300 bg-gray-800', // Fundo escuro e texto em tom brilhante
  };

  return (
    <span className={`text-sm px-3 py-1 rounded-full ${variants[variant]}`}>
      {children}
    </span>
  );
}
