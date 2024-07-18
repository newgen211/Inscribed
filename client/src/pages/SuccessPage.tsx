import { CheckCircleOutline } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FixedThemeToggleButton from '../components/utils/FixedThemeToggleButton';

interface SuccessPageProps {
    title: string;
    message: string;
    redirectLink: string;
    linkTitle: string;
}

export default function SuccessPage({ title, message, redirectLink, linkTitle }: SuccessPageProps) {

    {/* Page Navigator */}
    const navigate = useNavigate();

    {/* Function to handle redirect */}
    const handleRedirect = () => {
        navigate(redirectLink);
    };

    return (

        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            textAlign="center"
        >
            {/* Success Icon */}
            <CheckCircleOutline color="success" style={{ fontSize: 80, marginBottom: 20 }} />

            {/* Title Message */}
            <Typography variant="h4" gutterBottom>
                {title}
            </Typography>

            {/* Success message */}
            <Typography variant="body1" gutterBottom>
                {message}
            </Typography>

            {/* Redirect button */}
            <Button variant="contained" color="primary" onClick={handleRedirect} sx={{mt: 4}}>
                {linkTitle}
            </Button>

            {/* Theme Toggle button */}
            <FixedThemeToggleButton />

        </Box>

    );

}