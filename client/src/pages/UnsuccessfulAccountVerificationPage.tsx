import { Box, Button, Container, Typography } from '@mui/material';
import RequestVerifyForm from '../components/RequestVerifyForm/RequestVerifyForm';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';


export default function UnsuccessfulAccountVerifyPage() {

    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/');
    };

    return (

        <>
        
            <Container component="main" maxWidth="xs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <CancelIcon style={{ fontSize: 150, color: 'red' }} />
                    <Typography component="h1" variant="h5" style={{ marginTop: '20px' }}>
                        Failed to Verify Account
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRedirect}
                        style={{ marginTop: '30px' }}
                    >
                        Go to Login
                    </Button>

                    <RequestVerifyForm />

                </Box>

                

            </Container>

        </>

    );

}