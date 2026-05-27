import { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, ArrowRight, Package, Hash, Car } from 'lucide-react';
import { useSearchSuggestions } from '../../lib/hooks';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  onSelectSuggestion?: (type: string, value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar por nome, SKU, código OEM...',
  size = 'md',
  onSelectSuggestion,
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { suggestions, loading, search } = useSearchSuggestions();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (value.length >= 2 && focused) {
      search(value);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [value, focused, search]);

  const heights = { sm: 'h-9', md: 'h-11', lg: 'h-14' };
  const icons = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };
  const text = { sm: 'text-xs pl-8', md: 'text-sm pl-10', lg: 'text-base pl-12' };

  const handleSelect = (type: string, result: string) => {
    onChange(result);
    setShowSuggestions(false);
    onSelectSuggestion?.(type, result);
  };

  const hasSuggestions = suggestions.products.length > 0 || suggestions.skus.length > 0 || suggestions.oems.length > 0;

  return (
    <div ref={wrapperRef} className={`relative ${focused ? 'ring-1 ring-amber-500/30' : ''} rounded-xl`}>
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
        placeholder={placeholder}
        className={`w-full ${heights[size]} ${text[size]} pr-10 bg-gray-900 border ${
          focused ? 'border-amber-500' : 'border-gray-700'
        } rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-200`}
      />
      {loading && (
        <Loader2 className={`absolute right-3 top-1/2 -translate-y-1/2 ${icons[size]} text-gray-500 animate-spin`} />
      )}
      {!loading && value && (
        <button
          onClick={() => {
            onChange('');
            setShowSuggestions(false);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
        >
          <X className={icons[size]} />
        </button>
      )}

      {showSuggestions && hasSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">
          {suggestions.products.length > 0 && (
            <div className="p-2">
              <div className="text-gray-500 text-xs font-medium uppercase tracking-wider px-3 py-1.5">
                Produtos
              </div>
              {suggestions.products.slice(0, 4).map(product => (
                <button
                  key={product.id}
                  onClick={() => handleSelect('product', product.name)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors group"
                >
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 group-hover:text-amber-400">
                    <Package className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-white text-sm font-medium group-hover:text-amber-400 transition-colors">
                      {product.name}
                    </div>
                    <div className="text-gray-500 text-xs">{product.sku}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-amber-400 transition-colors" />
                </button>
              ))}
            </div>
          )}

          {suggestions.skus.length > 0 && (
            <div className="p-2 border-t border-gray-800">
              <div className="text-gray-500 text-xs font-medium uppercase tracking-wider px-3 py-1.5">
                SKUs
              </div>
              {suggestions.skus.slice(0, 3).map((sku, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect('sku', sku)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors group"
                >
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 group-hover:text-amber-400">
                    <Hash className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-gray-300 text-sm font-mono">{sku}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-amber-400 transition-colors" />
                </button>
              ))}
            </div>
          )}

          {suggestions.oems.length > 0 && (
            <div className="p-2 border-t border-gray-800">
              <div className="text-gray-500 text-xs font-medium uppercase tracking-wider px-3 py-1.5">
                Códigos OEM
              </div>
              {suggestions.oems.slice(0, 3).map((oem, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect('oem', oem)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors group"
                >
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 group-hover:text-amber-400">
                    <Car className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-gray-300 text-sm font-mono">{oem}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-amber-400 transition-colors" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
