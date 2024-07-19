import { Box, Typography } from '@mui/material';
import UpdateNameForm from '../Forms/UpdateNameForm';
import UpdateUsername from '../Forms/UpdateUsernameForm';
import UpdatePasswordForm from '../Forms/UpdatePasswordForm';

interface SettingsProps {
    userInfo: any
};

export default function Settings({userInfo}: SettingsProps) {

    return (

        <Box>

            <Typography variant='h4' component='h1'>{userInfo.first_name}'s Profile Settings</Typography>

            {/* Update Name Form */}
            <UpdateNameForm />

            {/* Update Username Form */}
            <UpdateUsername />

            {/* Update Password Form */}
            <UpdatePasswordForm />

        </Box>

    );

}