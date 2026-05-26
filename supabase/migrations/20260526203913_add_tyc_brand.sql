/*
  # Add TYC Brand

  Insert TYC (Tyco Electronics) as a brand for rear-view mirror products.
*/

INSERT INTO brands (name, slug, country, description) VALUES
  ('TYC', 'tyc', 'Taiwan', 'Fabricante especializado em retrovisores automotivos e componentes OEM')
ON CONFLICT (slug) DO NOTHING;
