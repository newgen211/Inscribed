import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export default function SuccessfulAccountVerifyPage() {

    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/');
    };

    return (

        <Container component="main" maxWidth="xs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <CheckCircleIcon style={{ fontSize: 150, color: 'green' }} />
                <Typography component="h1" variant="h5" style={{ marginTop: '20px' }}>
                    Account Verified
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRedirect}
                    style={{ marginTop: '30px' }}
                >
                    Go to Login
                </Button>
            </Box>
        </Container>

    );

}