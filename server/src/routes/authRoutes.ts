import express from 'express';
import registerController from '../controllers/auth/register/registerController';
import verifyAccountController from '../controllers/auth/verify/verifyAccountController';
import loginController from '../controllers/auth/login/loginController';
import requestPasswordResetController from '../controllers/auth/requestPasswordReset/requestPasswordResetController';
import resetPasswordController from '../controllers/auth/resetPassword/resetPasswordController';

const authRouter = express.Router();

authRouter.post('/register', registerController);
authRouter.get('/verify-account', verifyAccountController);
authRouter.post('/login', loginController);
authRouter.post('/request-password-reset', requestPasswordResetController);
authRouter.post('/reset-password', resetPasswordController);

export default authRouter;