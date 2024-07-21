import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Button, TextField } from '@mui/material';

interface Comment {
  id: string;
  author: string;
  content: string;
}

interface CommentSectionProps {
  postId: string; // Expect postId as a prop
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<string>('');

  // Replace this with your actual JWT token
  const sessionToken = localStorage.getItem('token');

  const fetchComments = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    console.log('Fetching comments for postId:', postId); // Print postId before fetching
    try {
      const encodedPostId = encodeURIComponent(postId);
      const url = `https://inscribed-22337aee4c1b.herokuapp.com/api/user/get-post-comments?postId=${encodedPostId}&page=1`;
      console.log('Fetching comments from URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log('API Response:', responseData);

      if (responseData.code === 200) {
        const fetchedComments = responseData.data.comments.map((comment: any) => ({
          id: comment._id,
          author: comment.userId.username,
          content: comment.content,
        }));
        setComments(fetchedComments);
      } else {
        setError('No comments found for this post.');
      }
    } catch (error) {
      setError((error as Error).message);
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch comments when component mounts or postId changes
  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await fetch(
        'https://inscribed-22337aee4c1b.herokuapp.com/api/user/create-comment',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ postId, content: newComment }),
        }
      );

      if (response.ok) {
        const newCommentData = {
          id: `temp-id-${Date.now()}`,
          author: 'Current User', // Replace with actual user data
          content: newComment,
        };
        setComments([...comments, newCommentData]);
        setNewComment('');
      } else {
        throw new Error(`Failed to add comment: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error adding new comment:', error);
    }
  };

  return (
    <Box sx={{ marginTop: '20px' }}>
      <Typography variant="h6">Comments</Typography>
      {loading ? (
        <Typography variant="body2" sx={{ marginTop: '10px' }}>
          Loading comments...
        </Typography>
      ) : error ? (
        <Typography variant="body2" sx={{ marginTop: '10px', color: 'red' }}>
          {error}
        </Typography>
      ) : comments.length > 0 ? (
        comments.map((comment) => (
          <Box key={comment.id} sx={{ backgroundColor: '#f5f5f5', padding: '10px', marginTop: '10px' }}>
            <Typography variant="subtitle2">{comment.author}</Typography>
            <Typography variant="body2">{comment.content}</Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body2" sx={{ marginTop: '10px' }}>
          No comments yet.
        </Typography>
      )}
      <Divider sx={{ marginY: '10px' }} />
      <Box sx={{ marginTop: '10px' }}>
        <TextField
          label="Add a comment"
          variant="outlined"
          fullWidth
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ marginBottom: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleAddComment}>
          Add Comment
        </Button>
      </Box>
    </Box>
  );
};

export default CommentSection;
