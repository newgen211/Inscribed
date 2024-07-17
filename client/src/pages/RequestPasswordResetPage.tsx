import { Avatar, Box, Container, Typography } from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import RequestPasswordResetForm from '../components/RequestPasswordResetForm';

export default function RequestPasswordResetPage() {

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
                    Forgot Your Password?
                </Typography>

                <Typography component="p" sx={{mt: 1}}>
                    No worries, request a password reset email
                </Typography>

                {/* Request Password Reset Form */}
                <RequestPasswordResetForm />


            </Box>

        </Container>

    );

}