import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import axios, { AxiosResponse } from 'axios';
import { APIResponse } from '../../../types/APIResponse';
import { Box, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

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
                    
                    <>
                        <Typography>{post.username}</Typography>
                        <Typography>{post.time_posted}</Typography>
                        <Typography>{post.post_content}</Typography>
                        <Typography>{post.post_belongs_to_me}</Typography>
                        <Typography>{post.number_of_likes}</Typography>
                        <Typography>{post.did_i_like_post}</Typography>
                    </>

                )) }

            </InfiniteScroll>

            : <Typography component='p' variant='body1'>No posts to display.</Typography>}

        </Box>

    );

}




























// import React, { useState, useEffect, useCallback } from 'react';
// import axios, { AxiosResponse } from 'axios';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import { Button, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
// import { Edit } from '@mui/icons-material';

// /* Define types and interfaces */
// interface IPost {
//     user_id: string;
//     time_posted: string;
//     post_belongs_to_me: boolean;
//     username: string;
//     post_content: string;
//     number_of_likes: number;
//     did_i_like_post: boolean;
// }

// interface APIResponse {
//     message: string;
//     code: number;
//     data: IPost[];
// }

// interface IPostCardProps {
//     post: IPost;
//     onLike: (postId: string) => void;
//     onUnlike: (postId: string) => void;
//     onEdit: (postId: string) => void;
// }

// export default function UserPostList() {
//     const [posts, setPosts] = useState<IPost[]>([]);
//     const [hasMore, setHasMore] = useState(true);
//     const [page, setPage] = useState(1);
//     const limit = 10;

//     const fetchPosts = useCallback(async () => {
//         try {
//             const response: AxiosResponse<APIResponse> = await axios.get('/api/user/get-posts', {
//                 params: { page, limit },
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             });

//             const newPosts = response.data.data;

//             if (Array.isArray(newPosts)) {
//                 setPosts(prevPosts => [...prevPosts, ...newPosts]);
//                 setPage(prevPage => prevPage + 1);
//                 setHasMore(newPosts.length === limit);
//             } else {
//                 console.error('Unexpected response format:', newPosts);
//                 setHasMore(false);
//             }
//         } catch (error) {
//             console.error('Error fetching posts:', error);
//             setHasMore(false);
//         }
//     }, [page]);

//     useEffect(() => {
//         fetchPosts();
//     }, [fetchPosts]);

//     const handleLike = (postId: string) => {
//         // Implement like functionality
//     };

//     const handleUnlike = (postId: string) => {
//         // Implement unlike functionality
//     };

//     const handleEdit = (postId: string) => {
//         // Implement edit functionality
//     };

//     return (
//         <div>
//             <h2>User Posts</h2>
//             {posts.length > 0 ? (
//                 <InfiniteScroll
//                     dataLength={posts.length}
//                     next={fetchPosts}
//                     hasMore={hasMore}
//                     loader={<h4>Loading...</h4>}
//                     endMessage={<p>No more posts to load.</p>}
//                 >
//                     {posts.map(post => (
//                         <PostCard
//                             key={post.user_id + post.time_posted}
//                             post={post}
//                             onLike={handleLike}
//                             onUnlike={handleUnlike}
//                             onEdit={handleEdit}
//                         />
//                     ))}
//                 </InfiniteScroll>
//             ) : (
//                 <p>No posts to display.</p>
//             )}
//         </div>
//     );
// }


// function PostCard({ post, onLike, onUnlike, onEdit }:IPostCardProps) {

//     return (
//         <Card style={{ marginBottom: '16px' }}>
//             <CardContent>
//                 <Typography variant="h6" component="div">
//                     {post.username}
//                 </Typography>
//                 <Typography variant="body1" component="p" style={{ marginTop: '8px', marginBottom: '8px' }}>
//                     {post.post_content}
//                 </Typography>
//                 <CardActions disableSpacing>
//                     {post.did_i_like_post ? (
//                         <Button variant="outlined" color="primary" onClick={() => onUnlike(post.user_id)}>
//                             Unlike
//                         </Button>
//                     ) : (
//                         <Button variant="outlined" color="primary" onClick={() => onLike(post.user_id)}>
//                             Like
//                         </Button>
//                     )}
//                     {post.post_belongs_to_me && (
//                         <IconButton aria-label="edit" onClick={() => onEdit(post.user_id)}>
//                             <Edit />
//                         </IconButton>
//                     )}
//                     <Typography variant="body2" color="textSecondary" style={{ marginLeft: 'auto' }}>
//                         {new Date(post.time_posted).toLocaleString()}
//                     </Typography>
//                 </CardActions>
//             </CardContent>
//         </Card>
//     );

// }