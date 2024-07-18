import { Avatar, Box, Container, Typography } from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import ResetPasswordForm from '../components/Forms/ResetPasswordForm';


export default function ResetPasswordPage() {

    {/* Page navigator */}
    const navigate = useNavigate();

    {/* Get the token search parameter */}
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    {/* If the token parameter is missing redirect to login page */}
    useEffect(() => {

        if(!token) {
            navigate('/');
        }

    },[token, navigate]);

    return (

        <Container component="main" maxWidth="xs">

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                {/* Icon and Page Title and message */}
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <AirIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Reset Your Passord
                </Typography>

                <Typography component="p" sx={{mt: 1}}>
                    Enter a new password for your account
                </Typography>

                {/* Reset Password Form */}
                <ResetPasswordForm />
                
            </Box>

        </Container>

    );

}