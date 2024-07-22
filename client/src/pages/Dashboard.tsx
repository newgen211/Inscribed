import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios, { AxiosResponse } from 'axios';
import { APIResponse } from '../types/APIResponse';
import { Box, CircularProgress, useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import DashboardAppbar from '../components/Dashboard/DashboardAppbar';
import DashboardDrawer, { DrawerHeader } from '../components/Dashboard/DashboardDrawer';
import MobileTopAppbar from '../components/Dashboard/MobileTopAppbar';
import BottomNavigationBar from '../components/Dashboard/BottomNavigationBar';
import Settings from '../components/Dashboard/Settings/Settings';
import Home from '../components/Dashboard/Home';


/* Define Types and Interfaces  */

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

export interface IDashboardState {
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
  fetchUserData : () => void;
}


export default function Dashboard() {


  /* Define All Dashboard State */

  const [drawerOpen, setDrawerOpen]                       = useState<boolean>(false);                       // Tracks if the drawer is open or closed
  
  const [newPostModalOpen, setNewPostModalOpen]           = useState<boolean>(false);                       // Keeps track if the new post modal is open

  const [fetchingUserData, setFetchingUserData]           = useState<boolean>(false);                       // State to keep track of wheather we are currently fetching user data
  const [userData, setUserData]                           = useState<IUserInfo>();                          // State to hold the user's profile infomation

  const [serverResponseMessage, setServerResponseMessage] = useState<string>('');                           // Stores the response message from api
  const [serverResponseCode, setServerResponseCode]       = useState<number>(0);                            // Stores the response code from the response
  const [showAlert, setShowAlert]                         = useState<boolean>(false);                       // State that holds if we are showing server response

  const [currentTab, setCurrentTab]                       = useState<number>(() => {
    const storedTab = localStorage.getItem('tab');
    return storedTab ? Number(storedTab) : 0;
  });

  /* Media Query for small screen */
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  /* Global Auth State */

    const { logout } = useAuth();



  /* Function to change the current tab and store the tab selection in localstorage for persistance */

  const handleTabClick = (tab_number: number) => setCurrentTab(tab_number);

  useEffect(() => localStorage.setItem('tab', currentTab.toString()) , [currentTab]);

  /* Function to get the user's intial's */
  
  const getInitals = (first_name: string, last_name: string): string => {
    return `${first_name.charAt(0)}${last_name.charAt(0)}`;
  };

  /* Function to fetch user data */
  const fetchUserData = useCallback( async () => {

    try {

      // Set fetching user data state to true
      setFetchingUserData(true);

      // Get the session token from localstorage
      const token: string | null = localStorage.getItem('token');

      // If there is no token preset, set the global auth state to be logged out
      if(!token) {
        logout();
        setFetchingUserData(false);
      }

      // Attempt to fetch the user's data
      const response: AxiosResponse<APIResponse> = await axios.get('https://inscribed-22337aee4c1b.herokuapp.com/api/user/get-user-info', { headers: { Authorization: `Bearer ${token}` } });

      // Store the user's infomation
      setUserData(response.data.data);

    }

    catch(error) {

      if(axios.isAxiosError(error) && error.response) {

        console.log(`Error while fetching user data: ${error}`);

        setServerResponseMessage(error.response.data.message);
        setServerResponseCode(error.response.data.code); 

      }

      // Handle a general error
      else {

        console.log('Something went wrong');

        setServerResponseMessage('An unexpected error occured');
        setServerResponseCode(500); 

      }

    }

    finally {

      // Reset the fetching user state back to false when request complete
      setFetchingUserData(false);

      // Set alert state to true to show response
      setShowAlert(true);

    }

  },[logout]);

  /* Update the userInfo state evertime the fetchUserData function is ran */
  useEffect(() => { fetchUserData(); }, [fetchUserData]);

  /* Auto dismiss the server response alert after 5 seconds */
  useEffect(() => {

    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 5000);
      return () => clearTimeout(timer);
    }

  }, [showAlert]);


  /* Function to determine which page to render */
  
  const renderTab = () => {

    switch(currentTab) {

      case 0:
        return <Home userInfo={userData} />;
      case 1:
      case 2:
      case 3:

      case 4: return userData ? 
        <Settings
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          newPostModalOpen={newPostModalOpen}
          setNewPostModalOpen={setNewPostModalOpen}
          fetchingUserData={fetchingUserData}
          setFetchingUserData={setFetchingUserData}
          userData={userData}
          setUserData={setUserData}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          fetchUserData={fetchUserData}
        /> 
        : null

      default:

    }

  };

  return (

    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {
        userData ? 
        
        <>
        
          {
            !isSmallScreen ? 
            
            <>
              <DashboardAppbar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} currentTab={currentTab} setCurrentTab={setCurrentTab} handleTabClick={handleTabClick} fetchingUserInfo={fetchingUserData} userInfo={userData} fetchUserData={fetchUserData} />
              <DashboardDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} currentTab={currentTab} setCurrentTab={setCurrentTab} handleTabClick={handleTabClick} userInfo={userData} fetchUserData={fetchUserData} fetchingUserInfo={fetchingUserData} getInitals={getInitals} newPostModalOpen={newPostModalOpen} setNewPostModalOpen={setNewPostModalOpen} serverResponseMessage={serverResponseMessage} setServerResponseMessage={setServerResponseMessage} serverResponseCode={serverResponseCode} setServerResponseCode={setServerResponseCode} showAlert={showAlert} setShowAlert={setShowAlert} />
            </> 
            
            : 
            
            <>
              <MobileTopAppbar />
              <BottomNavigationBar currentTab={currentTab} setCurrentTab={setCurrentTab} handleTabClick={handleTabClick} />
            </>
          }

          <Box component="main" sx={{ flexGrow: 1, p: 3, pb: isSmallScreen ? 8 : 0 }}>
              <DrawerHeader />
              {renderTab()}
          </Box>

        </> 
        
        : <CircularProgress color="success" /> 
        
        }

    </Box>

  );

}