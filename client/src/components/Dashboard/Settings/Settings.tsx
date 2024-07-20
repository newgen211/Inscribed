import { Alert, Box, Typography } from '@mui/material';
import { IDashboardState, IUserInfo } from '../../../pages/Dashboard';
import UpdateNameForm from './forms/UpdateName/UpdateNameForm';
import { useEffect, useState } from 'react';
import UpdateUsernameForm from './forms/UpdateUsername/UpdateUsernameForm';
import UpdatePasswordForm from './forms/UpdatePassword/UpdatePasswordForm';

/* Define Types and Interfaces */
export interface ISettingsProps {
    drawerOpen: boolean;
    setDrawerOpen: (drawerOpen: boolean) => void;
    newPostModalOpen: boolean;
    setNewPostModalOpen: (newPostModalOpen: boolean) => void;
    fetchingUserData: boolean;
    setFetchingUserData: (fetchingUserData: boolean) => void;
    userData: IUserInfo;
    setUserData: (userData: IUserInfo) => void;
    currentTab: number;
    setCurrentTab: (currentTab: number) => void;
    fetchUserData: () => void;
    serverResponseMessage: string;
    setServerResponseMessage: (serverResponseMessage: string) => void;
    serverResponseCode: number;
    setServerResponseCode: (serverResponseCode: number) => void;
    showAlert: boolean;
    setShowAlert: (showAlert: boolean) => void;
  }

const Settings: React.FC<IDashboardState> = (props) => {

    /* Define local settings state */
    const [serverResponseMessage, setServerResponseMessage] = useState<string>('');                           // Stores the response message from api
    const [serverResponseCode, setServerResponseCode]       = useState<number>(0);                            // Stores the response code from the response
    const [showAlert, setShowAlert]                         = useState<boolean>(false);                       // State that holds if we are showing server response

    /* Auto dismiss the server alert after 5 seconds */
    useEffect(() => {

        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 5000);
            return () => clearTimeout(timer);
        }

    }, [showAlert]);

    return (

        <Box sx={{ mt: 4, '& > *': { mb: 3 }, maxWidth: 800, mx: 'auto' }}>

           {/* Title Page */}
           <Typography variant='h4' component='h1'>{props.userData.first_name}'s Profile Settings</Typography>

           {/* Server Response Message */}
           <Box sx={{ mb: 2 }}>
                { showAlert && <Alert severity={serverResponseCode === 200 ? 'success' : 'error'}>{serverResponseMessage}</Alert> }
            </Box>

           {/* Update Name Form */}
           <UpdateNameForm drawerOpen={props.drawerOpen} setDrawerOpen={props.setDrawerOpen} newPostModalOpen={props.newPostModalOpen} setNewPostModalOpen={props.setNewPostModalOpen} fetchingUserData={props.fetchingUserData} setFetchingUserData={props.setFetchingUserData} userData={props.userData} setUserData={props.setUserData} currentTab={props.currentTab} setCurrentTab={props.setCurrentTab} fetchUserData={props.fetchUserData} serverResponseMessage={serverResponseMessage} setServerResponseMessage={setServerResponseMessage} serverResponseCode={serverResponseCode} setServerResponseCode={setServerResponseCode} showAlert={showAlert} setShowAlert={setShowAlert} />

           {/* Update Username form */}
           <UpdateUsernameForm drawerOpen={props.drawerOpen} setDrawerOpen={props.setDrawerOpen} newPostModalOpen={props.newPostModalOpen} setNewPostModalOpen={props.setNewPostModalOpen} fetchingUserData={props.fetchingUserData} setFetchingUserData={props.setFetchingUserData} userData={props.userData} setUserData={props.setUserData} currentTab={props.currentTab} setCurrentTab={props.setCurrentTab} fetchUserData={props.fetchUserData} serverResponseMessage={serverResponseMessage} setServerResponseMessage={setServerResponseMessage} serverResponseCode={serverResponseCode} setServerResponseCode={setServerResponseCode} showAlert={showAlert} setShowAlert={setShowAlert} />

            {/* Update Password Form */}
            <UpdatePasswordForm drawerOpen={props.drawerOpen} setDrawerOpen={props.setDrawerOpen} newPostModalOpen={props.newPostModalOpen} setNewPostModalOpen={props.setNewPostModalOpen} fetchingUserData={props.fetchingUserData} setFetchingUserData={props.setFetchingUserData} userData={props.userData} setUserData={props.setUserData} currentTab={props.currentTab} setCurrentTab={props.setCurrentTab} fetchUserData={props.fetchUserData} serverResponseMessage={serverResponseMessage} setServerResponseMessage={setServerResponseMessage} serverResponseCode={serverResponseCode} setServerResponseCode={setServerResponseCode} showAlert={showAlert} setShowAlert={setShowAlert} />

        </Box>

    );

}

export default Settings;