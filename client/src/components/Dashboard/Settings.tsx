import { Box, Typography } from '@mui/material';
import UpdateNameForm from '../Forms/UpdateNameForm';
import UpdateUsername from '../Forms/UpdateUsername';

interface SettingsProps {
    userInfo: any
};

export default function Settings({userInfo}: SettingsProps) {

    return (

        <Box>

            <Typography variant='h4' component='h1'>{userInfo.first_name}'s Profile Settings</Typography>

            {/* Update Name Form */}
            <Typography variant='h5' component='h2' sx={{mt: 4}}>Update Name</Typography>
            <UpdateNameForm />

            {/* Update Username Form */}
            <Typography variant='h5' component='h2' sx={{mt: 4}}>Update Username</Typography>
            <UpdateUsername />

        </Box>

    );

}