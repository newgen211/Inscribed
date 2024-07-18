import { useTheme } from '@mui/material/styles';
import { DashboardDrawerProps, Drawer, DrawerHeader } from '../../pages/Dashboard/Dashboard';
import { Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';

export default function DashboardDrawer({open, setOpen}: DashboardDrawerProps) {

    /* Function to close drawer */
    const handleDrawerClose = () => setOpen(false);

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

                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'inital': 'center', px: 2.5 }}>

                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}><HomeIcon /></ListItemIcon>
                        <ListItemText primary='Home' sx={{ opacity: open ? 1 : 0 }} />

                    </ListItemButton>

                </ListItem>

                {/* Search */}
                <ListItem disablePadding sx={{display: 'block'}}>

                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'inital': 'center', px: 2.5 }}>

                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}><SearchIcon /></ListItemIcon>
                        <ListItemText primary='Search' sx={{ opacity: open ? 1 : 0 }} />

                    </ListItemButton>

                </ListItem>
                
                {/* New Post */}
                <ListItem disablePadding sx={{display: 'block'}}>

                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'inital': 'center', px: 2.5 }}>

                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}><CreateIcon /></ListItemIcon>
                        <ListItemText primary='New Post' sx={{ opacity: open ? 1 : 0 }} />

                    </ListItemButton>

                </ListItem>

            </List>



            {/* Divider */}
            <Box sx={{ flexGrow: 1 }} />
            <Divider />

            {/* Secondary section */}
            <List>

                {/* Home */}
                <ListItem disablePadding sx={{display: 'block'}}>

                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'inital': 'center', px: 2.5 }}>

                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}><HomeIcon /></ListItemIcon>
                        <ListItemText primary='Home' sx={{ opacity: open ? 1 : 0 }} />

                    </ListItemButton>

                </ListItem>
                
            </List>

        </Drawer>

    );

}