import express from 'express';
import registerHandler from '../handlers/registerHandler';
import validateRegisterRequestBody from '../middlewares/validateRegisterRequestBody.mw';

const authRoutes = express.Router();

authRoutes.get('/test', (req, res) => res.send('Test Route'));
authRoutes.post('/register', validateRegisterRequestBody, registerHandler);

export default authRoutes;
