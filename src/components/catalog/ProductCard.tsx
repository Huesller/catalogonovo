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
      <div className="relative card-surface overflow-hidden transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-card">
        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2 py-1 bg-accent text-base-0 text-xs font-semibold rounded-md shadow-lg">
            <Star className="w-3 h-3" fill="currentColor" />
            <span>DESTAQUE</span>
          </div>
        )}

        {/* Image Area */}
        <div className="relative h-52 bg-base-100 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="w-16 h-16 text-base-400" strokeWidth={1} />
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Area */}
        <div className="p-5">
          {/* Brand & Category */}
          <div className="flex items-center gap-2 mb-2.5">
            {product.brands && (
              <span className="text-xs text-accent font-semibold tracking-wide uppercase">
                {product.brands.name}
              </span>
            )}
            {product.brands && product.categories && (
              <span className="w-1 h-1 rounded-full bg-base-400" />
            )}
            {product.categories && (
              <span className="text-xs text-base-500">
                {product.categories.name}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="text-base-900 font-semibold text-sm leading-snug mb-4 group-hover:text-accent transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>

          {/* SKU & OEM */}
          <div className="flex items-center justify-between text-xs mb-4">
            <span className="font-mono text-base-500 bg-base-100 px-2 py-1 rounded">
              {product.sku}
            </span>
            {oemCount > 0 && (
              <span className="text-base-600">
                {oemCount} {oemCount === 1 ? 'código OEM' : 'códigos OEM'}
              </span>
            )}
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between pt-4 border-t border-base-200">
            <div>
              {product.price > 0 ? (
                <div className="text-base-900 font-bold text-lg">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(product.price)}
                </div>
              ) : (
                <div className="text-base-500 text-sm">Consultar</div>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-base-500 group-hover:text-accent transition-colors duration-200">
              <span>Ver detalhes</span>
              <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>

        {/* Stock Indicator */}
        {product.stock_quantity === 0 && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-base-0/90 backdrop-blur-sm text-red-400 text-xs font-medium rounded-md border border-red-500/20">
            Sem estoque
          </div>
        )}
      </div>
    </button>
  );
}
