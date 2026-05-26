import { useState } from 'react';
import { useAuth } from '../lib/auth';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminProducts from './admin/AdminProducts';
import AdminBrands from './admin/AdminBrands';
import AdminCategories from './admin/AdminCategories';
import LoginPage from './LoginPage';

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

export default function AdminPage({ onNavigate }: AdminPageProps) {
  const { user, loading } = useAuth();
  const [section, setSection] = useState('dashboard');

  if (loading) return null;
  if (!user) return <LoginPage onNavigate={onNavigate} />;

  const content = {
    dashboard: <AdminDashboard />,
    products: <AdminProducts />,
    brands: <AdminBrands />,
    categories: <AdminCategories />,
  }[section] ?? <AdminDashboard />;

  return (
    <AdminLayout
      activeSection={section}
      onSection={setSection}
      onNavigate={onNavigate}
    >
      {content}
    </AdminLayout>
  );
}
