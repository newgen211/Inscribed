import { Box, Typography } from '@mui/material';
import { IUserInfo } from '../../../pages/Dashboard';

/* Define types and interfaces */
interface IHomeProps {
    userInfo         : IUserInfo;
    fetchUserData    : () => void;
};

export default function Home(props: IHomeProps) {

    return (

        <Box sx={{ mt: 4, '& > *': { mb: 3 }, maxWidth: 800, mx: 'auto' }}>
        
            {/* Title */}
            <Typography variant='h4' component='h1'>Home</Typography>

        </Box>

    );

}