/*
  # AutoParts Catalog Platform - Initial Schema

  ## Overview
  Premium B2B automotive parts catalog platform with full CRUD for products,
  brands, categories, and vehicle applications.

  ## Tables

  ### brands
  - `id` (uuid, primary key)
  - `name` (text) - Brand name (e.g., Bosch, Denso)
  - `slug` (text, unique) - URL-friendly identifier
  - `logo_url` (text) - Brand logo image URL
  - `country` (text) - Country of origin
  - `description` (text)
  - `active` (boolean)
  - `created_at`, `updated_at`

  ### categories
  - `id` (uuid, primary key)
  - `name` (text) - Category name
  - `slug` (text, unique)
  - `parent_id` (uuid, FK self-ref) - For subcategories
  - `icon` (text) - Icon identifier
  - `description` (text)
  - `active` (boolean)
  - `created_at`, `updated_at`

  ### products
  - `id` (uuid, primary key)
  - `sku` (text, unique) - Part number / stock keeping unit
  - `name` (text) - Product name
  - `slug` (text, unique)
  - `description` (text)
  - `technical_specs` (jsonb) - Flexible technical specifications
  - `brand_id` (uuid, FK brands)
  - `category_id` (uuid, FK categories)
  - `images` (text[]) - Array of image URLs
  - `weight` (numeric) - kg
  - `dimensions` (jsonb) - {length, width, height}
  - `oem_codes` (text[]) - OEM reference codes
  - `barcode` (text)
  - `stock_quantity` (integer)
  - `min_order_qty` (integer)
  - `price` (numeric)
  - `active` (boolean)
  - `featured` (boolean)
  - `created_at`, `updated_at`

  ### vehicle_applications
  - `id` (uuid, primary key)
  - `product_id` (uuid, FK products)
  - `make` (text) - Vehicle make (Toyota, Ford...)
  - `model` (text) - Vehicle model
  - `year_from` (integer)
  - `year_to` (integer)
  - `engine` (text) - Engine code/spec
  - `notes` (text)

  ## Security
  - RLS enabled on all tables
  - Public read access for products, brands, categories, vehicle_applications
  - Authenticated admin write access controlled via app_metadata role
*/

-- BRANDS
CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  logo_url text DEFAULT '',
  country text DEFAULT '',
  description text DEFAULT '',
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active brands"
  ON brands FOR SELECT
  USING (active = true);

CREATE POLICY "Admins can insert brands"
  ON brands FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update brands"
  ON brands FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete brands"
  ON brands FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  parent_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  icon text DEFAULT '',
  description text DEFAULT '',
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active categories"
  ON categories FOR SELECT
  USING (active = true);

CREATE POLICY "Admins can insert categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update categories"
  ON categories FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete categories"
  ON categories FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- PRODUCTS
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sku text UNIQUE NOT NULL,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  technical_specs jsonb DEFAULT '{}',
  brand_id uuid REFERENCES brands(id) ON DELETE SET NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  images text[] DEFAULT '{}',
  weight numeric DEFAULT 0,
  dimensions jsonb DEFAULT '{}',
  oem_codes text[] DEFAULT '{}',
  barcode text DEFAULT '',
  stock_quantity integer DEFAULT 0,
  min_order_qty integer DEFAULT 1,
  price numeric DEFAULT 0,
  active boolean DEFAULT true,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active products"
  ON products FOR SELECT
  USING (active = true);

CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- VEHICLE APPLICATIONS
CREATE TABLE IF NOT EXISTS vehicle_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  make text NOT NULL,
  model text NOT NULL,
  year_from integer,
  year_to integer,
  engine text DEFAULT '',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE vehicle_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read vehicle applications"
  ON vehicle_applications FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert vehicle applications"
  ON vehicle_applications FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update vehicle applications"
  ON vehicle_applications FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete vehicle applications"
  ON vehicle_applications FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_products_brand_id ON products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_name_search ON products USING gin(to_tsvector('portuguese', name || ' ' || description));
CREATE INDEX IF NOT EXISTS idx_vehicle_applications_product_id ON vehicle_applications(product_id);
CREATE INDEX IF NOT EXISTS idx_vehicle_applications_make_model ON vehicle_applications(make, model);

-- SEED DATA
INSERT INTO brands (name, slug, country, description) VALUES
  ('Bosch', 'bosch', 'Alemanha', 'Líder global em tecnologia automotiva e industrial'),
  ('Denso', 'denso', 'Japão', 'Fornecedora premium de componentes automotivos OEM'),
  ('NGK', 'ngk', 'Japão', 'Especialista em velas de ignição e componentes de ignição'),
  ('Monroe', 'monroe', 'Bélgica', 'Referência mundial em amortecedores e suspensão'),
  ('SKF', 'skf', 'Suécia', 'Rolamentos e soluções de vedação de alta performance'),
  ('Gates', 'gates', 'EUA', 'Correias e sistemas de transmissão de potência'),
  ('Mahle', 'mahle', 'Alemanha', 'Componentes de motor e sistemas de filtragem'),
  ('TRW', 'trw', 'EUA', 'Sistemas de freios e segurança automotiva')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug, icon, description) VALUES
  ('Motor', 'motor', 'Cog', 'Componentes internos e externos do motor'),
  ('Freios', 'freios', 'Circle', 'Discos, pastilhas, tambores e componentes de freio'),
  ('Suspensão', 'suspensao', 'ArrowUpDown', 'Amortecedores, molas e componentes de suspensão'),
  ('Elétrica', 'eletrica', 'Zap', 'Alternadores, motores de partida e componentes elétricos'),
  ('Ignição', 'ignicao', 'Flame', 'Velas, bobinas e sistema de ignição'),
  ('Transmissão', 'transmissao', 'Settings', 'Embreagem, câmbio e eixos de transmissão'),
  ('Filtros', 'filtros', 'Filter', 'Filtros de óleo, ar, combustível e cabine'),
  ('Arrefecimento', 'arrefecimento', 'Thermometer', 'Radiadores, bombas d''água e componentes de arrefecimento')
ON CONFLICT (slug) DO NOTHING;
