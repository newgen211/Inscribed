import { Alert, Box, Button, Typography } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { IUserInfo } from '../../../../pages/Dashboard';

/* Define types and interfaces */
interface IVerifyAccountProps {
    userInfo: IUserInfo;
    fetchUserData: () => void
};

export default function VerifyAccount(props: IVerifyAccountProps) {

    /* Define State Variables */
    const [isLoading, setIsLoading]                         = useState<boolean>(false);
    const [serverResponseMessage, setServerResponseMessage] = useState<string>('');
    const [serverResponseCode, setServerResponseCode]       = useState<number>(0);
    const [showAlert, setShowAlert]                         = useState<boolean>(false);

    /* Handle Account Verify Button Click */
    const handleClick = async () => {

        try {

            // Set the loading state to true while processing the request
            setIsLoading(true);

            // Get the email address from user info
            const email: string = props.userInfo.email;

            // Attempt to send verify email
            const response: AxiosResponse<any, any> = await axios.post('/api/auth/request-account-verification-email', {email});

            // Set the response code and server message
            setServerResponseCode(response.data.code);
            setServerResponseMessage(response.data.message);

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
            return () => clearTimeout(timer);
        }

    }, [showAlert]);

    return (

        <Box>

            {/* Show any server response messages */}
            { showAlert && <Alert severity={serverResponseCode === 200 ? 'success' : 'error'}>{serverResponseMessage}</Alert> }

            {/* Title */}
            <Typography variant="h5" component="h2" gutterBottom>Verify Account</Typography>

            {/* Send Verification Email Button */}
            <Button variant='contained' color='error' sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: 200 }} onClick={handleClick}>Verify Account</Button>

        </Box>

    );

}