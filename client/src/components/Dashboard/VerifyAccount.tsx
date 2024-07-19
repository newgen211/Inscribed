import { Alert, Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function VerifyAccount({email}:{email: string}) {

    /* Define State */
    const [serverResponseMessage, setServerResponseMessage] = useState('');         // Holds server error messages
    const [isLoading, setIsLoading] = useState(false);                              // Disables the register button while form is handling a submit
    const [serverResponseCode, setServerResponseCode] = useState(0);                // State to track server response code
    const [showAlert, setShowAlert] = useState(false);
    

    /* Send Verification Email on click */
    const handleClick = async () => {

        try {

            // Set the loading state to true while making request
            setIsLoading(true);

            // Attempt to send verification email
            const response = await axios.post('/api/auth/request-account-verification-email', {email: email});

            // Set response state
            setServerResponseMessage(response.data.message);
            setServerResponseCode(response.data.code);
            setShowAlert(true);
            

        }

        catch(error) {

            if(axios.isAxiosError(error) && error.response) {

                // Get the error response
                const response = error.response.data;

                // Set response state
                setServerResponseMessage(response.data.message);
                setServerResponseCode(response.data.code);
                setShowAlert(true); 

            }

        }

        finally {

            // Set the loading state to false when request is done
            setIsLoading(true);

        }

    };

    // Auto-dismiss alert after 5 seconds
    useEffect(() => {

        if (showAlert) {

            const timer = setTimeout(() => setShowAlert(false), 5000);
            return () => clearTimeout(timer);

        }

    }, [showAlert]);

    return (
        
        <Box sx={{ mt: 4, maxWidth: 800, mx: 'auto' }}>

                {showAlert && (
                    <Alert severity={serverResponseCode === 200 ? 'success' : 'error'}>
                        {serverResponseMessage}
                    </Alert>
                )}

            <Typography variant="h5" component="h2" gutterBottom>
                Verify Account
            </Typography>

            <Button variant='contained' color='error' sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: 200 }} onClick={handleClick}>Verify Account</Button>

        </Box>

    );

}