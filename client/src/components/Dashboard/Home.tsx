import { Box } from '@mui/material';
import HomePageComponent from './HomePageComponet';

interface HomeProps {
    userInfo: any
};

export default function Home({userInfo}: HomeProps) {

    return (
        
        <Box sx={{ mt: 4, '& > *': { mb: 3 }, maxWidth: 800, mx: 'auto' }}>

           <HomePageComponent />
        </Box>
        

    );

}