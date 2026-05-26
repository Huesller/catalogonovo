type Variant = 'default' | 'amber' | 'green' | 'red' | 'blue';

const styles: Record<Variant, string> = {
  default: 'bg-gray-800 text-gray-400',
  amber: 'bg-amber-500/15 text-amber-400',
  green: 'bg-green-500/15 text-green-400',
  red: 'bg-red-500/15 text-red-400',
  blue: 'bg-blue-500/15 text-blue-400',
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
      className={`inline-flex items-center rounded font-medium ${
        size === 'xs' ? 'text-xs px-1.5 py-0.5' : 'text-xs px-2.5 py-1'
      } ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
