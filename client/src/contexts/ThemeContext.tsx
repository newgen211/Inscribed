import { createContext, useState, ReactNode, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline, ThemeOptions } from '@mui/material';
import { Theme } from '@mui/system';

{/* Define Types for the theme context */}
export interface ThemeContextType {
  toggleTheme: () => void;
  theme: Theme;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  children: ReactNode;
}

{/* Light Mode theme settings */}
const lightThemeOptions: ThemeOptions = {
    palette: {
      mode: 'light',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
    },
};

{/* Dark Mode theme settings */}
const darkThemeOptions: ThemeOptions = {
    palette: {
      mode: 'dark',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
    },
};

{/* Theme Provider */}
export const CustomThemeProvider = ({ children }: ThemeProviderProps) => {
    
    {/* Define State */}
    const [isDarkMode, setIsDarkMode] = useState(false);                    // State for dark/light mode

    {/* Sets the theme options depending on the mode */}
    const theme = useMemo( () => createTheme(isDarkMode ? darkThemeOptions : lightThemeOptions), [isDarkMode] );

    {/* Toggles between light and dark mode */}
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    {/* JSX for the Custom Theme Provider */}
    return (

        <ThemeContext.Provider value={{ toggleTheme, theme }}>
        
        <ThemeProvider theme={theme}>
            
            <CssBaseline />
            {children}

        </ThemeProvider>

        </ThemeContext.Provider>

    );
};
