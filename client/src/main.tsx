import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AuthProvider from './contexts/AuthContext.tsx';
import { CustomThemeProvider } from './contexts/ThemeContext.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider> 
      <CustomThemeProvider>
        <App />
      </CustomThemeProvider>
    </AuthProvider>
)
