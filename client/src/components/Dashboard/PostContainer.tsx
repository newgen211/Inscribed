import React, { useState } from 'react';
import { Typography, Box, IconButton, Tooltip } from '@mui/material';
import { Favorite, Share } from '@mui/icons-material';
import CommentSection from './CommentSection'; // Import CommentSection component

export interface Comment {
  id: string;
  author: string;
  content: string;
}

export interface PostProps {
  id: string; // This is the post ID
  userId: string;
  content: string;
  like_count: number;
  repost_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
  comments?: Comment[];
}

const Post: React.FC<PostProps> = ({ id, userId, content, like_count, repost_count, comment_count, created_at, updated_at, comments = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleNewComment = (newCommentContent: string) => {
    // Optionally handle new comment update in the Post component if needed
  };

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="body1" gutterBottom onClick={toggleExpand} sx={{ cursor: 'pointer' }}>
        {content}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <Tooltip title={isFavorite ? "Unfavorite" : "Favorite"}>
          <IconButton onClick={handleFavoriteClick} sx={{ color: isFavorite ? 'red' : 'gray' }}>
            <Favorite />
          </IconButton>
        </Tooltip>
        <Tooltip title="Share">
          <IconButton>
            <Share />
          </IconButton>
        </Tooltip>
      </Box>
      {isExpanded && (
        <CommentSection
          postId={id}
          //onNewComment={handleNewComment}
        />
      )}
    </Box>
  );
};

export default Post;
