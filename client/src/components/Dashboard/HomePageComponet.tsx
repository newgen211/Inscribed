import React, { useState, useEffect, useContext } from 'react';
import { Box, Stack, CircularProgress, Typography } from '@mui/material';
import { ThemeContext } from '../../contexts/ThemeContext'; // Correct import path if necessary
import Post, { PostProps } from './PostContainer';

const HomePageComponent: React.FC = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useContext(ThemeContext)!;

  const sessionToken = localStorage.getItem('token');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://inscribed-22337aee4c1b.herokuapp.com/api/user/get-posts', {
          headers: {
            'Authorization': `Bearer ${sessionToken}`, // Include the token in the request headers
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        const data: PostProps[] = responseData.data.map((post: any) => ({
          id: post._id,
          userId: post.user_id,
          content: post.post_content,
          like_count: post.number_of_likes,
          repost_count: 0, // Assuming repost_count is not available
          comment_count: 0, // Assuming comment_count is not available
          created_at: post.time_posted,
          updated_at: post.time_posted, // Assuming updated_at is not available
          comments: [] // Assuming comments are not included in the response for now
        }));

        // Sort posts by created_at from newest to oldest
        const sortedPosts = data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setPosts(sortedPosts);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div style={{ backgroundColor: theme.palette.background.default, height: '100vh' }}>
      <Box
        position="relative"
        left="20%"
        top="0"
        bottom="0"
        width="70%"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          bgcolor: 'secondary.main.contrastText',
          padding: 2,
          overflowY: 'auto',
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Stack spacing={2} direction="column">
            {posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                userId={post.userId}
                content={post.content}
                like_count={post.like_count}
                repost_count={post.repost_count}
                comment_count={post.comment_count}
                created_at={post.created_at}
                updated_at={post.updated_at}
                comments={post.comments}
              />
            ))}
          </Stack>
        )}
      </Box>
    </div>
  );
};

export default HomePageComponent;
