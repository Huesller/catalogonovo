import { useState, useEffect, useRef } from 'react';
import { SlidersHorizontal, ChevronLeft, ChevronRight, X, Search } from 'lucide-react';
import { useProducts, useBrands, useCategories } from '../lib/hooks';
import ProductCard from '../components/catalog/ProductCard';
import FilterSidebar from '../components/catalog/FilterSidebar';
import SearchBar from '../components/catalog/SearchBar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import type { Product, Brand, Category } from '../lib/database.types';

interface CatalogPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  initialSearch?: string;
  initialBrandId?: string;
  initialCategoryId?: string;
}

export default function CatalogPage({
  onNavigate,
  initialSearch = '',
  initialBrandId = '',
  initialCategoryId = '',
}: CatalogPageProps) {
  const [search, setSearch] = useState(initialSearch);
  const [brandId, setBrandId] = useState(initialBrandId);
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const { brands } = useBrands();
  const { categories } = useCategories();
  const { products, total, loading } = useProducts({
    search,
    brandId,
    categoryId,
    page,
    pageSize: 24,
  });

  const pageSize = 24;
  const totalPages = Math.ceil(total / pageSize);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPage(1);
  }, [search, brandId, categoryId]);

  useEffect(() => {
    if (gridRef.current && !loading) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [page]);

  const clearFilters = () => {
    setBrandId('');
    setCategoryId('');
    setSearch('');
  };

  const hasFilters = search || brandId || categoryId;
  const filterCount = [search, brandId, categoryId].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-base-0">
      {/* Page Header */}
      <div className="bg-surface raised border-b border-base-200">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col gap-8">
            {/* Title Row */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <div className="text-label mb-2">Catálogo</div>
                <h1 className="text-3xl sm:text-4xl font-bold text-base-900 tracking-tight">
                  Peças Automotivas
                </h1>
                {!loading && (
                  <p className="text-base-600 text-sm mt-2">
                    {total.toLocaleString()} {total === 1 ? 'resultado' : 'resultados'}
                    {hasFilters && ' encontrados'}
                  </p>
                )}
              </div>

              {/* Search & Mobile Filter */}
              <div className="flex items-center gap-3 w-full lg:w-auto lg:min-w-[400px]">
                <div className="flex-1">
                  <SearchBar
                    value={search}
                    onChange={setSearch}
                    size="md"
                    placeholder="Nome, SKU, código OEM..."
                  />
                </div>
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden btn-secondary relative"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  {hasFilters && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-accent text-base-0 text-xs font-bold rounded-full flex items-center justify-center border-2 border-surface">
                      {filterCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {hasFilters && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-base-500 font-medium">Filtros:</span>
                {search && (
                  <FilterTag label={`"${search}"`} onRemove={() => setSearch('')} />
                )}
                {brandId && (
                  <FilterTag
                    label={brands.find(b => b.id === brandId)?.name || ''}
                    onRemove={() => setBrandId('')}
                  />
                )}
                {categoryId && (
                  <FilterTag
                    label={categories.find(c => c.id === categoryId)?.name || ''}
                    onRemove={() => setCategoryId('')}
                  />
                )}
                <button
                  onClick={clearFilters}
                  className="text-xs text-base-500 hover:text-red-400 transition-colors ml-2"
                >
                  Limpar tudo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-base-0/80 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-80 bg-surface border-l border-base-200 shadow-elevated lg:hidden animate-slide-in-right">
            <FilterSidebar
              brands={brands}
              categories={categories}
              selectedBrand={brandId}
              selectedCategory={categoryId}
              onBrandChange={setBrandId}
              onCategoryChange={setCategoryId}
              onClear={clearFilters}
              mobile
              onClose={() => setMobileFilterOpen(false)}
            />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 card-surface p-6">
              <FilterSidebar
                brands={brands}
                categories={categories}
                selectedBrand={brandId}
                selectedCategory={categoryId}
                onBrandChange={setBrandId}
                onCategoryChange={setCategoryId}
                onClear={clearFilters}
              />
            </div>
          </aside>

          {/* Product Grid */}
          <div ref={gridRef} className="flex-1 min-w-0">
            {loading ? (
              <div className="py-32 flex justify-center">
                <LoadingSpinner size="lg" label="Carregando catálogo..." />
              </div>
            ) : products.length === 0 ? (
              <div className="py-32 text-center">
                <div className="w-16 h-16 rounded-full bg-base-100 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-7 h-7 text-base-400" />
                </div>
                <h3 className="text-xl font-semibold text-base-900 mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-base-500 text-sm mb-8 max-w-md mx-auto">
                  Tente ajustar os filtros ou termos de busca para encontrar o que procura.
                </p>
                <button onClick={clearFilters} className="btn-primary">
                  Limpar filtros
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product as Product & { brands: Brand | null; categories: Category | null }}
                      onClick={() => onNavigate('product', { slug: product.slug })}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-base-200">
                    <p className="text-sm text-base-500">
                      Página {page} de {totalPages}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Anterior</span>
                      </button>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const startPage = Math.max(1, Math.min(page - 2, totalPages - 4));
                          const p = startPage + i;
                          return (
                            <button
                              key={p}
                              onClick={() => setPage(p)}
                              className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-150 ${
                                page === p
                                  ? 'bg-accent text-base-0 shadow-glow'
                                  : 'text-base-600 hover:bg-base-100 hover:text-base-900'
                              }`}
                            >
                              {p}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <span className="hidden sm:inline">Próxima</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      onClick={onRemove}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 border border-accent/20 text-accent text-xs font-medium rounded-lg hover:bg-accent/20 transition-colors"
    >
      {label}
      <X className="w-3 h-3" />
    </button>
  );
}
