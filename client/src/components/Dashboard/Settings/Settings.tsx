import { Box, Typography } from '@mui/material';
import Dashboard, { IUserInfo } from '../../../pages/Dashboard';
import UpdateNameForm from './forms/UpdateName/UpdateNameForm';
import UpdateUsernameForm from './forms/UpdateUsername/UpdateUsernameForm';
import UpdatePasswordForm from './forms/UpdatePassword/UpdatePasswordForm';
import VerifyAccount from './buttons/VerifyAccount';
import DeleteAccount from './buttons/DeleteAccount';
import Logout from './buttons/Logout';

/* Define types and interfaces */
interface ISettingsProps {
    userInfo         : IUserInfo;
    fetchUserData    : () => void;
};

export default function Settings(props: ISettingsProps) {

    return (

        <Box sx={{ mt: 4, '& > *': { mb: 3 }, maxWidth: 800, mx: 'auto' }}>

            {/* Settings Title Page */}
            <Typography variant='h4' component='h1'>{props.userInfo.first_name}'s Profile Settings</Typography>

            {/* Update Name Form */}
            <UpdateNameForm />

            {/* Update Username Form */}
            <UpdateUsernameForm />

            {/* Update Password Form */}
            <UpdatePasswordForm />

            {/* Verify Your Account */}
            {!props.userInfo.verified && <VerifyAccount userInfo={props.userInfo} fetchUserData={props.fetchUserData} />}

            {/* Delete User Account */}
            <DeleteAccount />

            {/* Logout */}
            <Logout />

        </Box>

    );

}