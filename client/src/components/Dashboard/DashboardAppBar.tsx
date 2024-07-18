import { IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, DashboardAppBarProps } from '../../pages/Dashboard/Dashboard';

export default function DashboardAppBar({ open, setOpen }: DashboardAppBarProps) {

    /* Function to open drawer */
    const handleDrawerOpen = () => setOpen(true);

    /* Appbar JSX */
    return (

        <AppBar position="fixed" open={open}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
                }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
                Mini variant drawer
            </Typography>
            </Toolbar>
        </AppBar>

    );

}