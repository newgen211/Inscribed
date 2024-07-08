import express from 'express';
import sanitizeRequest from '../middlewares/sanitzeRequest';
import registerController from '../controllers/auth/registerController';
import verifyAccountController from '../controllers/auth/verifyAccountController';
import loginController from '../controllers/auth/loginController';

const authRouter = express.Router();

authRouter.post('/register', sanitizeRequest, registerController);
authRouter.get('/verify-account/:token', sanitizeRequest, verifyAccountController);
authRouter.post('/login', sanitizeRequest, loginController);

export default authRouter;