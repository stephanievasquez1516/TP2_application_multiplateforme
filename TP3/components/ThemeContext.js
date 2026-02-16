import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme doit être utilisé dans ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      background: isDark ? '#1a1a1a' : '#f5f5f5',
      card: isDark ? '#2c2c2c' : '#ffffff',
      text: isDark ? '#ffffff' : '#2c3e50',
      textSecondary: isDark ? '#b0b0b0' : '#7f8c8d',
      primary: isDark ? '#4a9eff' : '#3498db',
      header: isDark ? '#1f3a52' : '#3498db',
      error: '#e74c3c',
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};