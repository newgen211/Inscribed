import { Box, Button, Typography } from '@mui/material';
import UpdateNameForm from '../Forms/UpdateNameForm';
import UpdateUsername from '../Forms/UpdateUsernameForm';
import UpdatePasswordForm from '../Forms/UpdatePasswordForm';
import Logout from './Logout';
import VerifyAccount from './VerifyAccount';
import DeleteAccount from './DeleteAccount';

interface SettingsProps {
    userInfo: any
};

export default function Settings({userInfo}: SettingsProps) {

    return (

        <Box sx={{ mt: 4, '& > *': { mb: 3 }, maxWidth: 800, mx: 'auto' }}>

            <Typography variant='h4' component='h1'>{userInfo.first_name}'s Profile Settings</Typography>

            {/* Update Name Form */}
            <UpdateNameForm />

            {/* Update Username Form */}
            <UpdateUsername />

            {/* Update Password Form */}
            <UpdatePasswordForm />

            {/* Logout */}
            <Logout />

            {/* Verify Account */}
            {!userInfo.verified && <VerifyAccount email={userInfo.email} />}

            {/* Delete Account */}
            <DeleteAccount />

        </Box>

    );

}