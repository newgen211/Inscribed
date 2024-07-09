import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path='/' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignupPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />

      </Routes>

    </BrowserRouter>

  );

}