import { Package, ChevronRight, Star } from 'lucide-react';
import type { Product, Brand, Category } from '../../lib/database.types';

interface ProductCardProps {
  product: Product & { brands?: Brand | null; categories?: Category | null };
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const image = product.images?.[0];
  const oemCount = product.oem_codes?.length ?? 0;

  return (
    <button
      onClick={onClick}
      className="group relative w-full text-left"
    >
      {/* Card Container */}
      <div className="relative card-surface overflow-hidden transition-all duration-400 ease-smooth group-hover:border-accent/40 group-hover:shadow-elevated group-hover:-translate-y-1">
        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-accent to-accent-light text-base-0 text-xs font-semibold rounded-lg shadow-glow animate-pulse-subtle">
            <Star className="w-3.5 h-3.5" fill="currentColor" />
            <span>DESTAQUE</span>
          </div>
        )}

        {/* Image Area */}
        <div className="relative h-56 bg-base-100 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200">
              <Package className="w-20 h-20 text-base-400 group-hover:text-accent/50 transition-colors duration-300" strokeWidth={1} />
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent opacity-70" />

          {/* Shine Effect on Hover */}
          <div className="absolute inset-0 bg-shine opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content Area */}
        <div className="p-5.5 bg-gradient-to-b from-surface to-base-100">
          {/* Brand & Category */}
          <div className="flex items-center gap-2 mb-2.5">
            {product.brands && (
              <span className="text-xs text-accent font-semibold tracking-wider uppercase group-hover:text-accent-light transition-colors duration-300">
                {product.brands.name}
              </span>
            )}
            {product.brands && product.categories && (
              <span className="w-1 h-1 rounded-full bg-accent/50" />
            )}
            {product.categories && (
              <span className="text-xs text-base-500 group-hover:text-base-400 transition-colors duration-300">
                {product.categories.name}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="text-base-900 font-semibold text-base leading-snug mb-4 group-hover:text-accent transition-colors duration-200 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* SKU & OEM */}
          <div className="flex items-center justify-between text-xs mb-4">
            <span className="font-mono text-accent/80 bg-accent/10 px-2.5 py-1.5 rounded-md border border-accent/20 group-hover:bg-accent/15 transition-colors duration-200">
              {product.sku}
            </span>
            {oemCount > 0 && (
              <span className="text-base-500 flex items-center gap-1">
                <Package className="w-3.5 h-3.5" />
                {oemCount} {oemCount === 1 ? 'código OEM' : 'códigos OEM'}
              </span>
            )}
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between pt-4 border-t border-base-300/50 group-hover:border-accent/20 transition-colors duration-300">
            <div>
              {product.price > 0 ? (
                <div className="text-base-900 font-bold text-lg group-hover:text-accent-light transition-colors duration-200">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(product.price)}
                </div>
              ) : (
                <div className="text-base-500 text-sm">Consultar</div>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-base-500 group-hover:text-accent transition-all duration-200">
              <span>Ver detalhes</span>
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>

        {/* Stock Indicator */}
        {product.stock_quantity === 0 && (
          <div className="absolute top-3 right-3 z-10 px-3 py-1.5 bg-red-500/95 backdrop-blur-sm text-white text-xs font-semibold rounded-lg shadow-elevated border border-red-400/30">
            Sem estoque
          </div>
        )}
      </div>
    </button>
  );
}
