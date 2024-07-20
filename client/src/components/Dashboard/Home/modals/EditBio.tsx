import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { IUserInfo } from '../../../../pages/Dashboard';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import axios, { AxiosResponse } from 'axios';

/* Defines types and interfaces */
interface IEditBioProps {
    userInfo            : IUserInfo;
    editModalOpen       : boolean;
    setEditModalOpen    : (editModalOpen: boolean) => void;
    fetchUserData       : () => void; 
};

export default function EditBio(props: IEditBioProps) {

    /* Define State Variables */
    const [bio, setBio] = useState<string>('');
    const [isLoading, setIsLoading]                         = useState<boolean>(false);
    const [serverResponseMessage, setServerResponseMessage] = useState<string>('');
    const [serverResponseCode, setServerResponseCode]       = useState<number>(0);
    const [showAlert, setShowAlert]                         = useState<boolean>(false);

    /* Get logout function from global auth state */
    const { logout } = useAuth();

    /* Handle User Save */
    const handleSave = async () => {

        try {

            // Set the loading state to true while processing the request
            setIsLoading(true);

            // Get the user session token from local storage
            const token: string | null = localStorage.getItem('token');

            // If there is no token the user is not logged in, so update the auth state accordingly
            if(!token) logout();

            // Attempt to update user's bio
            const response: AxiosResponse<any, any> = await axios.patch('/api/user/update-bio', { bio: bio }, { headers: { Authorization: `Bearer ${token}` } });

            // Set the response code and server message
            setServerResponseCode(response.data.code);
            setServerResponseMessage(response.data.message);

            // Get the new user data
            props.fetchUserData();

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

            // Reset the loading state when request is finished
            setIsLoading(false);

            // Set show alert to true to show server response
            setShowAlert(true);

        }

    };

    // Auto dismiss the server alert after 3 seconds
    useEffect(() => {

        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 3000);
            props.setEditModalOpen(false);
            return () => clearTimeout(timer);
        }

    }, [showAlert]);

    return (

        <Dialog open={props.editModalOpen} onClose={() => props.setEditModalOpen(false)} fullWidth maxWidth='sm'>

            {/* Modal title */}
            <DialogTitle>Edit Bio</DialogTitle>

            {/* Show Server Response Message */}
            <Box sx={{ mb: 2 }}>
                { showAlert && <Alert severity={serverResponseCode === 200 ? 'success' : 'error'}>{serverResponseMessage}</Alert> }
            </Box>

            {/* Main Modal Content */}
            <DialogContent>

                <DialogContentText>Update your bio to let others know more about you</DialogContentText>

                <TextField 
                    autoFocus
                    fullWidth
                    multiline
                    margin='dense'
                    id='bio'
                    name='bio'
                    label='User Bio'
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />

            </DialogContent>

            {/* Update Bio Modal Buttons */}
            <DialogActions>

                <Button onClick={() => props.setEditModalOpen(false)}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>

            </DialogActions>

        </Dialog>

    );

}