import { useState, useEffect } from 'react';
import { SlidersHorizontal, LayoutGrid, List, ChevronLeft, ChevronRight, X } from 'lucide-react';
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
    search, brandId, categoryId, page, pageSize: 24,
  });

  const pageSize = 24;
  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    setPage(1);
  }, [search, brandId, categoryId]);

  const clearFilters = () => {
    setBrandId('');
    setCategoryId('');
    setSearch('');
  };

  const hasFilters = search || brandId || categoryId;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Page Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-amber-500 text-xs font-semibold tracking-widest uppercase mb-1">Catálogo</p>
              <h1 className="text-white text-2xl font-bold">Peças Automotivas</h1>
              {!loading && (
                <p className="text-gray-500 text-sm mt-1">
                  {total} {total === 1 ? 'resultado' : 'resultados'}
                  {hasFilters && ' (filtrado)'}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3 max-w-md w-full sm:w-auto sm:min-w-80">
              <div className="flex-1">
                <SearchBar
                  value={search}
                  onChange={setSearch}
                  size="md"
                />
              </div>
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-300 hover:border-gray-600 hover:text-white transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtros
                {hasFilters && (
                  <span className="bg-amber-500 text-gray-950 text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {[search, brandId, categoryId].filter(Boolean).length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Active filter tags */}
          {hasFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-gray-500 text-xs">Filtros ativos:</span>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs rounded-full hover:bg-amber-500/25 transition-colors"
                >
                  Busca: "{search}" <X className="w-3 h-3" />
                </button>
              )}
              {brandId && (
                <button
                  onClick={() => setBrandId('')}
                  className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs rounded-full hover:bg-amber-500/25 transition-colors"
                >
                  Marca: {brands.find(b => b.id === brandId)?.name} <X className="w-3 h-3" />
                </button>
              )}
              {categoryId && (
                <button
                  onClick={() => setCategoryId('')}
                  className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs rounded-full hover:bg-amber-500/25 transition-colors"
                >
                  Categoria: {categories.find(c => c.id === categoryId)?.name} <X className="w-3 h-3" />
                </button>
              )}
              <button
                onClick={clearFilters}
                className="text-gray-500 hover:text-red-400 text-xs transition-colors"
              >
                Limpar tudo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileFilterOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-gray-950 border-l border-gray-800 overflow-y-auto">
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
        </div>
      )}

      {/* Main layout */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24 bg-gray-900 border border-gray-800 rounded-xl p-5">
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
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="py-32 flex justify-center">
                <LoadingSpinner size="lg" label="Carregando catálogo..." />
              </div>
            ) : products.length === 0 ? (
              <div className="py-32 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-white text-lg font-semibold mb-2">Nenhuma peça encontrada</h3>
                <p className="text-gray-500 text-sm mb-6">Tente ajustar os filtros ou termos de busca</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold rounded-xl transition-colors text-sm"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
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
                  <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-800">
                    <p className="text-gray-500 text-sm">
                      Página {page} de {totalPages}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="flex items-center gap-1.5 px-4 py-2 bg-gray-800 border border-gray-700 text-sm text-gray-300 rounded-lg hover:border-gray-600 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4" /> Anterior
                      </button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                        return (
                          <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                              page === p
                                ? 'bg-amber-500 text-gray-950'
                                : 'bg-gray-800 border border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white'
                            }`}
                          >
                            {p}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="flex items-center gap-1.5 px-4 py-2 bg-gray-800 border border-gray-700 text-sm text-gray-300 rounded-lg hover:border-gray-600 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Próxima <ChevronRight className="w-4 h-4" />
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
