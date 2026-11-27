import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AuthProvider } from './context/AuthContext';
import { RootLayout } from './layouts/RootLayout';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContentsPage } from './pages/ContentsPage';
import { GalleryPage } from './pages/GalleryPage';
import { NominationPage } from './pages/NominationPage';
import { NewsPage, NewsDetailPage } from './pages/NewsPage';
import { TicketsPage, MyTicketsPage } from './pages/TicketsPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage, RegisterPage, ProfilePage, NotFoundPage } from './pages/AuthPages';

export default function App() {
  return (
    <AccessibilityProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contents" element={<ContentsPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="nomination" element={<NominationPage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="news/:id" element={<NewsDetailPage />} />
            <Route path="tickets" element={<TicketsPage />} />
            <Route path="tickets/me" element={<MyTicketsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </AccessibilityProvider>
  );
}
