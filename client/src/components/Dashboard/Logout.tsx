import { Box, Button, Typography } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';


export default function Logout() {

    {/* Get the authState */}
    const { logout } = useAuth();

    {/* Handle logout */}
    const handleLogout = () => {

        // Remove the token from localstorage
        localStorage.removeItem('token');

        // call auth logout
        logout();

    };

    return (

        <Box>

            <Typography variant="h5" component="h2" gutterBottom>
                Logout
            </Typography>

            <Button variant='contained' color='error' sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: 200 }} onClick={handleLogout}>Logout</Button>

        </Box>

    );

}