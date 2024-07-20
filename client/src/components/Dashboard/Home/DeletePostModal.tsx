import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, Alert } from '@mui/material';
import { useAuth } from '../../../hooks/useAuth';
import axios, { AxiosResponse } from 'axios';
import { APIResponse } from '../../../types/APIResponse';
import { IPost } from './UserPostList';

interface IDeletePostModalProps {
  deleteModalOpen    : boolean;
  setDeleteModalOpen : (deleteModalOpen: boolean) => void;
  _id                : string;
  posts              : IPost[];
  setPosts           : (posts: IPost[]) => void;
}

export default function DeletePostModal(props: IDeletePostModalProps) {

  /* Define State Variables */
  const [isLoading, setIsLoading]                         = useState<boolean>(false);
  const [serverResponseMessage, setServerResponseMessage] = useState<string>('');
  const [serverResponseCode, setServerResponseCode]       = useState<number>(0);
  const [showAlert, setShowAlert]                         = useState<boolean>(false);

  /* Logout function from global auth state */
  const { logout } = useAuth();

  /* Handle delete post */
  const handleDeletePost = async () => {

    try {

      // Set the loading state to true while proccessing the request
      setIsLoading(true);

      // Get the session token from localstorage
      const token: string | null = localStorage.getItem('token');

      // If there is no token update the global auth state to logged out
      if(!token) logout();

      const postId: string = props._id;

      console.log(postId);

      // Attempt to delete the post
      const response: AxiosResponse<APIResponse> = await axios.post('/api/user/delete-post', { postId: postId }, { headers: { Authorization: `Bearer ${token}` } });

      console.log(response);

      // Set the server response state
      setServerResponseCode(response.data.code);
      setServerResponseMessage(response.data.message);

      // Remove the affected post
      const updatedPosts = props.posts.filter((post: IPost) => post._id !== props._id);
      
      // Update the posts state with the new array
      props.setPosts(updatedPosts);


    }
    
    catch(error) {

      if(axios.isAxiosError(error) && error.response) {

        // Set the error message from the error response
        setServerResponseMessage(error.response.data.message);
        
        // Set the error code returned
        setServerResponseCode(error.response.data.code);

        // If the response if a expired/unauthroized user update the auth state accordingly
        if(error.response.data.code === 401) logout();

      }

      else {

          // Set a general error messge
          setServerResponseMessage('An unexpected error occured');
          setServerResponseCode(500);

      }

    }

    finally {

      // Reset the loading state when done done processing
      setIsLoading(false);

      // Set the show alert to true
      setShowAlert(true);

    }

  };

  // Auto dismiss the server alert after 5 seconds
  useEffect(() => {

    if (showAlert) {
        const timer = setTimeout(() => setShowAlert(false), 5000);
        props.setDeleteModalOpen(false);
        return () => clearTimeout(timer);
    }

}, [showAlert]);

  return (

      <Dialog open={props.deleteModalOpen} PaperProps={{ style: { boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.5)' } }} componentsProps={{ backdrop: { style: { backgroundColor: 'black', opacity: 0.5 } } }} >

        <DialogTitle>
          Delete Post
        </DialogTitle>

        {/* Show Server Response Message */}
        <Box sx={{ mb: 2 }}>
                { showAlert && <Alert severity={serverResponseCode === 200 ? 'success' : 'error'}>{serverResponseMessage}</Alert> }
        </Box>

        <DialogContent>

          <DialogContentText>
            Click below to delete the post. This action cannot be undone.
          </DialogContentText>

        </DialogContent>

        <DialogActions>

          <Button onClick={() => props.setDeleteModalOpen(false)} color='primary'>Close</Button>

          <Button onClick={handleDeletePost} color='error' autoFocus>
            Delete Post
          </Button>

        </DialogActions>

      </Dialog>
  );
}
