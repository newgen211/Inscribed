import { Avatar, Box, Container, Typography } from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import LoginForm from '../components/Forms/LoginForm';

export default function LandingPage() {

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
                    Sign in
                </Typography>

                {/* Login Form */}
                <LoginForm />


            </Box>

        </Container>
        

    );

}