/*  
    Based off the Drawer found in the docs: https://mui.com/material-ui/react-drawer/  -- (Mini variant drawer)
*/

import React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

{/* Icons */}
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateIcon from '@mui/icons-material/Create';
import AirIcon from '@mui/icons-material/Air';
import LogoutIcon from '@mui/icons-material/Logout';


{/* Constants */}
const drawerWidth = 240;                                 // Width of the drawer when fully open

{/* CSS Styles for drawer when it is open */}
const openedMixin = (theme: Theme): CSSObject => ({

    width: drawerWidth,

    transition: theme.transitions.create('width', {

        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,

    }),

    overflowX: 'hidden',

});

{/* CSS Styles for drawer when it is closed */}
const closedMixin = (theme: Theme): CSSObject => ({

    transition: theme.transitions.create('width', {

        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,

    }),

    width: `calc(${theme.spacing(7)} + 1px)`,

    [theme.breakpoints.up('sm')]: {

        width: `calc(${theme.spacing(8)} + 1px)`,

    },

    overflowX: 'hidden',

});

{/* Styled Component for the drawer header */}
const DrawerHeader = styled('div')(({ theme }) => ({

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,

}));

{/* Styled component for the drawer */}
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(

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

    }),

);

export default function Sidebar() {

    {/* Define State */}
    const [open, setOpen] = React.useState(false);

    {/* Function to open/close sidebar */}
    const handleDrawerOpenClose = () => setOpen(!open);

    {/* Sidebar JSX */}
    return (

        <Box sx={{ display: 'flex' }}>

        <Drawer variant="permanent" open={open}>

            {/* Drawer Header -- Open/Close Button */}
            <DrawerHeader>
                <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                    
                    <ListItemButton
                    sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
                    onClick={handleDrawerOpenClose}
                    >

                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                        <AirIcon color="primary" />
                    </ListItemIcon>
                    
                    <ListItemText
                        primary="Inscribed"
                        sx={{
                        opacity: open ? 1 : 0,
                        fontWeight: 'bold',
                        color: 'primary.main.contrastText',
                        }}
                    />

                    </ListItemButton>

                </ListItem>

            </DrawerHeader>

            {/* Divider Bewtween open/close and main section */}
            <Divider />

            {/* Main section */}
            <List>
                
                {/* Home Item */}
                <ListItem disablePadding sx={{display: 'block'}}>

                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'inital' : 'center', px: 2.5 }}>
                        
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                            <HomeIcon />
                        </ListItemIcon>

                        <ListItemText primary='Home' sx={{ opacity: open ? 1 : 0 }}></ListItemText>

                    </ListItemButton>

                </ListItem>

                {/* Search Item */}
                <ListItem disablePadding sx={{display: 'block'}}>

                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'inital' : 'center', px: 2.5 }}>
                        
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                            <SearchIcon />
                        </ListItemIcon>

                        <ListItemText primary='Search' sx={{ opacity: open ? 1 : 0 }}></ListItemText>

                    </ListItemButton>

                </ListItem>
                
                {/* Profile Item */}
                <ListItem disablePadding sx={{display: 'block'}}>

                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'inital' : 'center', px: 2.5 }}>
                        
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                            <PersonIcon />
                        </ListItemIcon>

                        <ListItemText primary='Profile' sx={{ opacity: open ? 1 : 0 }}></ListItemText>

                    </ListItemButton>

                </ListItem>
                
                {/* Settings Item */}
                <ListItem disablePadding sx={{display: 'block'}}>

                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'inital' : 'center', px: 2.5 }}>
                        
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                            <SettingsIcon />
                        </ListItemIcon>

                        <ListItemText primary='Settings' sx={{ opacity: open ? 1 : 0 }}></ListItemText>

                    </ListItemButton>

                </ListItem>
                
                {/* Divder */}
                <Divider />

                {/* New Post Item */}
                <ListItem disablePadding sx={{display: 'block'}}>

                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'inital' : 'center', px: 2.5 }}>
                        
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                            <CreateIcon />
                        </ListItemIcon>

                        <ListItemText primary='Create Post' sx={{ opacity: open ? 1 : 0 }}></ListItemText>

                    </ListItemButton>

                </ListItem>

            </List>

            {/* Push the logout button to the bottom */}
            <Box sx={{ flexGrow: 1 }} />
            <Divider />

            {/* Logout button */}
            <List>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                        <LogoutIcon color='secondary' />
                    </ListItemIcon>
                    <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0, color: 'secondary.main.contrastText' }} />
                    </ListItemButton>
                </ListItem>
            </List>

        </Drawer>

        </Box>

    );
}
