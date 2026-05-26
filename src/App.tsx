import { useState, useCallback } from 'react';
import { AuthProvider } from './lib/auth';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';

type Page = 'home' | 'catalog' | 'product' | 'brands' | 'categories' | 'login' | 'admin';

interface NavState {
  page: Page;
  params: Record<string, string>;
}

export default function App() {
  const [nav, setNav] = useState<NavState>({ page: 'home', params: {} });

  const navigate = useCallback((page: string, params: Record<string, string> = {}) => {
    setNav({ page: page as Page, params });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSearch = useCallback((query: string) => {
    navigate('catalog', { search: query });
  }, [navigate]);

  const isAdmin = nav.page === 'admin';

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-950 flex flex-col">
        {!isAdmin && (
          <Header
            currentPage={nav.page}
            onNavigate={navigate}
            onSearch={handleSearch}
          />
        )}

        <main className={!isAdmin ? 'flex-1 pt-16' : 'flex-1'}>
          {nav.page === 'home' && (
            <HomePage onNavigate={navigate} />
          )}
          {nav.page === 'catalog' && (
            <CatalogPage
              onNavigate={navigate}
              initialSearch={nav.params.search}
              initialBrandId={nav.params.brandId}
              initialCategoryId={nav.params.categoryId}
            />
          )}
          {nav.page === 'product' && nav.params.slug && (
            <ProductDetailPage
              slug={nav.params.slug}
              onNavigate={navigate}
            />
          )}
          {nav.page === 'brands' && (
            <CatalogPage onNavigate={navigate} />
          )}
          {nav.page === 'categories' && (
            <CatalogPage onNavigate={navigate} />
          )}
          {nav.page === 'login' && (
            <LoginPage onNavigate={navigate} />
          )}
          {nav.page === 'admin' && (
            <AdminPage onNavigate={navigate} />
          )}
        </main>

        {!isAdmin && <Footer onNavigate={navigate} />}
      </div>
    </AuthProvider>
  );
}
