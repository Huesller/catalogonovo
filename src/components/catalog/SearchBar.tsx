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
  const inputRef = useRef<HTMLInputElement>(null);
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

  const heights = { sm: 'h-10', md: 'h-12', lg: 'h-14' };
  const icons = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };
  const paddingLeft = { sm: 'pl-9', md: 'pl-11', lg: 'pl-12' };
  const text = { sm: 'text-sm', md: 'text-sm', lg: 'text-base' };

  const handleSelect = (type: string, result: string) => {
    onChange(result);
    setShowSuggestions(false);
    onSelectSuggestion?.(type, result);
  };

  const hasSuggestions = suggestions.products.length > 0 || suggestions.skus.length > 0 || suggestions.oems.length > 0;

  return (
    <div ref={wrapperRef} className="relative">
      {/* Input Container */}
      <div
        className={`relative transition-all duration-200 ${
          focused ? 'ring-1 ring-accent/30 shadow-glow' : ''
        } rounded-xl`}
      >
        <Search
          className={`absolute ${size === 'lg' ? 'left-4' : 'left-3.5'} top-1/2 -translate-y-1/2 ${
            icons[size]
          } ${focused ? 'text-accent' : 'text-base-500'} transition-colors pointer-events-none`}
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={`w-full ${heights[size]} ${paddingLeft[size]} pr-10 ${text[size]}
            bg-surface border border-base-200 rounded-xl text-base-900
            placeholder-base-500 focus:outline-none focus:border-accent/50
            transition-all duration-200`}
        />
        {loading && (
          <Loader2
            className={`absolute ${size === 'lg' ? 'right-4' : 'right-3'} top-1/2 -translate-y-1/2 ${
              icons[size]
            } text-base-500 animate-spin`}
          />
        )}
        {!loading && value && (
          <button
            onClick={() => {
              onChange('');
              setShowSuggestions(false);
              inputRef.current?.focus();
            }}
            className={`absolute ${size === 'lg' ? 'right-4' : 'right-3'} top-1/2 -translate-y-1/2
              text-base-500 hover:text-base-700 transition-colors p-0.5 rounded
              hover:bg-base-200`}
          >
            <X className={icons[size]} />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && hasSuggestions && (
        <div
          className="absolute top-full left-0 right-0 mt-2 card-surface shadow-elevated overflow-hidden z-50 animate-scale-in origin-top"
        >
          {suggestions.products.length > 0 && (
            <div className="p-2">
              <div className="text-label px-3 py-2">Produtos</div>
              {suggestions.products.slice(0, 4).map(product => (
                <button
                  key={product.id}
                  onClick={() => handleSelect('product', product.name)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-base-100 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-base-100 flex items-center justify-center text-base-500 group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                    <Package className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="text-sm text-base-900 font-medium truncate group-hover:text-accent transition-colors">
                      {product.name}
                    </div>
                    <div className="text-xs text-base-500 font-mono">{product.sku}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-base-400 group-hover:text-accent transition-colors flex-shrink-0" />
                </button>
              ))}
            </div>
          )}

          {suggestions.skus.length > 0 && (
            <div className="p-2 border-t border-base-200">
              <div className="text-label px-3 py-2">SKUs</div>
              {suggestions.skus.slice(0, 3).map((sku, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect('sku', sku)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-base-100 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-base-100 flex items-center justify-center text-base-500 group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                    <Hash className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-sm text-base-700 font-mono">{sku}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-base-400 group-hover:text-accent transition-colors" />
                </button>
              ))}
            </div>
          )}

          {suggestions.oems.length > 0 && (
            <div className="p-2 border-t border-base-200">
              <div className="text-label px-3 py-2">Códigos OEM</div>
              {suggestions.oems.slice(0, 3).map((oem, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect('oem', oem)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-base-100 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-base-100 flex items-center justify-center text-base-500 group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                    <Car className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-sm text-base-700 font-mono">{oem}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-base-400 group-hover:text-accent transition-colors" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
