import { Avatar, Box, Container, Typography } from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/Forms/RegisterForm';
import FixedThemeToggleButton from '../components/utils/FixedThemeToggleButton';

export default function RegisterPage() {

    {/* Page navigation */}
    const naviagte = useNavigate();

    {/* Redirect to dasshboard if already logged in */}
    const { isAuthenticated } = useAuth();

    useEffect(() => {

        if(isAuthenticated) {
            naviagte('/dashboard');
        }

    }, [isAuthenticated, naviagte]);

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

                {/* Icon and Page Title */}
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <AirIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>

                {/* Register Form */}
                <RegisterForm />


            </Box>

            {/* Theme Toggle button */}
            <FixedThemeToggleButton />

        </Container>

    );

}