import express from 'express';
import sanitizeRequest from '../middlewares/sanitzeRequest';
import isValidUser from '../middlewares/isValidUser';
import createPostController from '../controllers/post/createPostController';
import getAllPostsController from '../controllers/post/getAllPostsController';

const postRouter = express.Router();

postRouter.post('/create', sanitizeRequest, isValidUser, createPostController);
postRouter.get('/get-all-posts', isValidUser, getAllPostsController);

export default postRouter;