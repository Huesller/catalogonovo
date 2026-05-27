import { useState } from 'react';
import { LogIn, Eye, EyeOff, AlertCircle, Layers } from 'lucide-react';
import { useAuth } from '../lib/auth';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      setError('Credenciais inválidas. Verifique e-mail e senha.');
    } else {
      onNavigate('admin');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-base-0 flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial from-accent/5 via-transparent to-transparent" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-radial from-accent/3 via-transparent to-transparent" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent via-accent-dark to-accent-muted flex items-center justify-center mx-auto mb-5 shadow-glow">
            <Layers className="w-7 h-7 text-base-0" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold text-base-900 mb-1">Área Restrita</h1>
          <p className="text-base-500 text-sm">Acesse o painel administrativo</p>
        </div>

        <div className="card-surface rounded-2xl p-8">
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-6 animate-scale-in">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-base-700 text-sm font-medium mb-2 block">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="input-field"
                placeholder="admin@empresa.com"
              />
            </div>

            <div>
              <label className="text-base-700 text-sm font-medium mb-2 block">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="input-field pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-base-500 hover:text-base-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full h-11 mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-base-0 border-t-transparent rounded-full animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              <span>{loading ? 'Entrando...' : 'Entrar'}</span>
            </button>
          </form>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => onNavigate('home')}
            className="text-base-500 text-sm hover:text-base-700 transition-colors"
          >
            Voltar ao catálogo
          </button>
        </div>
      </div>
    </div>
  );
}
