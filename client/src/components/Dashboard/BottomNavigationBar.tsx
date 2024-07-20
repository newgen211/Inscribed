import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Box } from '@mui/material';
import { Home, Search, PeopleAlt, Public, Settings, Create } from '@mui/icons-material';

/* Define types and interfaces */
interface IBottomNavigationBarProps {
    currentTab     : number;
    setCurrentTab  : (currentTab: number) => void;
    handleTabClick : (tab_number: number) => void;
};

export default function BottomNavigationBar(props: IBottomNavigationBarProps) {

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        props.setCurrentTab(newValue);
        props.handleTabClick(newValue);
    };

    return (

        <Box sx={{ width: '100%', position: 'fixed', bottom: 0, zIndex: 1000 }}>

            <BottomNavigation
            sx={{ width: '100%' }}
            value={props.currentTab}
            onChange={handleChange}
            >

            <BottomNavigationAction
                label="Home"
                value={0}
                icon={<Home />}
            />

            <BottomNavigationAction
                label="Search"
                value={1}
                icon={<Search />}
            />

            <BottomNavigationAction
                label="Following"
                value={2}
                icon={<PeopleAlt />}
            />

            <BottomNavigationAction
                label="Discover"
                value={3}
                icon={<Public />}
            />

            <BottomNavigationAction
                label="Settings"
                value={4}
                icon={<Settings />}
            />

            </BottomNavigation>

        </Box>
    );
}
