import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, CssBaseline, ThemeOptions, ThemeProvider } from '@mui/material';
import AuthProvider from './contexts/AuthContext.tsx';

export const themeOptions: ThemeOptions = {
 
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

const theme = createTheme(themeOptions);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider> 
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </AuthProvider>
)
