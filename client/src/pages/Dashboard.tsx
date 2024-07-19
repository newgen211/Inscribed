import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { APIResponse } from '../types/APIResponse';
import axios, { Axios, AxiosResponse } from 'axios';
import { Box, Typography } from '@mui/material';

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

  /* Condionally render the current tab using the current tab state */
  const renderCurrentTab = () => {

    switch(currentTab) {

      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      default:

    }

  };

  /* Store selected tab in localStorage to persist across refreshes */
  useEffect(() => {

    localStorage.setItem('tab', currentTab.toString());

  }, [currentTab]);

  /* Function to get user data from api call */
  const fetchUserData = async () => {

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

  };

  /* Update the userInfo everytime the fetchUserData function is ran */
  useEffect(() => {

    fetchUserData();

  }, [fetchUserData]);

  /* Dashboard JSX */
  return (

    <Box>

      { fetchingUserInfo ? (
        
        <>
          <h1>User Info:</h1>
          <p>{userInfo?.first_name}</p>
          <p>{userInfo?.last_name}</p>
          <p>{userInfo?.username}</p>
          <p>{userInfo?.email}</p>
          <p>{userInfo?.bio}</p>
          <p>{userInfo?.following_count}</p>
          <p>{userInfo?.follower_count}</p>
        </>

      ) : (

        <h1>Fetching</h1>

      ) }

    </Box>

  );

}






































// import { useCallback, useEffect, useState } from 'react';
// import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
// import DashboardAppBar from '../components/Dashboard/DashboardAppBar';
// import DashboardDrawer from '../components/Dashboard/DashboardDrawer';
// import FixedThemeToggleButton from '../components/utils/FixedThemeToggleButton';
// import Home from '../components/Dashboard/Home';
// import Search from '../components/Dashboard/Search';
// import FollowingFeed from '../components/Dashboard/FollowingFeed';
// import ForYouFeed from '../components/Dashboard/ForYouFeed';
// import Settings from '../components/Dashboard/Settings';
// import axios from 'axios';
// import { APIResponse } from '../types/APIResponse';
// import { CircularProgress } from '@mui/material';
// import { useAuth } from '../hooks/useAuth';

// /* Interfaces */
// export interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// export interface DashboardAppBarProps {
//     open: boolean;
//     setOpen: (open: boolean) => void;
// }

// export interface DashboardDrawerProps {
//     open: boolean;
//     setOpen: (open: boolean) => void;
//     selectedTab: number;
//     setSelectedTab: (selectedTab: number) => void;
//     userInfo: any;
//     fetchUserInfo: () => void;
// }

// /* Define Constants */

// export const drawerWidth = 240;

// /* Mixins */

// export const openedMixin = (theme: Theme): CSSObject => ({

//     width: drawerWidth,
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     overflowX: 'hidden',

// });
  
// export const closedMixin = (theme: Theme): CSSObject => ({

//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     overflowX: 'hidden',
//     width: `calc(${theme.spacing(7)} + 1px)`,
//     [theme.breakpoints.up('sm')]: {
//       width: `calc(${theme.spacing(8)} + 1px)`,
//     },

// });

// /* Custom Components */

// export const DrawerHeader = styled('div')(({ theme }) => ({

//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: theme.spacing(0, 1),
//     ...theme.mixins.toolbar

// }));

// export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    
//     ({ theme, open }) => ({

//       width: drawerWidth,
//       flexShrink: 0,
//       whiteSpace: 'nowrap',
//       boxSizing: 'border-box',

//       ...(open && {
//         ...openedMixin(theme),
//         '& .MuiDrawer-paper': openedMixin(theme),
//       }),

//       ...(!open && {
//         ...closedMixin(theme),
//         '& .MuiDrawer-paper': closedMixin(theme),

//       }),
//     })

// );

// export const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open', })<AppBarProps>(({ theme, open }) => ({
    
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),

//     ...(open && {

//       marginLeft: drawerWidth,
//       width: `calc(100% - ${drawerWidth}px)`,

//       transition: theme.transitions.create(['width', 'margin'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//       }),

//     }),

// }));

// /* Dashboard Component */

// export default function MiniDrawer() {

//     {/* Define State */}
//     const [open, setOpen] = useState<boolean>(false);                 // Drawer open state
//     const [selectedTab, setSelectedTab] = useState<number>(0);        // Selected tab state
//     const [userInfo, setUserInfo] = useState<any>(null);              // Stores the user info

//     {/* Get the logout from authState */}
//     const { logout } = useAuth();

//     {/* Determine what component to show */}
//     const renderContent = () => {

//       switch(selectedTab) {

//         case 0:
//             return <Home userInfo={userInfo} fetchUserInfo={fetchUserInfo} />;
//         case 1:
//             return <Search />;
//         case 2:
//             return <FollowingFeed />;
//         case 3:
//             return <ForYouFeed />;
//         case 4:
//             return <Settings userInfo={userInfo} />;
//         default:
//             return <Home userInfo={userInfo} fetchUserInfo={fetchUserInfo} />;

//       }

//     };

//     /* Fetch user info function */
//     const fetchUserInfo = useCallback(async () => {
//       try {
//         {/* Retrieve the auth token from local storage */}
//         const token = localStorage.getItem('token');

//         if (!token) {
//           logout();
//         }

//         {/* Make API call to get user info */}
//         const response: APIResponse = await axios.get('/api/user/get-user-info', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         {/* Store the user info */}
//         setUserInfo(response.data.data);

//       } catch (error) {
//         console.log(`Error fetching user data: ${error}`);
//         logout();
//       }
//     }, [logout]);

//     {/* Get the user info on page load */}
//     useEffect(() => {

//       fetchUserInfo();

//     }, [fetchUserInfo]);

//     {/* Dashboard JSX */}
//     return (

//         <Box sx={{ display: 'flex' }}>
            
//             <DashboardAppBar open={open} setOpen={setOpen}  />
//             <DashboardDrawer open={open} setOpen={setOpen} selectedTab={selectedTab} setSelectedTab={setSelectedTab} userInfo={userInfo} fetchUserInfo={fetchUserInfo} />

//             <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//               <DrawerHeader />
//               {renderContent()}
//             </Box>

//             <FixedThemeToggleButton />

//         </Box>
//     );
// }

// /* 



// */