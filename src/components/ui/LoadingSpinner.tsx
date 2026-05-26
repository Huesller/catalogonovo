export default function LoadingSpinner({ size = 'md', label }: { size?: 'sm' | 'md' | 'lg'; label?: string }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizes[size]} border-2 border-gray-700 border-t-amber-500 rounded-full animate-spin`} />
      {label && <p className="text-gray-500 text-sm">{label}</p>}
    </div>
  );
}
