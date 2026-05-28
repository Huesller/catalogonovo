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
      <div className="relative bg-base-100/40 border border-base-300/30 overflow-hidden transition-all duration-300 group-hover:border-accent/30 group-hover:bg-base-100/60">
        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-1 bg-accent text-white text-xs font-bold rounded shadow-lg">
            <Star className="w-3 h-3" fill="currentColor" />
            <span>DESTAQUE</span>
          </div>
        )}

        {/* Image Area */}
        <div className="relative h-40 bg-gradient-to-br from-base-200 to-base-300 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="w-16 h-16 text-base-400 opacity-30" strokeWidth={1} />
            </div>
          )}

          {/* Accent Line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
        </div>

        {/* Content Area */}
        <div className="p-4">
          {/* Brand & Category */}
          <div className="flex items-center justify-between mb-2">
            {product.brands && (
              <span className="text-xs text-accent font-bold tracking-wider uppercase">
                {product.brands.name}
              </span>
            )}
            {product.categories && (
              <span className="text-2xs text-base-500">
                {product.categories.name}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-display font-semibold text-sm text-base-900 mb-2 line-clamp-2 min-h-[2rem]">
            {product.name}
          </h3>

          {/* SKU */}
          <div className="bg-accent/12 border border-accent/25 inline-block px-2 py-1 rounded text-2xs text-accent font-medium mb-3">
            {product.sku}
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between pt-3 border-t border-base-300/30">
            <div>
              {product.price > 0 ? (
                <div className="font-display font-bold text-base text-base-900">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(product.price)}
                </div>
              ) : (
                <div className="text-base-500 text-xs">Consultar</div>
              )}
            </div>
            <div className="flex items-center gap-1 text-2xs text-accent font-medium group-hover:gap-2 transition-all">
              <span>Ver detalhes</span>
              <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>

        {/* Stock Indicator */}
        {product.stock_quantity === 0 && (
          <div className="absolute top-3 right-3 z-10 px-2 py-1 bg-red-500 text-white text-2xs font-bold rounded">
            Sem estoque
          </div>
        )}
      </div>
    </button>
  );
}
