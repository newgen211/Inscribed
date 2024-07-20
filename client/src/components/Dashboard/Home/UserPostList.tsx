import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import axios, { AxiosResponse } from 'axios';
import { APIResponse } from '../../../types/APIResponse';
import { Box, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Favorite, Edit, Delete } from '@mui/icons-material';

/* Define types and interfaces */
interface IPost {
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
    const [posts, setPosts]     = useState<IPost[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [page, setPage]       = useState<number>(1);
    
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


    return (

        <Box>

            {/* Title */}
            <Typography>Post's</Typography>

            {/* Display user posts */}
            {posts.length > 0 ? 
            
            <InfiniteScroll dataLength={posts.length} next={fetchPosts} hasMore={hasMore} loader={<Typography variant='body2' component='p'>Loading...</Typography>} endMessage={<Typography variant='body2' component='p'>No more posts to load.</Typography>}>
                
                { posts.map(post => (
                    
                    <Card sx={{ m: 2 }}>

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

                                <IconButton>
                                    <Favorite />
                                    <Typography component='p'>{post.number_of_likes}</Typography>
                                </IconButton>

                                <IconButton>
                                    <Edit />
                                </IconButton>

                                <IconButton>
                                    <Delete />
                                </IconButton>

                            </Box>

                            <Typography variant="caption" color="text.secondary">
                                {post.time_posted}
                            </Typography>

                            </Box>
                            
                        </CardActions>
                    </Card>

                )) }

            </InfiniteScroll>

            : <Typography component='p' variant='body1'>No posts to display.</Typography>}

        </Box>

    );

}
