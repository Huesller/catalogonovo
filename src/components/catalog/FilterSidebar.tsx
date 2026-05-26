import { X, SlidersHorizontal } from 'lucide-react';
import type { Brand, Category } from '../../lib/database.types';

interface FilterSidebarProps {
  brands: Brand[];
  categories: Category[];
  selectedBrand: string;
  selectedCategory: string;
  onBrandChange: (id: string) => void;
  onCategoryChange: (id: string) => void;
  onClear: () => void;
  mobile?: boolean;
  onClose?: () => void;
}

export default function FilterSidebar({
  brands,
  categories,
  selectedBrand,
  selectedCategory,
  onBrandChange,
  onCategoryChange,
  onClear,
  mobile,
  onClose,
}: FilterSidebarProps) {
  const hasFilters = selectedBrand || selectedCategory;

  return (
    <aside className={`${mobile ? 'p-5' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-amber-500" />
          <h2 className="text-white font-semibold text-sm tracking-wide uppercase">Filtros</h2>
          {hasFilters && (
            <span className="bg-amber-500 text-gray-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {[selectedBrand, selectedCategory].filter(Boolean).length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasFilters && (
            <button
              onClick={onClear}
              className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
            >
              Limpar
            </button>
          )}
          {mobile && onClose && (
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">Categoria</h3>
        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange('')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !selectedCategory
                ? 'bg-amber-500/15 text-amber-400 font-medium'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            Todas as categorias
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-amber-500/15 text-amber-400 font-medium'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">Marca</h3>
        <div className="space-y-1">
          <button
            onClick={() => onBrandChange('')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !selectedBrand
                ? 'bg-amber-500/15 text-amber-400 font-medium'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            Todas as marcas
          </button>
          {brands.map(brand => (
            <button
              key={brand.id}
              onClick={() => onBrandChange(brand.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedBrand === brand.id
                  ? 'bg-amber-500/15 text-amber-400 font-medium'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {brand.name}
              {brand.country && (
                <span className="ml-2 text-xs text-gray-600">{brand.country}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
