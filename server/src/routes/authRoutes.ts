import express from 'express';
import sanitizeRequest from '../middlewares/sanitzeRequest';
import registerController from '../controllers/auth/registerController';

const authRouter = express.Router();

authRouter.post('/register', sanitizeRequest, registerController);

export default authRouter;