import { useState } from 'react';
import { Box, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, DashboardAppBarProps } from '../../pages/Dashboard';
import AirIcon from '@mui/icons-material/Air';

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
                
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>

                    <AirIcon fontSize='large' />

                </Box>

            </Toolbar>

        </AppBar>

    );

}