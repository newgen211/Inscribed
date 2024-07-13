import express from 'express';
import sanitizeRequest from '../middlewares/sanitzeRequest';
import isValidUser from '../middlewares/isValidUser';
import createPostController from '../controllers/post/createPostController';

const postRouter = express.Router();

postRouter.post('/create', sanitizeRequest, isValidUser, createPostController);

export default postRouter;