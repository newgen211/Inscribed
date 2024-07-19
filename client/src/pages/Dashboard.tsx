import { useEffect, useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import DashboardAppBar from '../components/Dashboard/DashboardAppBar';
import DashboardDrawer from '../components/Dashboard/DashboardDrawer';
import FixedThemeToggleButton from '../components/utils/FixedThemeToggleButton';
import Home from '../components/Dashboard/Home';
import Search from '../components/Dashboard/Search';
import FollowingFeed from '../components/Dashboard/FollowingFeed';
import ForYouFeed from '../components/Dashboard/ForYouFeed';
import Settings from '../components/Dashboard/Settings';
import axios from 'axios';
import { APIResponse } from '../types/APIResponse';
import { CircularProgress } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

/* Interfaces */
export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export interface DashboardAppBarProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export interface DashboardDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedTab: number;
    setSelectedTab: (selectedTab: number) => void;
    userInfo: any;
}

/* Define Constants */

export const drawerWidth = 240;

/* Mixins */

export const openedMixin = (theme: Theme): CSSObject => ({

    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',

});
  
export const closedMixin = (theme: Theme): CSSObject => ({

    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },

});

/* Custom Components */

export const DrawerHeader = styled('div')(({ theme }) => ({

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar

}));

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    
    ({ theme, open }) => ({

      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',

      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),

      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),

      }),
    })

);

export const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open', })<AppBarProps>(({ theme, open }) => ({
    
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

    ...(open && {

      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,

      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),

    }),

}));

/* Dashboard Component */

export default function MiniDrawer() {

    {/* Define State */}
    const [open, setOpen] = useState<boolean>(false);                 // Drawer open state
    const [selectedTab, setSelectedTab] = useState<number>(0);        // Selected tab state
    const [userInfo, setUserInfo] = useState<any>(null);              // Stores the user info

    {/* Get the logout from authState */}
    const { logout } = useAuth();

    {/* Determine what component to show */}
    const renderContent = () => {

      switch(selectedTab) {

        case 0:
            return <Home />;
        case 1:
            return <Search />;
        case 2:
            return <FollowingFeed />;
        case 3:
            return <ForYouFeed />;
        case 4:
            return <Settings userInfo={userInfo} />;
        default:
            return <Home />;

      }

    };

    {/* Get the user info on page load */}
    useEffect(() => {

      const getUserInfo = async () => {

        try {

          {/* Retrieve the auth token from local storage */}
          const token = localStorage.getItem('token');

          if(!token) {
            logout();
          }

          {/* Make API call to get user info */}
          const response: APIResponse = await axios.get('/api/user/get-user-info', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          {/* Store the user info */}
          setUserInfo(response.data.data);

        }
        
        catch(error) {

          console.log(`Error fetching user data: ${error}`);

          logout();

        }

      };

      getUserInfo();

    }, []);

    {/* Dashboard JSX */}
    return (

        <Box sx={{ display: 'flex' }}>
            
            <DashboardAppBar open={open} setOpen={setOpen}  />
            <DashboardDrawer open={open} setOpen={setOpen} selectedTab={selectedTab} setSelectedTab={setSelectedTab} userInfo={userInfo} />

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <DrawerHeader />
              {renderContent()}
            </Box>

            <FixedThemeToggleButton />

        </Box>
    );
}

/* 



*/