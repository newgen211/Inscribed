import { Box, Typography } from '@mui/material';
import { IUserInfo } from '../../../pages/Dashboard';
import UserProfile from './cards/UserProfile';
import UserPostList from './UserPostList';

/* Define types and interfaces */
interface IHomeProps {
    userInfo         : IUserInfo;
    fetchUserData    : () => void;
    getInitals       : (first_name: string, last_name: string) => string;
};

export default function Home(props: IHomeProps) {

    return (

        <Box sx={{ mt: 4, '& > *': { mb: 3 }, maxWidth: 800, mx: 'auto' }}>
        
            <UserProfile userInfo={props.userInfo} getInitals={props.getInitals} fetchUserData={props.fetchUserData} />

            <UserPostList />

        </Box>

    );

}