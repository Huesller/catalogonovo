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

export default function HomePage({ onNavigate }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { products: featuredProducts, loading: featuredLoading } = useProducts({ featured: true, pageSize: 6 });
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
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-base-0">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden bg-gradient-mesh" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-[1000px] h-[1000px] rounded-full bg-gradient-radial from-accent/10 via-accent/5 to-transparent blur-3xl opacity-60" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-radial from-accent/5 via-transparent to-transparent blur-2xl opacity-40" />
        </div>

        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm mb-8 animate-fade-in">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-xs font-semibold tracking-widest uppercase">
                Plataforma B2B de Peças Automotivas
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-bold text-base-900 leading-[1.05] tracking-tight mb-6 animate-slide-up">
              Catálogo Técnico
              <span className="block mt-2 text-gradient">Premium</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base-600 text-lg sm:text-xl leading-relaxed mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
              Acesso completo a milhares de peças automotivas com especificações técnicas detalhadas, referências OEM cruzadas e aplicações por veículo.
            </p>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-16 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="flex-1">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Buscar por SKU, nome ou código OEM..."
                  size="lg"
                  onSelectSuggestion={(type, value) => onNavigate('catalog', { search: value })}
                />
              </div>
              <button onClick={handleSearch} className="btn-primary h-14 px-8 whitespace-nowrap hover:shadow-glow-strong transition-all duration-300">
                <Search className="w-5 h-5" />
                <span>Buscar</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '300ms' }}>
              {[
                { label: 'Marcas', value: brands.length },
                { label: 'Categorias', value: categories.length },
                { label: 'Referências OEM', value: '1.200+' },
              ].map(stat => (
                <div key={stat.label} className="text-center group">
                  <div className="text-3xl sm:text-4xl font-bold text-base-900 mb-1 group-hover:text-accent transition-colors">
                    {typeof stat.value === 'number' ? stat.value.toString().padStart(2, '0') : stat.value}
                  </div>
                  <div className="text-sm text-base-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-surface raised border-y border-base-200 py-10">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-sm font-semibold text-base-900 tracking-tight">Navegue por categoria</h2>
            <div className="flex-1 h-px bg-base-300" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => onNavigate('catalog', { categoryId: cat.id })}
                className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-base-100 border border-base-200 hover:border-accent/30 hover:bg-accent/5 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-base-200 group-hover:bg-accent/10 flex items-center justify-center text-base-500 group-hover:text-accent transition-colors">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-base-600 group-hover:text-accent transition-colors text-center">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-base-0">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-base-900 mb-3">
              Informação Técnica Completa
            </h2>
            <p className="text-base-500 max-w-xl mx-auto">
              Tudo o que você precisa para encontrar a peça correta
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Database,
                title: 'Especificações Detalhadas',
                desc: 'Dados técnicos completos: peso, dimensões, materiais e referências cruzadas.',
              },
              {
                icon: Shield,
                title: 'Aplicações por Veículo',
                desc: 'Tabela completa com marca, modelo, ano e motor para cada componente.',
              },
              {
                icon: Zap,
                title: 'Busca Inteligente',
                desc: 'Encontre rapidamente por nome, SKU, código OEM ou referência.',
              },
              {
                icon: BarChart3,
                title: 'Controle de Estoque',
                desc: 'Visão em tempo real da disponibilidade e quantidade mínima.',
              },
              {
                icon: Layers,
                title: 'Organização Clara',
                desc: 'Categorias e subcategorias para navegação precisa e organizada.',
              },
              {
                icon: Search,
                title: 'Filtros Avançados',
                desc: 'Refine sua busca por marca, categoria, aplicação e mais.',
              },
            ].map(feature => (
              <div
                key={feature.title}
                className="card-surface p-6 rounded-xl hover:border-base-300 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/15 transition-colors">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-base-900 font-semibold mb-2">{feature.title}</h3>
                <p className="text-base-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-surface raised">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between mb-10">
            <div>
              <div className="text-label mb-2">Destaques</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-base-900">
                Peças em Evidência
              </h2>
            </div>
            <button
              onClick={() => onNavigate('catalog')}
              className="btn-secondary hidden sm:inline-flex"
            >
              Ver catálogo completo
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {featuredLoading ? (
            <div className="py-20"><LoadingSpinner label="Carregando..." /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product as Product & { brands: Brand | null; categories: Category | null }}
                  onClick={() => onNavigate('product', { slug: product.slug })}
                />
              ))}
            </div>
          )}

          <button
            onClick={() => onNavigate('catalog')}
            className="btn-primary w-full mt-8 sm:hidden"
          >
            Ver catálogo completo
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 bg-base-0 border-t border-base-200">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="text-label mb-2">Marcas</div>
            <h2 className="text-2xl font-bold text-base-900">
              Fabricantes Certificados
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {brands.map(brand => (
              <button
                key={brand.id}
                onClick={() => onNavigate('catalog', { brandId: brand.id })}
                className="group card-surface p-5 rounded-xl hover:border-accent/30 hover:shadow-glow transition-all duration-200 flex flex-col items-center justify-center gap-2"
              >
                <span className="text-base-700 group-hover:text-accent font-bold text-sm transition-colors">
                  {brand.name}
                </span>
                {brand.country && (
                  <span className="text-2xs text-base-500 group-hover:text-accent/70 transition-colors">
                    {brand.country}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
