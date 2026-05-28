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
      <section className="relative min-h-screen flex items-center overflow-hidden bg-base-0 pt-20">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(0,71,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,71,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />

        <div className="relative max-w-screen-2xl mx-auto px-7 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-xs font-medium tracking-widest text-accent uppercase">Plataforma B2B de Peças</span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-5xl lg:text-6xl font-black leading-tight mb-6 text-base-900">
                Catálogo<br />Técnico<br /><span className="text-accent">Preciso.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base-600 text-lg leading-relaxed mb-8 max-w-md font-light">
                Acesso completo a peças automotivas com especificações técnicas detalhadas, referências OEM cruzadas e aplicações por veículo.
              </p>

              {/* CTAs */}
              <div className="flex gap-3 mb-12">
                <button onClick={handleSearch} className="px-6 py-3 bg-accent text-white text-xs font-medium tracking-widest uppercase rounded hover:bg-accent-light transition-colors">
                  Acessar Catálogo
                </button>
                <button onClick={() => onNavigate('catalog')} className="px-6 py-3 border border-base-500/25 text-base-500 text-xs font-medium tracking-widest uppercase rounded hover:text-accent hover:border-accent/25 transition-colors">
                  Ver Marcas
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8 border-t border-base-300/20">
                {[
                  { label: 'Ref. OEM', value: '1.200+' },
                  { label: 'Marcas', value: brands.length.toString().padStart(2, '0') },
                  { label: 'Categorias', value: categories.length.toString().padStart(2, '0') },
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="font-display text-3xl font-bold text-base-900">{stat.value}</div>
                    <div className="text-xs text-base-500 tracking-wide uppercase mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Product Card */}
            <div>
              <div className="bg-base-100/40 border border-accent/20 rounded-lg overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center relative">
                  <span className="text-base-400 font-display font-bold text-sm tracking-wider">Imagem do Produto</span>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold tracking-wider text-accent uppercase">Monroe</span>
                    <span className="text-xs text-base-500">Suspensão</span>
                  </div>
                  <h3 className="font-display font-semibold text-sm text-base-900 mb-3">Amortecedor Dianteiro Gas-Magnum</h3>
                  <div className="bg-accent/12 border border-accent/25 inline-block px-2.5 py-1 rounded text-xs text-accent font-medium mb-3">MON-G8013</div>
                  <div className="flex justify-between items-center pt-3 border-t border-base-300/30">
                    <span className="font-display font-bold text-lg text-base-900">R$ 459,00</span>
                    <button className="text-xs text-accent font-medium">Ver detalhes →</button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="bg-base-100/40 border border-base-300/30 rounded p-3">
                  <div className="text-2xs text-base-500 uppercase tracking-wider mb-1">Código OEM</div>
                  <div className="font-display font-bold text-sm text-base-900">2 refs.</div>
                </div>
                <div className="bg-base-100/40 border border-base-300/30 rounded p-3">
                  <div className="text-2xs text-base-500 uppercase tracking-wider mb-1">Aplicações</div>
                  <div className="font-display font-bold text-sm text-base-900">14 veículos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-base-0 border-t border-accent/18 py-16">
        <div className="max-w-screen-2xl mx-auto px-7">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs font-medium tracking-widest text-accent uppercase mb-2">Navegue</div>
              <h2 className="font-display text-2xl font-bold text-base-900">Por categoria</h2>
            </div>
            <button className="text-xs text-base-500 hover:text-accent transition-colors tracking-widest uppercase border-b border-base-500/30 hover:border-accent/30 pb-0.5">Ver todas →</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => onNavigate('catalog', { categoryId: cat.id })}
                className="group bg-base-100/40 border border-base-300/30 border-l-2 border-l-accent hover:border-accent/50 hover:bg-base-100/60 rounded-lg p-4 text-left transition-all duration-200"
              >
                <div className="text-xl mb-3 text-accent">⚙️</div>
                <div className="font-display font-semibold text-sm text-base-900 mb-1">{cat.name}</div>
                <div className="text-2xs text-base-500">{Math.floor(Math.random() * 300)} peças</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-base-0 border-t border-accent/18">
        <div className="max-w-screen-2xl mx-auto px-7">
          <div className="mb-12">
            <div className="text-xs font-medium tracking-widest text-accent uppercase mb-2">Recursos</div>
            <h2 className="font-display text-2xl font-bold text-base-900">Informação técnica completa</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-base-300/10 p-0.5 rounded-lg overflow-hidden">
            {[
              { title: 'Especificações detalhadas', desc: 'Peso, dimensões, materiais e referências cruzadas completas.' },
              { title: 'Aplicações por veículo', desc: 'Tabela completa com marca, modelo, ano e motor.' },
              { title: 'Busca inteligente', desc: 'Encontre por nome, SKU, código OEM ou referência.' },
              { title: 'Controle de estoque', desc: 'Visão em tempo real da disponibilidade e quantidade mínima.' },
              { title: 'Organização clara', desc: 'Categorias e subcategorias para navegação precisa.' },
              { title: 'Filtros avançados', desc: 'Refine por marca, categoria, aplicação e mais.' },
            ].map((feature, idx) => (
              <div key={feature.title} className="bg-base-0 p-6 relative">
                <div className="text-4xl font-display font-black text-accent/10 absolute top-4 right-4">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-accent mb-4" />
                <h3 className="font-display font-semibold text-sm text-base-900 mb-2">{feature.title}</h3>
                <p className="text-2xs text-base-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-base-0 border-t border-accent/18">
        <div className="max-w-screen-2xl mx-auto px-7">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs font-medium tracking-widest text-accent uppercase mb-2">Destaques</div>
              <h2 className="font-display text-2xl font-bold text-base-900">Peças em Evidência</h2>
            </div>
            <button
              onClick={() => onNavigate('catalog')}
              className="hidden md:flex text-xs text-base-500 hover:text-accent transition-colors tracking-widest uppercase border-b border-base-500/30 hover:border-accent/30 pb-0.5 gap-1"
            >
              Ver catálogo completo
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {featuredLoading ? (
            <div className="py-20"><LoadingSpinner label="Carregando..." /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            className="w-full mt-8 md:hidden px-6 py-3 bg-accent text-white text-xs font-medium tracking-widest uppercase rounded hover:bg-accent-light transition-colors"
          >
            Ver catálogo completo
          </button>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 bg-base-0 border-t border-accent/18">
        <div className="max-w-screen-2xl mx-auto px-7">
          <div className="text-center mb-10">
            <div className="text-xs font-medium tracking-widest text-accent uppercase mb-2">Marcas</div>
            <h2 className="font-display text-2xl font-bold text-base-900">Fabricantes Certificados</h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {brands.map(brand => (
              <button
                key={brand.id}
                onClick={() => onNavigate('catalog', { brandId: brand.id })}
                className="group bg-base-100/40 border border-base-300/30 hover:border-accent/30 hover:bg-base-100/60 rounded p-3 flex flex-col items-center justify-center gap-1.5 transition-all"
              >
                <span className="font-display font-bold text-xs text-base-600 group-hover:text-accent transition-colors text-center">
                  {brand.name}
                </span>
                {brand.country && (
                  <span className="text-2xs text-base-500">
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
