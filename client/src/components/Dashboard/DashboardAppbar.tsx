// import styled from '@emotion/styled';
// import { IUserInfo } from '../../pages/Dashboard';
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
// import { drawerWidth } from './DashboardDrawer';

// /* Define Types and interfaces */
// interface IDashboardAppbarProps {
//     drawerOpen       : boolean;
//     setDrawerOpen    : (drawerOpen: boolean) => void;
//     currentTab       : number;
//     setCurrentTab    : (currentTab: number) => void;
//     handleTabClick   : (tab_number: number) => void;
//     fetchingUserInfo : boolean;
//     userInfo         : IUserInfo;
//     fetchUserData    : () => void;
// };

// export interface AppBarProps extends MuiAppBarProps {
//     open?: boolean;
// }

// /* Custom appbar component */
// export const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open', })<AppBarProps>(({ theme, open }) => ({
    
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),

//     ...(open && {

//       marginLeft: drawerWidth,
//       width: `calc(100% - ${drawerWidth}px)`,

//       transition: theme.transitions.create(['width', 'margin'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//       }),

//     }),

// }));

// export default function DashboardAppbar(props: IDashboardAppbarProps) {



// }