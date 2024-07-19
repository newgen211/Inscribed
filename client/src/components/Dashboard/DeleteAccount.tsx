import { Alert, Box, Button, Modal, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

/* Styles */
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };

export default function DeleteAccount() {

    /* Define State */
    const [open, setOpen] = useState<boolean>(false);
    const [serverResponseMessage, setServerErrorMessage] = useState<string>('');

    /* Get logout from auth state */
    const { logout } = useAuth();

    /* Handle a modal close */
    const handleClose = () => setOpen(false);

    /* Handle a modal open */
    const handleOpen = () => setOpen(true);

    /* Handle account deletion */
    const handleAccountDelete = async () => {

        try {

            // Get the auth token
            const token = localStorage.getItem('token');

            // Make sure token exists
            if(!token) {
                logout();
            }

            // Attempt to delete the account
            await axios.post('/api/user/delete-account', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Remove the current now invalid user session
            logout();

        }

        catch(error) {

            if(axios.isAxiosError(error) && error.response) {

                // Get the error response
                const response = error.response.data;

                // If the user is not logged in or has exprired
                if(response.code === 401) {
                    logout();
                }

                // Set the server message
                setServerErrorMessage(response.message);

            }

        }

    };

    return (
        
        <Box>

            {
                serverResponseMessage && <Alert severity='error'>{serverResponseMessage}</Alert>
            }

            <Typography variant="h5" component="h2" gutterBottom>
                Delete Account
            </Typography>

            <Button variant='contained' color='error' sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: 200 }} onClick={handleOpen}>Delete Account</Button>

            <Modal
                open={open}
                onClose={handleClose}
            >

                <Box sx={style}>

                    <Typography variant='h6' component='h2' sx={{mb: 2}}>Are You Sure?</Typography>
                    <Typography component='p'>Click the button below to delete your account</Typography>
                    <Typography component='p' sx={{color: 'error.main'}}>WARNING THIS CANNOT BE UNDONE</Typography>
                    <Button variant='contained' color='error' sx={{mt: 2}} onClick={handleAccountDelete}>Delete Account</Button>

                </Box>

            </Modal>

        </Box>

    );

}