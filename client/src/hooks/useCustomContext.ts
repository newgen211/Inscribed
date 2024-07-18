import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export const useCustomTheme = () => {
    
    {/* Use the ThemeContext */}
    const context = useContext(ThemeContext);
    
    {/* Ensure useCustomTheme is used inside a CustomThemeProvider */}
    if (!context) {
      throw new Error('useCustomTheme must be used within a CustomThemeProvider');
    }

    {/* Return the teme context */}
    return context;
};