import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { CheckCircleOutline, Cancel } from '@mui/icons-material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function VerifyAccountPage() {
    /* Define state */
    const [verified, setVerified] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    /* Get the token from the URL */
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    /* Attempt to verify account on page load */
    useEffect(() => {

        const source = axios.CancelToken.source();

        const handleAccountVerification = async () => {
            
            try {

                // Attempt to verify account with a 10-second timeout
                const timeout = setTimeout(() => {

                    source.cancel('Verification request timed out');

                }, 10000);

                await axios.post(`/api/auth/verify-account?token=${token}`, {}, { cancelToken: source.token });

                clearTimeout(timeout);

                // Set the verified status to true
                setVerified(true);

            } 
            
            catch (error) {

                if (axios.isCancel(error)) {

                    setError('Verification request timed out');

                } 

                else if( axios.isAxiosError(error) && error.response ) {

                    setError(error.response.data.message);

                }
                
                else {

                    setError('Failed to verify account. Please try again.');

                }

                setVerified(false);

            } 
            
            finally {

                setIsLoading(false);

            }
        };

        handleAccountVerification();

        return () => {
            source.cancel('Component unmounted');
        };
    }, []);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            textAlign="center"
        >
            {isLoading ? (
                <Verifying />
            ) : verified ? (
                <AccountVerified />
            ) : (
                <VerifyError error={error} />
            )}
        </Box>
    );
}

function AccountVerified() {
    return (
        <>
            {/* Success Icon */}
            <CheckCircleOutline color="success" style={{ fontSize: 80, marginBottom: 20 }} />

            {/* Title Message */}
            <Typography variant="h4" gutterBottom>
                Account Verified
            </Typography>
        </>
    );
}

function Verifying() {
    return (
        <>
            <CircularProgress />

            {/* Title Message */}
            <Typography variant="h4" gutterBottom>
                Verifying Account
            </Typography>
        </>
    );
}

function VerifyError({ error }: { error: string }) {
    return (
        <>
            {/* Error Icon */}
            <Cancel color="error" style={{ fontSize: 80, marginBottom: 20 }} />

            {/* Error Message */}
            <Typography variant="h4" gutterBottom>
                {error}
            </Typography>
        </>
    );
}
