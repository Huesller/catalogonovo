import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from './supabase';
import type { Brand, Category, Product, ProductWithRelations } from './database.types';

interface SearchSuggestion {
  products: Product[];
  skus: string[];
  oems: string[];
}

export function useSearchSuggestions() {
  const [suggestions, setSuggestions] = useState<SearchSuggestion>({ products: [], skus: [], oems: [] });
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const search = useCallback(async (query: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      const [prodRes, skuRes] = await Promise.all([
        supabase
          .from('products')
          .select('id, name, sku, slug')
          .or(`name.ilike.%${query}%,sku.ilike.%${query}%`)
          .eq('active', true)
          .limit(8),
        supabase
          .from('products')
          .select('oem_codes')
          .contains('oem_codes', [query])
          .limit(10),
      ]);

      const products = prodRes.data ?? [];
      const allOems = new Set<string>();
      (skuRes.data ?? []).forEach((p: { oem_codes: string[] }) => {
        p.oem_codes?.forEach(oem => {
          if (oem.toLowerCase().includes(query.toLowerCase())) {
            allOems.add(oem);
          }
        });
      });

      const matchingSkus = products
        .filter(p => p.sku.toLowerCase().includes(query.toLowerCase()))
        .map(p => p.sku)
        .slice(0, 5);

      setSuggestions({
        products,
        skus: matchingSkus,
        oems: Array.from(allOems).slice(0, 5),
      });
      setLoading(false);
    }, 200);
  }, []);

  return { suggestions, loading, search };
}

export interface ProductFilters {
  search?: string;
  brandId?: string;
  categoryId?: string;
  make?: string;
  model?: string;
  featured?: boolean;
  page?: number;
  pageSize?: number;
}

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('brands')
      .select('*')
      .eq('active', true)
      .order('name')
      .then(({ data }) => {
        setBrands(data ?? []);
        setLoading(false);
      });
  }, []);

  return { brands, loading };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('categories')
      .select('*')
      .eq('active', true)
      .order('name')
      .then(({ data }) => {
        setCategories(data ?? []);
        setLoading(false);
      });
  }, []);

  return { categories, loading };
}

export function useProducts(filters: ProductFilters = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const { search, brandId, categoryId, featured, page = 1, pageSize = 24 } = filters;

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    let query = supabase
      .from('products')
      .select('*, brands(*), categories(*)', { count: 'exact' })
      .eq('active', true);

    if (search) {
      query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%,description.ilike.%${search}%`);
    }
    if (brandId) query = query.eq('brand_id', brandId);
    if (categoryId) query = query.eq('category_id', categoryId);
    if (featured) query = query.eq('featured', true);

    query = query.order('featured', { ascending: false }).order('name');

    const from = (page - 1) * pageSize;
    query = query.range(from, from + pageSize - 1);

    const { data, count } = await query;
    setProducts(data ?? []);
    setTotal(count ?? 0);
    setLoading(false);
  }, [search, brandId, categoryId, featured, page, pageSize]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, total, loading, refetch: fetchProducts };
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<ProductWithRelations | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from('products')
      .select('*, brands(*), categories(*), vehicle_applications(*)')
      .eq('slug', slug)
      .eq('active', true)
      .maybeSingle()
      .then(({ data }) => {
        setProduct(data as ProductWithRelations | null);
        setLoading(false);
      });
  }, [slug]);

  return { product, loading };
}

export function useAdminProducts() {
  const [products, setProducts] = useState<ProductWithRelations[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('products')
      .select('*, brands(*), categories(*), vehicle_applications(*)')
      .order('created_at', { ascending: false });
    setProducts((data as ProductWithRelations[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);
  return { products, loading, refetch: fetch };
}

export function useAdminBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('brands').select('*').order('name');
    setBrands(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);
  return { brands, loading, refetch: fetch };
}

export function useAdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('categories').select('*').order('name');
    setCategories(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);
  return { categories, loading, refetch: fetch };
}
