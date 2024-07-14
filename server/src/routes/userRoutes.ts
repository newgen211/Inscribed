import express from 'express';
import followController from '../controllers/user/followController';
import isValidUser from '../middlewares/isValidUser';

const userRouter = express.Router();

userRouter.post('/follow', isValidUser, followController);

export default userRouter;