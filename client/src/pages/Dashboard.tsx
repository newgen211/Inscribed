import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios, { AxiosResponse } from 'axios';
import { Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import DashboardDrawer, { DrawerHeader } from '../components/Dashboard/DashboardDrawer';
import DashboardAppbar from '../components/Dashboard/DashboardAppbar';
import Settings from '../components/Dashboard/Settings/Settings';
import Home from '../components/Dashboard/Home/Home';

/* Define Types and Interfaces */
export interface IUserInfo {
  first_name:      string;
  last_name:       string;
  username:        string;
  email:           string;
  bio:             string;
  verified:        boolean;
  following_count: number;
  follower_count:   number;
};

export default function Dashboard() {

  /* Define State Variables */
  const [drawerOpen, setDrawerOpen]              = useState<boolean>(false);                 // Drawer open or closed state
  const [fetchingUserInfo, setFetchingUserInfo]  = useState<boolean>(false);                 // State that is true while fetching user info and false when we have it
  const [userInfo, setUserInfo]                  = useState<IUserInfo>();                    // Stores the user's infomation

  const [currentTab, setCurrentTab]              = useState<number>(() => { 

    const storedTab = localStorage.getItem('tab');
    return storedTab ? Number(storedTab) : 0; 

  }); 

  /* Get the logout function from the global auth state */
  const { logout } = useAuth();

  /* Function to change the current tab */
  const handleTabClick = (tab_number: number) => setCurrentTab(tab_number);

  /* Function to get user's initals */
  const getInitals = (first_name: string, last_name: string): string => {
    return `${first_name.charAt(0)}${last_name.charAt(0)}`;
  };

  /* Condionally render the current tab using the current tab state */
  const renderCurrentTab = () => {

    switch(currentTab) {

      case 0: return userInfo ? <Home userInfo={userInfo} fetchUserData={fetchUserData} getInitals={getInitals} /> : null;
      case 1:
      case 2:
      case 3:
      case 4: return userInfo ? <Settings userInfo={userInfo} fetchUserData={fetchUserData} /> : null;
      default:

    }

  };

  /* Store selected tab in localStorage to persist across refreshes */
  useEffect(() => {

    localStorage.setItem('tab', currentTab.toString());

  }, [currentTab]);

  /* Function to get user data from api call */
  const fetchUserData = useCallback(async () => {

    try {

      // Set fetching user data state to true
      setFetchingUserInfo(true);

      // Get the session token from localstorage
      const token: string | null = localStorage.getItem('token');

      // If there is no token present the user is not logged in so update the global auth state
      if(!token) {
        logout();
        setFetchingUserInfo(false);
      }

      // Attempt to fetch the user's info
      const response: AxiosResponse<any, any> = await axios.get('/api/user/get-user-info', { headers: { Authorization: `Bearer ${token}` } });

      // Store the user info in the userInfo state
      setUserInfo(response.data.data);

    }

    catch(error) {

      if(axios.isAxiosError(error) && error.response) {

        console.log(`Error while fetching user data: ${error}`); 

      }

      // Handle a general error
      else {

        console.log('Something went wrong');

      }

    }

    finally {

      // Reset the fetching user state back to false when request complete
      setFetchingUserInfo(false);

    }

  }, [logout]);

  /* Update the userInfo everytime the fetchUserData function is ran */
  useEffect(() => {

    fetchUserData();
    console.log('User Data Fetched');

  }, [fetchUserData]);

  /* Dashboard JSX */
  return (

    <Box sx={{ display: 'flex' }}>

      {
        userInfo
        ?
        (
          <>
            <DashboardAppbar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} currentTab={currentTab} setCurrentTab={setCurrentTab} handleTabClick={handleTabClick} fetchingUserInfo={fetchingUserInfo} userInfo={userInfo} fetchUserData={fetchUserData} />
            <DashboardDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} currentTab={currentTab} setCurrentTab={setCurrentTab} handleTabClick={handleTabClick} userInfo={userInfo} fetchUserData={fetchUserData} fetchingUserInfo={fetchingUserInfo} getInitals={getInitals} />

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <DrawerHeader />
              {renderCurrentTab()}
            </Box>

          </>
        )
        :
        (<WaitingSpinner />)
      }
      
    </Box>

  );

}

function WaitingSpinner() {

  return (

    <CircularProgress color="success" />

  );

}