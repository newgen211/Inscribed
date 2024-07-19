import { createContext, useState, ReactNode, useMemo, useEffect } from 'react';
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

// Light Mode theme settings
const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#5c6bc0',  // A slightly lighter shade of blue
      contrastText: '#ffffff',  // White text for better legibility on darker blue
    },
    secondary: {
      main: '#ec407a',  // A softer pink than the original
      contrastText: '#000000',  // Black text to contrast the lighter secondary color
    },
    background: {
      default: '#f4f4f4',  // A light grey that is easy on the eyes
      paper: '#ffffff',  // Pure white for paper elements
    },
    text: {
      primary: '#212121',  // Darker grey for primary text to ensure good readability
      secondary: '#757575',  // Lighter grey for secondary text
    }
  },
};

// Dark Mode theme settings
const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#7986cb',  // A more vibrant blue to pop against dark backgrounds
      contrastText: '#000000',  // Black text to provide a strong contrast on light blue
    },
    secondary: {
      main: '#ff80ab',  // A brighter pink to ensure visibility in dark mode
      contrastText: '#ffffff',  // White text for sufficient contrast
    },
    background: {
      default: '#303030',  // Very dark grey almost black for main background
      paper: '#424242',  // Dark grey for elements like cards and dialogs
    },
    text: {
      primary: '#ffffff',  // White text for best readability in dark mode
      secondary: '#bbbbbb',  // Slightly dimmed white for less crucial text elements
    }
  },
};

{/* Theme Provider */}
export const CustomThemeProvider = ({ children }: ThemeProviderProps) => {
    
    {/* Define State */}
    const [isDarkMode, setIsDarkMode] = useState(() => {

      // Check local storage for theme prefrences
      const savedMode = localStorage.getItem('themeMode');
      return savedMode ? JSON.parse(savedMode) : false;

    });                    // State for dark/light mode

    // Update localStorage whenever the theme mode changes
    useEffect(() => {

      localStorage.setItem('themeMode', JSON.stringify(isDarkMode));
      
    }, [isDarkMode]);

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
