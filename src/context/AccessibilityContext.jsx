import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [grayscale, setGrayscale] = useState(() => localStorage.getItem('gray') === 'true');
  const [textSize, setTextSize] = useState(() => localStorage.getItem('text-size') || 'normal');

  useEffect(() => {
    // Theme application
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Grayscale application
    if (grayscale) {
      document.body.style.filter = 'grayscale(1)';
      localStorage.setItem('gray', 'true');
    } else {
      document.body.style.filter = 'none';
      localStorage.removeItem('gray');
    }
  }, [grayscale]);

  useEffect(() => {
    // Text size application
    document.documentElement.classList.remove('text-size-small', 'text-size-normal', 'text-size-large');
    document.documentElement.classList.add(`text-size-${textSize}`);
    localStorage.setItem('text-size', textSize);
  }, [textSize]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme || (theme === 'dark' ? 'light' : 'dark'));
  };

  const toggleGrayscale = (val) => {
    setGrayscale(typeof val === 'boolean' ? val : !grayscale);
  };

  const changeTextSize = (size) => {
    setTextSize(size);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        theme,
        toggleTheme,
        grayscale,
        toggleGrayscale,
        textSize,
        changeTextSize,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
