export interface Database {
  public: {
    Tables: {
      brands: {
        Row: Brand;
        Insert: Omit<Brand, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Brand, 'id' | 'created_at' | 'updated_at'>>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>;
      };
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>;
      };
      vehicle_applications: {
        Row: VehicleApplication;
        Insert: Omit<VehicleApplication, 'id' | 'created_at'>;
        Update: Partial<Omit<VehicleApplication, 'id' | 'created_at'>>;
      };
    };
  };
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string;
  country: string;
  description: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  icon: string;
  description: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  technical_specs: Record<string, string | number>;
  brand_id: string | null;
  category_id: string | null;
  images: string[];
  weight: number;
  dimensions: Record<string, number>;
  oem_codes: string[];
  barcode: string;
  stock_quantity: number;
  min_order_qty: number;
  price: number;
  active: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface VehicleApplication {
  id: string;
  product_id: string;
  make: string;
  model: string;
  year_from: number | null;
  year_to: number | null;
  engine: string;
  notes: string;
  created_at: string;
}

export interface ProductWithRelations extends Product {
  brands: Brand | null;
  categories: Category | null;
  vehicle_applications: VehicleApplication[];
}
