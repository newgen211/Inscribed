import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import PostPage from './pages/PostPage';
import SettingsPage from './pages/SettingsPage';
import ErrorPage from './pages/ErrorPage';
import SuccessfulAccountVerifyPage from './pages/SuccessfulAccountVerifyPage';
import UnsuccessfulAccountVerifyPage from './pages/UnsuccessfulAccountVerificationPage';
import SuccessfulAccountCreationPage from './pages/SuccessfultAccountCreationPage';

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path='/' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignupPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/successful-account-creation' element={<SuccessfulAccountCreationPage />} />
        <Route path='/successful-account-verification' element={<SuccessfulAccountVerifyPage />} />
        <Route path='/unsuccessful-account-verification' element={<UnsuccessfulAccountVerifyPage />} />
        
        
        
        <Route path='/post-page' element={<PostPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/error' element={<ErrorPage />} />
      </Routes>

    </BrowserRouter>

  );

}