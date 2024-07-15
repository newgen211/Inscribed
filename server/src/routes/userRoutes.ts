import express from 'express';
import isLoggedIn from '../middlewares/isLoggedIn';
import sendFollowRequestController from '../controllers/user/sendFollowRequest/sendFollowRequestController';
import approveFollowRequestController from '../controllers/user/approveFollowRequest/approveFollowRequestController';
import unfollowController from '../controllers/user/unfollow/unfollowController';
import deleteAccountController from '../controllers/user/deleteAccount/deleteAccountController';
import updateAccountController from '../controllers/user/updateAccount/updateAccountController';
import getFollowersController from '../controllers/user/getFollowers/getFollowersController';
import getFollowingController from '../controllers/user/getFollowing/getFollowingController';
import createNewPostController from '../controllers/user/createNewPost/createNewPostController';
import getPostsController from '../controllers/user/getPosts/getPostsController';
import getFeedController from '../controllers/user/getFeed/getFeedController';
import getDiscoverController from '../controllers/user/getDiscover/getDiscoverController';
import deletePostController from '../controllers/user/deletePost/deletePostController';

const userRouter = express.Router();

userRouter.post('/follow-request', isLoggedIn, sendFollowRequestController);
userRouter.post('/approve-follow-request', isLoggedIn, approveFollowRequestController);
userRouter.post('/unfollow', isLoggedIn, unfollowController);
userRouter.post('/delete', isLoggedIn, deleteAccountController);
userRouter.post('/update-account', isLoggedIn, updateAccountController);
userRouter.get('/followers', isLoggedIn, getFollowersController);
userRouter.get('/following', isLoggedIn, getFollowingController);
userRouter.post('/new-post', isLoggedIn, createNewPostController);
userRouter.get('/get-posts', isLoggedIn, getPostsController);
userRouter.get('/feed', isLoggedIn, getFeedController);
userRouter.get('/discover', isLoggedIn, getDiscoverController);
userRouter.delete('/delete-post', isLoggedIn, deletePostController);

export default userRouter;