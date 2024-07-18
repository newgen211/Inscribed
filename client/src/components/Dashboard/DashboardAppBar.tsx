import { useState } from 'react';
import { IconButton, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, DashboardAppBarProps } from '../../pages/Dashboard/Dashboard';

export default function DashboardAppBar({ open, setOpen, selectedTab, setSelectedTab }: DashboardAppBarProps) {

    /* Function to open drawer */
    const handleDrawerOpen = () => setOpen(true);

    /* Function to handle tab change */
    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => setSelectedTab(newValue);

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

                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="simple tabs example"
                    sx={{
                        '& .MuiTab-root': {
                            color: 'white',
                            '&.Mui-selected': {
                                color: 'yellow',
                            },
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: 'yellow',
                        },
                    }}
                >
                    <Tab label="For You" />
                    <Tab label="Discover" />
                </Tabs>

            </Toolbar>

        </AppBar>

    );

}