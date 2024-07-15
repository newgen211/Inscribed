import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import SuccessfulAccountVerifyPage from './pages/SuccessfulAccountVerifyPage';
import UnsuccessfulAccountVerifyPage from './pages/UnsuccessfulAccountVerificationPage';
import SuccessfulAccountCreationPage from './pages/SuccessfulAccountCreationPage';
import VerifyEmailSentPage from './pages/VerifyEmailSentPage';
import RequestVerifyEmailPage from './pages/RequestVerifyEmailPage';
import AccountAlreadyVerifiedPage from './pages/AccountAlreadyVerifiedPage';

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
        <Route path='/verify-email-sent' element={<VerifyEmailSentPage />} />
        <Route path='/request-verify-email' element={<RequestVerifyEmailPage />} />
        <Route path='/account-already-verifed' element={<AccountAlreadyVerifiedPage />} />
        
        
      </Routes>

    </BrowserRouter>

  );

}