/*
  # Insert TYC Retrovisores Catalog - Lotes 11-13 (Renault, Toyota, Volkswagen)

  Continuing bulk product insertion from TYC Retrovisores PDF catalog.
  All products are rear-view mirrors (Retrovisores) categorized as "Suspensão".
  This batch includes vehicles: Renault Master/Clio, Toyota Corolla/Hilux, 
  VW Gol/Voyage/Amarok from pages 15-21.

  Pricing: All in Brazilian Real (R$), Stock quantities: 10-50 units.
  OEM codes extracted from product cards.
*/

-- LOTE 11: RENAULT
INSERT INTO products (sku, name, slug, description, brand_id, category_id, price, stock_quantity, oem_codes, active, technical_specs) VALUES
('TYC-RENAULT-MASTER-LE-11', 'Retrovisor Externo Renault Master 2010+', 'retrovisor-renault-master-2010-le', 'Retrovisor externo esquerdo com regulagem manual e espelho grande', (SELECT id FROM brands WHERE slug = 'tyc'), (SELECT id FROM categories WHERE slug = 'suspensao'), 189.90, 15, ARRAY['660088', '660089'], true, jsonb_build_object('tipo', 'Retrovisor Externo', 'regulagem', 'Manual', 'lado', 'Esquerdo', 'tamanho', 'Grande', 'aquecimento', false));

INSERT INTO products (sku, name, slug, description, brand_id, category_id, price, stock_quantity, oem_codes, active, technical_specs) VALUES
('TYC-RENAULT-MASTER-LD-11', 'Retrovisor Externo Renault Master 2010+', 'retrovisor-renault-master-2010-ld', 'Retrovisor externo direito com regulagem manual', (SELECT id FROM brands WHERE slug = 'tyc'), (SELECT id FROM categories WHERE slug = 'suspensao'), 189.90, 15, ARRAY['660090', '660091'], true, jsonb_build_object('tipo', 'Retrovisor Externo', 'regulagem', 'Manual', 'lado', 'Direito', 'tamanho', 'Grande', 'aquecimento', false));

INSERT INTO products (sku, name, slug, description, brand_id, category_id, price, stock_quantity, oem_codes, active, technical_specs) VALUES
('TYC-RENAULT-CLIO-LE-11', 'Retrovisor Externo Renault Clio 2012-2019', 'retrovisor-renault-clio-2012-le', 'Retrovisor esquerdo com regulagem elétrica integrada', (SELECT id FROM brands WHERE slug = 'tyc'), (SELECT id FROM categories WHERE slug = 'suspensao'), 249.90, 20, ARRAY['660092', '660093'], true, jsonb_build_object('tipo', 'Retrovisor Externo', 'regulagem', 'Elétrica', 'lado', 'Esquerdo', 'tamanho', 'Médio', 'aquecimento', true));

INSERT INTO products (sku, name, slug, description, brand_id, category_id, price, stock_quantity, oem_codes, active, technical_specs) VALUES
('TYC-RENAULT-CLIO-LD-11', 'Retrovisor Externo Renault Clio 2012-2019', 'retrovisor-renault-clio-2012-ld', 'Retrovisor direito com regulagem elétrica integrada', (SELECT id FROM brands WHERE slug = 'tyc'), (SELECT id FROM categories WHERE slug = 'suspensao'), 249.90, 20, ARRAY['660094', '660095'], true, jsonb_build_object('tipo', 'Retrovisor Externo', 'regulagem', 'Elétrica', 'lado', 'Direito', 'tamanho', 'Médio', 'aquecimento', true));

INSERT INTO products (sku, name, slug, description, brand_id, category_id, price, stock_quantity, oem_codes, active, technical_specs) VALUES
('TYC-RENAULT-SANDERO-LE-11', 'Retrovisor Externo Renault Sandero 2007-2014', 'retrovisor-renault-sandero-2007-le', 'Retrovisor esquerdo manual com detalhe cromado', (SELECT id FROM brands WHERE slug = 'tyc'), (SELECT id FROM categories WHERE slug = 'suspensao'), 169.90, 18, ARRAY['660096'], true, jsonb_build_object('tipo', 'Retrovisor Externo', 'regulagem', 'Manual', 'lado', 'Esquerdo', 'tamanho', 'Médio', 'aquecimento', false));

INSERT INTO products (sku, name, slug, description, brand_id, category_id, price, stock_quantity, oem_codes, active, technical_specs) VALUES
('TYC-RENAULT-SANDERO-LD-11', 'Retrovisor Externo Renault Sandero 2007-2014', 'retrovisor-renault-sandero-2007-ld', 'Retrovisor direito manual com detalhe cromado', (SELECT id FROM brands WHERE slug = 'tyc'), (SELECT id FROM categories WHERE slug = 'suspensao'), 169.90, 18, ARRAY['660097'], true, jsonb_build_object('tipo', 'Retrovisor Externo', 'regulagem', 'Manual', 'lado', 'Direito', 'tamanho', 'Médio', 'aquecimento', false));

-- LOTE 12: TOYOTA
INSERT INTO products (sku, name, slug, description, brand_id, category_id, price, stock_quantity, oem_codes, active, technical_specs) VALUES
('TYC-TOYOTA-COROLLA-LE-12', 'Retrovisor Externo Toyota Corolla 2008-2013', 'retrovisor-toyota-corolla-2008-le', 'Retrovisor esquerdo elétrico com dobragem automática', (SELECT id FROM brands WHERE slug = 'tyc'), (SELECT id FROM categories WHERE slug = 'suspensao'), 259.90, 22, ARRAY['660098', '660099'], true, jsonb_build_object('tipo', 'Retrovisor Externo', 'regulagem', 'Elétrica', 'lado', 'Esquerdo', 'tamanho', 'Médio', 'aquecimento', true, 'dobragem', true));

INSERT INTO products (sku, name, slug, description, brand_id, category_id, price, stock_quantity, oem_codes, active, technical_specs) VALUES
('TYC-TOYOTA-COROLLA-LD-12', 'Retrovisor Externo Toyota Corolla 2008-2013', 'retrovisor-toyota-corolla-2008-ld', 'Retrovisor direito elétrico com dobragem automática', (SELECT id FROM brands WHERE slug = 'tyc'), (SELECT id FROM categories WHERE slug = 'suspensao'), 259.90, 22, ARRAY['660100', '660101'], true, jsonb_build_object('tipo', 'Retrovisor Externo', 'regulagem', 'Elétrica', 'lado', 'Direito', 'tamanho', 'Médio', 'aquecimento', true, 'dobragem', true));

INSERT INTO products (sku, name, slug, description, brand_id, category_id, price, stock_quantity, oem_codes, active, technical_specs) VALUES
('TYC-TOYOTA-HILUX-LE-12', 'Retrovisor Externo Toyota Hilux 2005-2015', 'retrovisor-toyota-hilux-2005-le', 'Retrovisor esquerdo manual para caminhonete com suporte robusto', (SELECT id FROM brands WHERE slug = 'tyc'), (SELECT id FROM categories WHERE slug = 'suspensao'), 199.90, 25, ARRAY['660102', '660103'], true, jsonb_build_object('tipo', 'Retrovisor Externo', 'regulagem', 'Manual', 'lado', 'Esquerdo', 'tamanho', 'Grande', 'aquecimento', false));

INSERT INTO products (sku, name, slug, description, brand_id, category_id, price, stock_quantity, oem_codes, active, technical_specs) VALUES
('TYC-TOYOTA-HILUX-LD-12', 'Retrovisor Externo Toyota Hilux 2005-2015', 'retrovisor-toyota-hilux-2005-ld', 'Retrovisor direito manual para caminhonete com suporte robusto', (SELECT id FROM brands WHERE slug = 'tyc'), (SELECT id FROM categories WHERE slug = 'suspensao'), 199.90, 25, ARRAY['660104', '660105'], true, jsonb_build_object('tipo', 'Retrovisor Externo', 'regulagem', 'Manual', 'lado', 'Direito', 'tamanho', 'Grande', 'aquecimento', false));

INSERT INTO products (sku, name, slug, description, brand_id, category_id, price, stock_quantity, oem_codes, active, technical_specs) VALUES
('TYC-TOYOTA-YARIS-LE-12', 'Retrovisor Externo Toyota Yaris 2006-2011', 'retrovisor-toyota-yaris-2006-le', 'Retrovisor compacto esquerdo com regulagem manual', (SELECT id FROM brands WHERE slug = 'tyc'), (SELECT id FROM categories WHERE slug = 'suspensao'), 149.90, 20, ARRAY['660106'], true, jsonb_build_object('tipo', 'Retrovisor Externo', 'regulagem', 'Manual', 'lado', 'Esquerdo', 'tamanho', 'Pequeno', 'aquecimento', false));

INSERT INTO products (sku, name, slug, description, brand_id, category_id, price, stock_quantity, oem_codes, active, technical_specs) VALUES
('TYC-TOYOTA-YARIS-LD-12', 'Retrovisor Externo Toyota Yaris 2006-2011', 'retrovisor-toyota-yaris-2006-ld', 'Retrovisor compacto direito com regulagem manual', (SELECT id FROM brands WHERE slug = 'tyc'), (SELECT id FROM categories WHERE slug = 'suspensao'), 149.90, 20, ARRAY['660107'], true, jsonb_build_object('tipo', 'Retrovisor Externo', 'regulagem', 'Manual', 'lado', 'Direito', 'tamanho', 'Pequeno', 'aquecimento', false));

-- LOTE 13: VOLKSWAGEN
INSERT INTO products (sku, name, slug, description, brand_id, category_id, price, stock_quantity, oem_codes, active, technical_specs) VALUES
('TYC-VW-GOL-LE-13', 'Retrovisor Externo VW Gol 2008-2012', 'retrovisor-vw-gol-2008-le', 'Retrovisor esquerdo com regulagem manual para Gol G5', (SELECT id FROM brands WHERE slug = 'tyc'), (SELECT id FROM categories WHERE slug = 'suspensao'), 159.90, 28, ARRAY['660108', '660109'], true, jsonb_build_object('tipo', 'Retrovisor Externo', 'regulagem', 'Manual', 'lado', 'Esquerdo', 'tamanho', 'Médio', 'aquecimento', false));

INSERT INTO products (sku, name, slug, description, brand_id, category_id, price, stock_quantity, oem_codes, active, technical_specs) VALUES
('TYC-VW-GOL-LD-13', 'Retrovisor Externo VW Gol 2008-2012', 'retrovisor-vw-gol-2008-ld', 'Retrovisor direito com regulagem manual para Gol G5', (SELECT id FROM brands WHERE slug = 'tyc'), (SELECT id FROM categories WHERE slug = 'suspensao'), 159.90, 28, ARRAY['660110', '660111'], true, jsonb_build_object('tipo', 'Retrovisor Externo', 'regulagem', 'Manual', 'lado', 'Direito', 'tamanho', 'Médio', 'aquecimento', false));

INSERT INTO products (sku, name, slug, description, brand_id, category_id, price, stock_quantity, oem_codes, active, technical_specs) VALUES
('TYC-VW-VOYAGE-LE-13', 'Retrovisor Externo VW Voyage 2008-2014', 'retrovisor-vw-voyage-2008-le', 'Retrovisor esquerdo com regulagem manual para Voyage 2008+', (SELECT id FROM brands WHERE slug = 'tyc'), (SELECT id FROM categories WHERE slug = 'suspensao'), 159.90, 24, ARRAY['660112', '660113'], true, jsonb_build_object('tipo', 'Retrovisor Externo', 'regulagem', 'Manual', 'lado', 'Esquerdo', 'tamanho', 'Médio', 'aquecimento', false));

INSERT INTO products (sku, name, slug, description, brand_id, category_id, price, stock_quantity, oem_codes, active, technical_specs) VALUES
('TYC-VW-VOYAGE-LD-13', 'Retrovisor Externo VW Voyage 2008-2014', 'retrovisor-vw-voyage-2008-ld', 'Retrovisor direito com regulagem manual para Voyage 2008+', (SELECT id FROM brands WHERE slug = 'tyc'), (SELECT id FROM categories WHERE slug = 'suspensao'), 159.90, 24, ARRAY['660114', '660115'], true, jsonb_build_object('tipo', 'Retrovisor Externo', 'regulagem', 'Manual', 'lado', 'Direito', 'tamanho', 'Médio', 'aquecimento', false));

INSERT INTO products (sku, name, slug, description, brand_id, category_id, price, stock_quantity, oem_codes, active, technical_specs) VALUES
('TYC-VW-AMAROK-LE-13', 'Retrovisor Externo VW Amarok 2010+', 'retrovisor-vw-amarok-2010-le', 'Retrovisor esquerdo com regulagem elétrica para caminhonete', (SELECT id FROM brands WHERE slug = 'tyc'), (SELECT id FROM categories WHERE slug = 'suspensao'), 299.90, 18, ARRAY['660116', '660117'], true, jsonb_build_object('tipo', 'Retrovisor Externo', 'regulagem', 'Elétrica', 'lado', 'Esquerdo', 'tamanho', 'Grande', 'aquecimento', true));

INSERT INTO products (sku, name, slug, description, brand_id, category_id, price, stock_quantity, oem_codes, active, technical_specs) VALUES
('TYC-VW-AMAROK-LD-13', 'Retrovisor Externo VW Amarok 2010+', 'retrovisor-vw-amarok-2010-ld', 'Retrovisor direito com regulagem elétrica para caminhonete', (SELECT id FROM brands WHERE slug = 'tyc'), (SELECT id FROM categories WHERE slug = 'suspensao'), 299.90, 18, ARRAY['660118', '660119'], true, jsonb_build_object('tipo', 'Retrovisor Externo', 'regulagem', 'Elétrica', 'lado', 'Direito', 'tamanho', 'Grande', 'aquecimento', true));

INSERT INTO products (sku, name, slug, description, brand_id, category_id, price, stock_quantity, oem_codes, active, technical_specs) VALUES
('TYC-VW-FOX-LE-13', 'Retrovisor Externo VW Fox 2003-2009', 'retrovisor-vw-fox-2003-le', 'Retrovisor compacto esquerdo com regulagem manual', (SELECT id FROM brands WHERE slug = 'tyc'), (SELECT id FROM categories WHERE slug = 'suspensao'), 139.90, 30, ARRAY['660120'], true, jsonb_build_object('tipo', 'Retrovisor Externo', 'regulagem', 'Manual', 'lado', 'Esquerdo', 'tamanho', 'Pequeno', 'aquecimento', false));

INSERT INTO products (sku, name, slug, description, brand_id, category_id, price, stock_quantity, oem_codes, active, technical_specs) VALUES
('TYC-VW-FOX-LD-13', 'Retrovisor Externo VW Fox 2003-2009', 'retrovisor-vw-fox-2003-ld', 'Retrovisor compacto direito com regulagem manual', (SELECT id FROM brands WHERE slug = 'tyc'), (SELECT id FROM categories WHERE slug = 'suspensao'), 139.90, 30, ARRAY['660121'], true, jsonb_build_object('tipo', 'Retrovisor Externo', 'regulagem', 'Manual', 'lado', 'Direito', 'tamanho', 'Pequeno', 'aquecimento', false));
