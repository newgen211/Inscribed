import { Box, Button, Typography } from '@mui/material';
import { useAuth } from '../../../../hooks/useAuth';


export default function Logout() {

    {/* Get the authState */}
    const { logout } = useAuth();

    {/* Handle logout */}
    const handleClick = () => {

        // Remove the session token from localstorage
        localStorage.removeItem('token');

        // Remove the users tab storage
        localStorage.removeItem('tab');

        // Update the global auth state
        logout();

    };

    return (

        <Box>

            {/* Title */}
            <Typography variant="h5" component="h2" gutterBottom>Logout</Typography>

            {/* Send Verification Email Button */}
            <Button variant='contained' color='error' sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: 200 }} onClick={handleClick}>Delete Account</Button>

        </Box>

    );

}