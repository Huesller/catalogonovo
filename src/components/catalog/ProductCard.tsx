import { Package, Tag, ChevronRight, Star } from 'lucide-react';
import type { Product, Brand, Category } from '../../lib/database.types';

interface ProductCardProps {
  product: Product & { brands?: Brand | null; categories?: Category | null };
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const image = product.images?.[0];

  return (
    <button
      onClick={onClick}
      className="group relative bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 text-left w-full"
    >
      {product.featured && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-amber-500 text-gray-950 text-xs font-bold px-2 py-0.5 rounded">
          <Star className="w-3 h-3" /> DESTAQUE
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 bg-gray-800 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-600" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand & Category */}
        <div className="flex items-center gap-2 mb-2">
          {product.brands && (
            <span className="text-xs text-amber-500 font-semibold tracking-wide uppercase">
              {product.brands.name}
            </span>
          )}
          {product.brands && product.categories && (
            <span className="text-gray-700">·</span>
          )}
          {product.categories && (
            <span className="text-xs text-gray-500">
              {product.categories.name}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="text-white font-medium text-sm leading-snug mb-3 group-hover:text-amber-50 transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* SKU */}
        <div className="flex items-center gap-1.5 mb-3">
          <Tag className="w-3 h-3 text-gray-600" />
          <span className="text-xs text-gray-500 font-mono">{product.sku}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-800">
          <div>
            {product.price > 0 && (
              <span className="text-white font-semibold text-sm">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 group-hover:text-amber-400 transition-colors">
            Ver peça <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </button>
  );
}
