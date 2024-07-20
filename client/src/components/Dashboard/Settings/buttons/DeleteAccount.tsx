import { useEffect, useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { Alert, Box, Button, Modal, Typography } from '@mui/material';
import axios, { AxiosResponse } from 'axios';

/* Modal Style */

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

    /* Define State Variables */
    const [isLoading, setIsLoading]                         = useState<boolean>(false);
    const [serverResponseMessage, setServerResponseMessage] = useState<string>('');
    const [serverResponseCode, setServerResponseCode]       = useState<number>(0);
    const [showAlert, setShowAlert]                         = useState<boolean>(false);
    const [modalOpen, setModalOpen]                         = useState<boolean>(false);

    /* Get logout from auth state */
    const { logout } = useAuth();

    /* Handle Account Deletion */
    const handleClick = async () => {

        try {

            // Set the loading state to true while processing request
            setIsLoading(true);

            // Get the session token from local storage
            const token: string | null = localStorage.getItem('token');

            // If there is no token, the user is not logged in, handle the global auth state to logout
            if(!token) logout();

            // Attempt to delete the user's account
            const response: AxiosResponse<any, any> = await axios.post('/api/user/delete-account', {}, { headers: { Authorization: `Bearer ${token}` } });

            // Set the server response message
            setServerResponseMessage(response.data.message);

            // Set the server response code
            setServerResponseCode(response.data.code);

        }

        catch(error) {

            if(axios.isAxiosError(error) && error.response) {

                // Set the error message from the error response
                setServerResponseMessage(error.response.data.message);
                
                // Set the error code returned
                setServerResponseCode(error.response.data.code);

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

    // Auto dismiss the server alert after 5 seconds
    useEffect(() => {

        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 5000);
            setModalOpen(false);
            logout();
            return () => clearTimeout(timer);
        }

    }, [showAlert]);

    return (

        <Box>

            {/* Show any server response messages */}
            { showAlert && <Alert severity={serverResponseCode === 200 ? 'success' : 'error'}>{serverResponseMessage}</Alert> }

            {/* Title */}
            <Typography variant="h5" component="h2" gutterBottom>Delete Account</Typography>

            {/* Send Verification Email Button */}
            <Button variant='contained' color='error' sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: 200 }} onClick={() => setModalOpen(true)}>Delete Account</Button>

            {/* Delete Account Modal */}
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>

            <Box sx={style}>

                <Typography variant='h6' component='h2' sx={{mb: 2}}>Are You Sure?</Typography>
                <Typography component='p'>Click the button below to delete your account</Typography>
                <Typography component='p' sx={{color: 'error.main'}}>WARNING THIS CANNOT BE UNDONE</Typography>
                <Button variant='contained' color='error' sx={{mt: 2}} onClick={handleClick}>Delete Account</Button>

            </Box>

            </Modal>

        </Box>

    );

}