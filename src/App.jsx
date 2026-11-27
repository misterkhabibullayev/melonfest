import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AuthProvider } from './context/AuthContext';
import { RootLayout } from './layouts/RootLayout';

import { HomePage } from './pages/HomePage';
import { ComingSoon } from './components/ComingSoon';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AccessibilityProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<ComingSoon />} />
              <Route path="contents" element={<ComingSoon />} />
              <Route path="gallery" element={<ComingSoon />} />
              <Route path="nomination" element={<ComingSoon />} />
              <Route path="news" element={<ComingSoon />} />
              <Route path="news/:id" element={<ComingSoon />} />
              <Route path="tickets" element={<ComingSoon />} />
              <Route path="tickets/me" element={<ComingSoon />} />
              <Route path="contact" element={<ComingSoon />} />
              <Route path="login" element={<ComingSoon />} />
              <Route path="register" element={<ComingSoon />} />
              <Route path="profile" element={<ComingSoon />} />
              <Route path="*" element={<ComingSoon />} />
            </Route>
          </Routes>
        </AuthProvider>
      </AccessibilityProvider>
    </MotionConfig>
  );
}
