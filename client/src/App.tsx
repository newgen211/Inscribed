import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import SuccessPage from './pages/SuccessPage';
import RequestPasswordResetPage from './pages/RequestPasswordResetPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProtectedRoute from './components/utils/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';

export default function App() {

  return (
    
    <BrowserRouter>
    
      <Routes>
        
        {/* Auth Routes */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/register-success' element={<SuccessPage title='Account Created Successfully' message='Your account has been created. Dont forget to verify your account' linkTitle='To Login' redirectLink='/' />} />
        <Route path='/request-password-reset' element={<RequestPasswordResetPage />} />
        <Route path='/reset-email-sent' element={<SuccessPage title='Password Reset Email Sent' message='If the email belongs to a valid account, then the email is on the way' linkTitle='To Home' redirectLink='/' />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>

          <Route path='/dashboard' element={<Dashboard />} />

        </Route>

      </Routes>

    </BrowserRouter>

  );
  
}
