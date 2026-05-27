import { X, SlidersHorizontal, ChevronDown } from 'lucide-react';
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
  const filterCount = [selectedBrand, selectedCategory].filter(Boolean).length;

  return (
    <aside className={`${mobile ? 'p-6' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4 text-accent" />
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-base-900 tracking-tight">Filtros</h2>
            {hasFilters && (
              <span className="min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-accent text-base-0 text-xs font-bold rounded">
                {filterCount}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {hasFilters && (
            <button
              onClick={onClear}
              className="text-sm text-base-500 hover:text-accent transition-colors"
            >
              Limpar
            </button>
          )}
          {mobile && onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-base-100 text-base-500 hover:text-base-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <div className="text-label mb-3 flex items-center justify-between group cursor-pointer">
          <span>Categoria</span>
          <ChevronDown className="w-3.5 h-3.5 text-base-400 group-hover:text-base-600 transition-colors" />
        </div>
        <div className="space-y-1">
          <FilterItem
            label="Todas as categorias"
            isActive={!selectedCategory}
            onClick={() => onCategoryChange('')}
          />
          {categories.map(cat => (
            <FilterItem
              key={cat.id}
              label={cat.name}
              isActive={selectedCategory === cat.id}
              onClick={() => onCategoryChange(cat.id)}
            />
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <div className="text-label mb-3 flex items-center justify-between group cursor-pointer">
          <span>Marca</span>
          <ChevronDown className="w-3.5 h-3.5 text-base-400 group-hover:text-base-600 transition-colors" />
        </div>
        <div className="space-y-1">
          <FilterItem
            label="Todas as marcas"
            isActive={!selectedBrand}
            onClick={() => onBrandChange('')}
          />
          {brands.map(brand => (
            <FilterItem
              key={brand.id}
              label={brand.name}
              sublabel={brand.country}
              isActive={selectedBrand === brand.id}
              onClick={() => onBrandChange(brand.id)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

function FilterItem({
  label,
  sublabel,
  isActive,
  onClick,
}: {
  label: string;
  sublabel?: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-150 group ${
        isActive
          ? 'bg-accent/10 text-accent font-medium'
          : 'text-base-600 hover:bg-base-100 hover:text-base-900'
      }`}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className={`w-1 h-1 rounded-full flex-shrink-0 transition-colors ${
          isActive ? 'bg-accent' : 'bg-transparent group-hover:bg-base-400'
        }`} />
        <span className="truncate">{label}</span>
        {sublabel && (
          <span className="text-xs text-base-500 truncate">{sublabel}</span>
        )}
      </div>
      {isActive && (
        <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
      )}
    </button>
  );
}
