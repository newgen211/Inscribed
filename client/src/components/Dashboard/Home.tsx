import { Box } from '@mui/material';
import UserCard from './UserCard';

interface HomeProps {
    userInfo: any
};

export default function Home({userInfo}: HomeProps) {

    return (
        
        <Box sx={{ mt: 4, '& > *': { mb: 3 }, maxWidth: 800, mx: 'auto' }}>

           {/* User Card */}
           <UserCard userInfo={userInfo} />

        </Box>

    );

}