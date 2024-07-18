import { useTheme } from '@mui/material/styles';
import { DashboardDrawerProps, Drawer, DrawerHeader } from '../../pages/Dashboard';
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PublicIcon from '@mui/icons-material/Public';

export default function DashboardDrawer({open, setOpen, selectedTab, setSelectedTab}: DashboardDrawerProps) {

    /* Function to close drawer */
    const handleDrawerClose = () => setOpen(false);

    /* Function to handle drawer tab selection */
    const handleListItemClick = (index: number) => {
        setSelectedTab(index);
    }

    /* Get the theme */
    const theme = useTheme();

    return (

        <Drawer variant="permanent" open={open}>

            {/* Drawer Header */}
            <DrawerHeader>

                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>

            </DrawerHeader>

            {/* Divider */}
            <Divider />

            {/* Main section */}
            <List>

                {/* Home */}
                <ListItem disablePadding sx={{display: 'block'}}>

                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'inital': 'center', px: 2.5 }} selected={selectedTab === 0} onClick={() => handleListItemClick(0)}>

                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}><HomeIcon /></ListItemIcon>
                        <ListItemText primary='Home' sx={{ opacity: open ? 1 : 0 }} />

                    </ListItemButton>

                </ListItem>

                {/* Search */}
                <ListItem disablePadding sx={{display: 'block'}}>

                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'inital': 'center', px: 2.5 }} selected={selectedTab === 1} onClick={() => handleListItemClick(1)}>

                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}><SearchIcon /></ListItemIcon>
                        <ListItemText primary='Search' sx={{ opacity: open ? 1 : 0 }} />

                    </ListItemButton>

                </ListItem>

                {/* Following Feed */}
                <ListItem disablePadding sx={{display: 'block'}}>

                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'inital': 'center', px: 2.5 }} selected={selectedTab === 2} onClick={() => handleListItemClick(2)}>

                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}><PeopleAltIcon /></ListItemIcon>
                        <ListItemText primary='Following' sx={{ opacity: open ? 1 : 0 }} />

                    </ListItemButton>

                </ListItem>

                {/* For You Feed */}
                <ListItem disablePadding sx={{display: 'block'}}>

                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'inital': 'center', px: 2.5 }} selected={selectedTab === 3} onClick={() => handleListItemClick(3)}>

                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}><PublicIcon /></ListItemIcon>
                        <ListItemText primary='For You' sx={{ opacity: open ? 1 : 0 }} />

                    </ListItemButton>

                </ListItem>

                {/* Settings */}
                <ListItem disablePadding sx={{display: 'block'}}>

                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'inital': 'center', px: 2.5 }} selected={selectedTab === 4} onClick={() => handleListItemClick(4)}>

                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}><SettingsIcon /></ListItemIcon>
                        <ListItemText primary='Settings' sx={{ opacity: open ? 1 : 0 }} />

                    </ListItemButton>

                </ListItem>

            </List>



            {/* Divider */}
            <Box sx={{ flexGrow: 1 }} />
            <Divider />

            {/* New Post section */}
            <List>

                <ListItem disablePadding sx={{display: 'block'}}>

                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'inital': 'center', px: 2.5 }}>

                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}><CreateIcon /></ListItemIcon>
                        <ListItemText primary='New Post' sx={{ opacity: open ? 1 : 0 }} />

                    </ListItemButton>

                </ListItem>

            </List>

            <Divider />

            {/* User section */}
            <List>

                {/* Profile */}
                <ListItem disablePadding sx={{display: 'block'}}>

                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'inital': 'center', px: 2.5 }}>

                        <Avatar sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>EK</Avatar>
                        <ListItemText primary='Username' sx={{ opacity: open ? 1 : 0 }} />

                    </ListItemButton>

                </ListItem>

            </List>

        </Drawer>

    );

}