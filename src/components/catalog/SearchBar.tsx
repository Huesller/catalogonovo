import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar por nome, SKU, código OEM...',
  size = 'md',
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);

  const heights = { sm: 'h-9', md: 'h-11', lg: 'h-14' };
  const icons = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };
  const text = { sm: 'text-xs pl-8', md: 'text-sm pl-10', lg: 'text-base pl-12' };

  return (
    <div className={`relative ${focused ? 'ring-1 ring-amber-500/30' : ''} rounded-xl`}>
      <Search
        className={`absolute left-3 top-1/2 -translate-y-1/2 ${icons[size]} ${
          focused ? 'text-amber-400' : 'text-gray-500'
        } transition-colors pointer-events-none ${size === 'lg' ? 'left-4' : ''}`}
      />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className={`w-full ${heights[size]} ${text[size]} pr-10 bg-gray-900 border ${
          focused ? 'border-amber-500' : 'border-gray-700'
        } rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-200`}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
        >
          <X className={icons[size]} />
        </button>
      )}
    </div>
  );
}
