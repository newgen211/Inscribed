import { useState } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import FixedThemeToggleButton from '../components/utils/FixedThemeToggleButton';


export default function Dashboard() {

    return (

        <>
        
            <Sidebar />

            <FixedThemeToggleButton />

        </>

    );

}