import { useState } from 'react';
import { ArrowRight, Zap, Shield, Search, Database, BarChart3, Layers } from 'lucide-react';
import { useProducts, useBrands, useCategories } from '../lib/hooks';
import ProductCard from '../components/catalog/ProductCard';
import SearchBar from '../components/catalog/SearchBar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import type { Product, Brand, Category } from '../lib/database.types';

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const categoryIcons: Record<string, string> = {
  Motor: '⚙️', Freios: '🔴', 'Suspensão': '↕️', Elétrica: '⚡',
  'Ignição': '🔥', 'Transmissão': '⚙️', Filtros: '🔽', Arrefecimento: '🌡️',
};

export default function HomePage({ onNavigate }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { products: featuredProducts, loading: featuredLoading } = useProducts({ featured: true, pageSize: 8 });
  const { brands } = useBrands();
  const { categories } = useCategories();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onNavigate('catalog', { search: searchQuery.trim() });
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gray-950">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(251,191,36,1) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 rounded-full px-4 py-1.5 mb-8">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
              <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">
                Plataforma B2B de Peças Automotivas
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
              Catálogo Técnico
              <span className="block text-amber-500">Premium</span>
            </h1>

            <p className="text-gray-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
              Acesso a milhares de peças automotivas com especificações técnicas completas, referências OEM e aplicações por veículo.
            </p>

            {/* Search Hero */}
            <div className="flex gap-3 max-w-xl">
              <div className="flex-1">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="SKU, nome da peça ou código OEM..."
                  size="lg"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-6 bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <Search className="w-4 h-4" /> Buscar
              </button>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 mt-12">
              {[
                { label: 'Marcas cadastradas', value: brands.length.toString().padStart(2, '0') },
                { label: 'Categorias', value: categories.length.toString().padStart(2, '0') },
                { label: 'Referências OEM', value: '1.200+' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories strip */}
      <section className="bg-gray-900 border-y border-gray-800 py-8">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-gray-300 text-sm font-semibold tracking-widest uppercase">Categorias</h2>
            <div className="flex-1 h-px bg-gray-800" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => onNavigate('catalog', { categoryId: cat.id })}
                className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-amber-500/40 hover:bg-amber-500/5 transition-all duration-200"
              >
                <span className="text-2xl">{categoryIcons[cat.name] || '🔧'}</span>
                <span className="text-xs font-medium text-gray-400 group-hover:text-amber-400 transition-colors text-center">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Database,
                title: 'Dados Técnicos Completos',
                desc: 'Especificações completas, pesos, dimensões e referências OEM de cada peça.',
              },
              {
                icon: Shield,
                title: 'Aplicações por Veículo',
                desc: 'Tabela de aplicações detalhada com marca, modelo, ano e motor para cada componente.',
              },
              {
                icon: Zap,
                title: 'Busca Ultra Rápida',
                desc: 'Encontre peças por nome, SKU, código OEM ou referência cruzada em segundos.',
              },
              {
                icon: BarChart3,
                title: 'Controle de Estoque',
                desc: 'Visão em tempo real do estoque disponível e quantidade mínima de pedido.',
              },
              {
                icon: Layers,
                title: 'Catálogo Hierárquico',
                desc: 'Organização por categorias e subcategorias para navegação precisa.',
              },
              {
                icon: Search,
                title: 'Filtros Avançados',
                desc: 'Filtre por marca, categoria, aplicação e especificações técnicas.',
              },
            ].map(feature => (
              <div
                key={feature.title}
                className="p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors"
              >
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-amber-500 text-xs font-semibold tracking-widest uppercase mb-1">Destaque</p>
              <h2 className="text-white text-2xl font-bold">Peças em Evidência</h2>
            </div>
            <button
              onClick={() => onNavigate('catalog')}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-amber-400 transition-colors"
            >
              Ver catálogo completo <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {featuredLoading ? (
            <div className="py-20"><LoadingSpinner label="Carregando peças..." /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {featuredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product as Product & { brands: Brand | null; categories: Category | null }}
                  onClick={() => onNavigate('product', { slug: product.slug })}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 bg-gray-950 border-t border-gray-800">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-amber-500 text-xs font-semibold tracking-widest uppercase mb-2">Fabricantes</p>
            <h2 className="text-white text-2xl font-bold">Marcas Premium no Catálogo</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {brands.map(brand => (
              <button
                key={brand.id}
                onClick={() => onNavigate('catalog', { brandId: brand.id })}
                className="group p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-amber-500/40 hover:bg-amber-500/5 transition-all duration-200 flex flex-col items-center gap-2"
              >
                <div className="text-gray-400 group-hover:text-amber-400 font-bold text-sm transition-colors">
                  {brand.name}
                </div>
                {brand.country && (
                  <div className="text-gray-600 text-xs">{brand.country}</div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
