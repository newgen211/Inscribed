import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UnpublishedIcon from '@mui/icons-material/Unpublished';


export default function UnsuccessfulAccountVerifyPage() {

    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/');
    };

    return (

        <Container component="main" maxWidth="xs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <UnpublishedIcon style={{ fontSize: 150, color: 'red' }} />
                <Typography component="h1" variant="h5" style={{ marginTop: '20px' }}>
                    Account Unable To Verified
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRedirect}
                    style={{ marginTop: '30px' }}
                >
                    Request a new Verify Link
                </Button>
            </Box>
        </Container>

    );

}