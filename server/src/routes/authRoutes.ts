import express from 'express';
import { validateRequestInput } from '../middleware/validateRequestInput';
import { RegisterSchema } from '../schemas/auth/registerSchema';
import registerController from '../controllers/auth/registerController';
import { RequestVerificationEmailSchema } from '../schemas/auth/requestVerificationEmailSchema';
import requestAccountVerificationEmailController from '../controllers/auth/requestVerificationEmailController';
import verifyAccountController from '../controllers/auth/verifyAccountController';
import { RequestPasswordResetSchema } from '../schemas/auth/requestPasswordResetSchema';
import requestPasswordResetController from '../controllers/auth/requestPasswordResetController';
import { ResetPasswordSchema } from '../schemas/auth/resetPasswordSchema';
import resetPasswordController from '../controllers/auth/resetPasswordController';
import { LoginSchema } from '../schemas/auth/loginSchema';
import loginController from '../controllers/auth/loginController';

const authRouter = express.Router();

authRouter.post('/register', validateRequestInput(RegisterSchema), registerController);
authRouter.post('/request-account-verification-email', validateRequestInput(RequestVerificationEmailSchema), requestAccountVerificationEmailController);
authRouter.post('/verify-account', verifyAccountController);
authRouter.post('/request-password-reset', validateRequestInput(RequestPasswordResetSchema), requestPasswordResetController);
authRouter.post('/reset-password', validateRequestInput(ResetPasswordSchema), resetPasswordController);
authRouter.post('/login', validateRequestInput(LoginSchema), loginController);

export default authRouter;