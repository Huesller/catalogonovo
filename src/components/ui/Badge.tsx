type Variant = 'default' | 'accent' | 'success' | 'warning' | 'error';

const styles: Record<Variant, string> = {
  default: 'bg-base-100 text-base-600 border-base-200',
  accent: 'bg-accent/10 text-accent border-accent/20',
  success: 'bg-green-500/10 text-green-400 border-green-500/20',
  warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  error: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
}: {
  children: React.ReactNode;
  variant?: Variant;
  size?: 'xs' | 'sm';
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md font-medium border ${
        size === 'xs' ? 'text-2xs px-1.5 py-0.5' : 'text-xs px-2.5 py-1'
      } ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
