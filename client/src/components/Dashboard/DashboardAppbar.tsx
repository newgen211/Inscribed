import styled from '@emotion/styled';
import { IUserInfo } from '../../pages/Dashboard';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { drawerWidth } from './DashboardDrawer';
import { Theme } from '@mui/material/styles';
import { Box, IconButton, Toolbar } from '@mui/material';
import { Menu, Air } from '@mui/icons-material';

/* Define Types and interfaces */
interface IDashboardAppbarProps {
    drawerOpen       : boolean;
    setDrawerOpen    : (drawerOpen: boolean) => void;
    currentTab       : number;
    setCurrentTab    : (currentTab: number) => void;
    handleTabClick   : (tab_number: number) => void;
    fetchingUserInfo : boolean;
    userInfo         : IUserInfo;
    fetchUserData    : () => void;
};

export interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}


/* Custom appbar component */
export const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })<AppBarProps>(({ theme, open }) => ({
    
    zIndex: (theme as Theme).zIndex.drawer + 1,
    
    transition: (theme as Theme).transitions.create(['width', 'margin'], {

        easing: (theme as Theme).transitions.easing.sharp,
        duration: (theme as Theme).transitions.duration.leavingScreen,

    }),
  
    ...(open && {

        marginLeft: drawerWidth,

        width: `calc(100% - ${drawerWidth}px)`,

        transition: (theme as Theme).transitions.create(['width', 'margin'], {

            easing: (theme as Theme).transitions.easing.sharp,
            duration: (theme as Theme).transitions.duration.enteringScreen,

        }),

    }),
    
  }));

export default function DashboardAppbar(props: IDashboardAppbarProps) {

    return (

        <AppBar position='fixed' open={props.drawerOpen}>

            <Toolbar>
                
                {/* Open Drawer Button */}
                <IconButton color='inherit' onClick={() => props.setDrawerOpen(true)} edge="start" sx={{ marginRight: 5, ...(props.drawerOpen && { display: 'none' }) }}><Menu /></IconButton>

                {/* App Icon Logo */}
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                    <Air fontSize='large' />
                </Box>

            </Toolbar>

        </AppBar>

    );

}