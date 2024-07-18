import { useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import DashboardAppBar from '../../components/Dashboard/DashboardAppBar';
import DashboardDrawer from '../../components/Dashboard/DashboardDrawer';

/* Interfaces */
export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export interface DashboardAppBarProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedTab: number;
    setSelectedTab: (selectedTab: number) => void;
}

export interface DashboardDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
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

    {/* Dashboard JSX */}
    return (
        <Box sx={{ display: 'flex' }}>

            <DashboardAppBar open={open} setOpen={setOpen} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <DashboardDrawer open={open} setOpen={setOpen} />

        </Box>
    );
}