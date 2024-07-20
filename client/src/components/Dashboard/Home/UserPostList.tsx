import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import axios, { AxiosResponse } from 'axios';
import { APIResponse } from '../../../types/APIResponse';
import { Box, Button, Card, CardActions, CardContent, IconButton, Paper, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Favorite, FavoriteBorder, Edit, Delete } from '@mui/icons-material';
import DeletePostModal from './DeletePostModal';

/* Define types and interfaces */
export interface IPost {
    _id: string;
    user_id: string;
    time_posted: string;
    post_belongs_to_me: boolean;
    username: string;
    post_content: string;
    number_of_likes: number;
    did_i_like_post: boolean;
}

export default function UserPostList() {

    /* Define State */
    const [posts, setPosts]                     = useState<IPost[]>([]);
    const [hasMore, setHasMore]                 = useState<boolean>(true);
    const [page, setPage]                       = useState<number>(1);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    
    /* Global auth state */
    const { logout } = useAuth();

    /* Define post limit */
    const limit: number = 10;

    /* Function to get posts */
    const fetchPosts = useCallback( async () => {

        try {

            // Get the user token from local storage
            const token: string | null = localStorage.getItem('token');

            // If there is no token update the global auth state to be logged out
            if(!token) logout();

            // Make api call to get posts
            const response: AxiosResponse<APIResponse> = await axios.get('/api/user/get-posts', { params: { page, limit }, headers: { Authorization: `Bearer ${token}` } })
            
            // Get the new posts
            const newPosts = response.data.data;

            // If we have new posts add them to the state
            if(Array.isArray(newPosts)) {

                setPosts(prevPosts => [...prevPosts, ...newPosts]);
                setPage(prevPage => prevPage + 1);
                setHasMore(newPosts.length === limit);

            }

            else {

                console.error('Unexpected response format:', newPosts);
                setHasMore(false);

            }

        }

        catch(error) {

            console.error('Error fetching posts:', error);
            setHasMore(false)

        }

    },[page]);

    // Fetch the initial posts on load
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    /* Handle Like Post */
    const handleLike = async (postId: string) => {

        try {

            // Get the session token from local storage
            const token: string | null = localStorage.getItem('token');

            // If we don't have a token then we are not logged in so update the global auth state to be logged out
            if(!token) logout();

            // Attempt to like the post
            await axios.post('/api/user/like-post', {postId: postId}, { headers: { Authorization: `Bearer ${token}` } });

            // Update the affected post
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post._id === postId
                        ? { ...post, did_i_like_post: true, number_of_likes: post.number_of_likes + 1 }
                        : post
                )
            );

        }

        catch(error) {

            console.error('Error liking post:', error);

        }

    };

    /* Handle Unlike */
    const handleUnlike = async (postId: string) => {

        try {

            // Get the session token from local storage
            const token: string | null = localStorage.getItem('token');

            // If we don't have a token then we are not logged in so update the global auth state to be logged out
            if(!token) logout();

            // Attempt to like the post
            await axios.post('/api/user/unlike-post', {postId: postId}, { headers: { Authorization: `Bearer ${token}` } });

            // Update the affected post
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post._id === postId
                        ? { ...post, did_i_like_post: false, number_of_likes: post.number_of_likes - 1 }
                        : post
                )
            );

        }

        catch(error) {

            console.error('Error liking post:', error);

        }

    };


    return (

        <Box>

            {/* Title */}
            <Typography>Post's</Typography>

            {/* Display user posts */}
            {posts.length > 0 ? 
            
            <InfiniteScroll dataLength={posts.length} next={fetchPosts} hasMore={hasMore} loader={<Typography variant='body2' component='p'>Loading...</Typography>} endMessage={<Typography variant='body2' component='p'>No more posts to load.</Typography>}>
                
                { posts.map(post => (
                    
                    <>
                    <Card sx={{ my: 2 }}>

                        <CardContent>
                            
                            {/* Username */}
                            <Typography variant="subtitle1" component="div" gutterBottom>
                            @{post.username}
                            </Typography>

                            {/* Post Content */}
                            <Typography variant="body2" color="text.secondary">
                            {post.post_content}
                            </Typography>

                        </CardContent>

                        <CardActions disableSpacing>

                            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                            
                            <Box>

                                <IconButton onClick={() => post.did_i_like_post ? handleUnlike(post._id) : handleLike(post._id)}>
                                    {post.did_i_like_post ? <Favorite color='primary' /> : <FavoriteBorder color='primary' />}
                                    <Typography component='p'>{post.number_of_likes}</Typography>
                                </IconButton>

                                <IconButton>
                                    <Edit />
                                </IconButton>

                                <IconButton onClick={() => setDeleteModalOpen(true)}>
                                    <Delete color='error' />
                                </IconButton>

                            </Box>

                            <Typography variant="caption" color="text.secondary">
                                {post.time_posted}
                            </Typography>

                            </Box>
                            
                        </CardActions>
                    </Card>

                    <DeletePostModal deleteModalOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} _id={post._id} posts={posts} setPosts={setPosts} />
                    </>

                )) }

            </InfiniteScroll>

            : <Typography component='p' variant='body1'>No posts to display.</Typography>}

            

        </Box>

    );

}
