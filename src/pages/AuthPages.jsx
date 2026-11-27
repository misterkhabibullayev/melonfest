import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus } from 'lucide-react';

export const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(
      {
        id: 'user_1',
        first_name: 'Anvar',
        last_name: 'Qodirov',
        email: email || 'anvar@qovunsayli.uz',
      },
      'mock_token_123'
    );
    navigate('/');
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-16">
      <div className="card p-8 border border-border space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-extrabold text-content">{t('ui.login_title', 'Hisobga kirish')}</h1>
          <p className="text-xs text-muted">Festival xizmatlaridan to'liq foydalanish uchun tizimga kiring</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-content">{t('ui.email', 'Elektron pochta')}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.uz"
              className="w-full px-3.5 py-2.5 rounded-xl bg-body border border-border text-sm text-content focus-ring"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 text-content">{t('ui.password', 'Parol')}</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-body border border-border text-sm text-content focus-ring"
            />
          </div>

          <button
            type="submit"
            className="button-primary w-full py-2.5 text-sm flex items-center justify-center gap-2 focus-ring"
          >
            <LogIn className="w-4 h-4" aria-hidden="true" />
            <span>{t('ui.login', 'Kirish')}</span>
          </button>
        </form>

        <div className="text-center text-xs text-muted pt-2 border-t border-border">
          <span>{t('ui.not_registered', 'Hisobingiz yo\'qmi?')} </span>
          <Link to="/register" className="text-primary font-bold hover:underline focus-ring rounded">
            {t('ui.sign_up', 'Ro\'yxatdan o\'tish')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(
      {
        id: 'user_new',
        first_name: firstName || 'Mehmon',
        last_name: lastName || 'Foydalanuvchi',
        email: email || 'user@qovunsayli.uz',
      },
      'mock_token_new'
    );
    navigate('/');
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-16">
      <div className="card p-8 border border-border space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-extrabold text-content">{t('ui.sign_up_title', 'Hisob yaratish')}</h1>
          <p className="text-xs text-muted">Qovun Sayli festivaliga ro'yxatdan o'ting</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-content">{t('ui.first_name', 'Ism')}</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ismingiz"
                className="w-full px-3.5 py-2.5 rounded-xl bg-body border border-border text-sm text-content focus-ring"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-content">{t('ui.last_name', 'Familiya')}</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Familiyangiz"
                className="w-full px-3.5 py-2.5 rounded-xl bg-body border border-border text-sm text-content focus-ring"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 text-content">{t('ui.email', 'Elektron pochta')}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.uz"
              className="w-full px-3.5 py-2.5 rounded-xl bg-body border border-border text-sm text-content focus-ring"
            />
          </div>

          <button
            type="submit"
            className="button-primary w-full py-2.5 text-sm flex items-center justify-center gap-2 focus-ring"
          >
            <UserPlus className="w-4 h-4" aria-hidden="true" />
            <span>{t('ui.sign_up', 'Ro\'yxatdan o\'tish')}</span>
          </button>
        </form>

        <div className="text-center text-xs text-muted pt-2 border-t border-border">
          <span>{t('ui.already_have_account', 'Akkountingiz bormi?')} </span>
          <Link to="/login" className="text-primary font-bold hover:underline focus-ring rounded">
            {t('ui.login', 'Kirish')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export const ProfilePage = () => {
  const { t } = useTranslation();
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="container max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-content">{t('ui.not_logged_in', 'Hisobga kirilmagan')}</h2>
        <Link to="/login" className="button-primary inline-block text-xs focus-ring">
          {t('ui.login', 'Kirish')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-xl mx-auto px-4 py-12 space-y-8">
      <div className="card p-8 border border-border space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-border">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 text-primary font-extrabold text-2xl flex items-center justify-center" aria-hidden="true">
            {user.first_name?.[0]}{user.last_name?.[0]}
          </div>
          <div>
            <h2 className="text-xl font-bold text-content">{user.first_name} {user.last_name}</h2>
            <p className="text-xs text-muted">{user.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            to="/tickets/me"
            className="card p-4 flex flex-row items-center justify-between hover:border-primary/40 text-sm font-semibold focus-ring"
          >
            <span>{t('ui.my_tickets', 'Mening chiptalarim')}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <button
          onClick={() => {
            logoutUser();
            navigate('/');
          }}
          className="w-full py-2.5 rounded-xl border border-urgent/40 text-urgent hover:bg-urgent/10 font-bold text-xs transition-colors cursor-pointer focus-ring"
        >
          {t('ui.logout', 'Hisobdan chiqish')}
        </button>
      </div>
    </div>
  );
};

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container max-w-lg mx-auto px-4 py-24 text-center space-y-6">
      <div className="text-7xl font-extrabold text-primary">404</div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-content">{t('not_found.title', 'Sahifa topilmadi!')}</h1>
      <p className="text-sm text-muted">
        {t('not_found.description', 'Afsuski, siz qidirayotgan sahifa topilmadi.')}
      </p>
      <Link to="/" className="button-primary inline-block text-xs font-bold focus-ring">
        {t('not_found.homepage', 'Bosh sahifaga qaytish')}
      </Link>
    </div>
  );
};
