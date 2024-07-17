import express from 'express';
import { validateRequestInput } from '../middleware/validateRequestInput.middleware';
import { RegisterSchema } from '../schemas/auth/register.schema';
import registerController from '../controllers/auth/register.controller';
import { RequestVerificationEmailSchema } from '../schemas/auth/requestVerificationEmail.schema';
import requestAccountVerificationEmailController from '../controllers/auth/requestVerificationEmail.controller';
import verifyAccountController from '../controllers/auth/verifyAccount.controller';
import { RequestPasswordResetSchema } from '../schemas/auth/requestPasswordReset.schema';
import requestPasswordResetController from '../controllers/auth/requestPasswordReset.controller';
import { ResetPasswordSchema } from '../schemas/auth/resetPassword.schema';
import resetPasswordController from '../controllers/auth/resetPassword.controller';
import { LoginSchema } from '../schemas/auth/login.schema';
import loginController from '../controllers/auth/login.controller';

const authRouter = express.Router();

authRouter.post('/register', validateRequestInput(RegisterSchema), registerController);
authRouter.post('/request-account-verification-email', validateRequestInput(RequestVerificationEmailSchema), requestAccountVerificationEmailController);
authRouter.post('/verify-account', verifyAccountController);
authRouter.post('/request-password-reset', validateRequestInput(RequestPasswordResetSchema), requestPasswordResetController);
authRouter.post('/reset-password', validateRequestInput(ResetPasswordSchema), resetPasswordController);
authRouter.post('/login', validateRequestInput(LoginSchema), loginController);

export default authRouter;