import { useCallback, useState } from 'react';
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Drawer as MuiDrawer } from '@mui/material';
import { IUserInfo } from '../../pages/Dashboard';
import { CSSObject, Theme, useTheme,  } from '@mui/material/styles';
import { ChevronLeft, ChevronRight, Home, Search, PeopleAlt, Public, Settings, Create } from '@mui/icons-material';
import { Alert, Button, TextField, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

/* Define Types and interfaces */
export interface IDashboardDrawerProps {
    drawerOpen               : boolean;
    setDrawerOpen            : (drawerOpen: boolean) => void;
    currentTab               : number;
    setCurrentTab            : (currentTab: number) => void;
    handleTabClick           : (tab_number: number) => void;
    fetchingUserInfo         : boolean;
    userInfo                 : IUserInfo;
    fetchUserData            : () => void;
    getInitals               : (first_name: string, last_name: string) => string;
    newPostModalOpen         : boolean;
    setNewPostModalOpen      : (newPostModalOpen: boolean) => void;
    serverResponseMessage    : string;
    setServerResponseMessage : (serverResponseMessage: string) => void;
    serverResponseCode       : number;
    setServerResponseCode    : (serverResponseCode: number) => void;
    showAlert                : boolean;
    setShowAlert             : (showAlert: boolean) => void;
};

interface ITab {
    drawerOpen     : boolean;
    currentTab     : number;
    setCurrentTab  : (currentTab: number) => void;
    handleTabClick : (tab_number: number) => void;
    tab            : { title: string, icon: any, tab_number: number }
}

/* Set the width of the drawer */
export const drawerWidth = 240;

/* Main section tab json */
const mainSectionTabs = [

    {
        title      : "Home",
        icon       :  <Home />,
        tab_number : 0
    },
    
    {
        title      : "Search",
        icon       : <Search />,
        tab_number : 1
    },
    
    {
        title      : "Following Feed",
        icon       : <PeopleAlt />,
        tab_number : 2
    },
    
    {
        title      : "Discover Feed",
        icon       : <Public />,
        tab_number : 3
    },
    
    {
        title      : "User Settings",
        icon       : <Settings />,
        tab_number : 4
    },

];

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

/* Custom Drawer Component */
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
    })

);

/* Drawer Header Custom Component */
export const DrawerHeader = styled('div')(({ theme }) => ({

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar

}));

export default function DashboardDrawer(props:IDashboardDrawerProps) {

    /* Get theme object to access its properties */
    const theme = useTheme();

    /* New Post button functions */
    const CreateNewPostSchema = z.object({

        content: z.string().trim()
            .min(1, { message: 'Post cannot be empty' })
            .max(255, { message: 'Post cannont be longer than 255 characters' })
    
    });
    
    type CreateNewPostSchema = z.infer<typeof CreateNewPostSchema>;
    
    const token: string = "" + localStorage.getItem('token');
    
    const [dialogOpen, setDialogOpen] = useState(false);
    
    /* Server Error State */
    const [serverErrorMessage, setServerErrorMessage] = useState('');
    
    /* Loading state */
    const [isLoading, setLoading] = useState(false);
    
    /* Dialog open/close */
    const handleClickOpen = () => {
      setDialogOpen(true);
    };
    
    const handleClose = () => {
      setDialogOpen(false);
    };
    
     /* Form handler for new post dialog */
    
    const { handleSubmit, control, formState: {errors, isValid} } = useForm({
      mode: 'all',
      defaultValues: { content: '' },
      resolver: zodResolver(CreateNewPostSchema),
    });
    
    
    const handlePostSubmit = useCallback( async (values: CreateNewPostSchema) => {
      setLoading(true);
      
        try {
          await axios.post('/api/user/new-post', values, { headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token} });
        }
        catch (error) {
          if(axios.isAxiosError(error) && error.response) {
              const response = error.response.data;
              setServerErrorMessage(response.message);
          }
        }
        finally {
          setLoading(false);
          handleClose();
        }
      
    }, []); 

    return (

        <Drawer variant='permanent' open={props.drawerOpen}>

            {/* Open and Closing button for the drawer */}

            <DrawerHeader>

                {/* Icon button to call open and close drawer */}
                <IconButton onClick={() => props.setDrawerOpen(false)}>{theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}</IconButton>

            </DrawerHeader>

            {/* Divider */}

            <Divider />

            {/* Main Tab Section */}

            <List>

                {

                    mainSectionTabs.map((tab, key) => <Tab drawerOpen={props.drawerOpen} currentTab={props.currentTab} setCurrentTab={props.setCurrentTab} handleTabClick={props.handleTabClick} tab={tab} />)

                }

            </List>

            {/* Push all conent to bottom and then habe a divider Divider */}

            <Box sx={{ flexGrow: 1 }} />
            <Divider />

            {/* New Post section */}
            <List>

                <ListItem disablePadding sx={{display: 'block'}}>

                    <ListItemButton sx={{ minHeight: 48, justifyContent: props.drawerOpen ? 'inital': 'center', px: 2.5 }} onClick={handleClickOpen}>

                        <ListItemIcon sx={{ minWidth: 0, mr: props.drawerOpen ? 3 : 'auto', justifyContent: 'center' }}><Create /></ListItemIcon>
                        <ListItemText primary='New Post' sx={{ opacity: props.drawerOpen ? 1 : 0 }} />  

                    </ListItemButton>

                    <Dialog
                        open={dialogOpen}
                        onClose={handleClose}
                        fullWidth
                        maxWidth={'md'}
                        component='form'
                        onSubmit={handleSubmit(handlePostSubmit)}
                    >
                        <DialogTitle>New Post</DialogTitle>
                        <DialogContent>
                            {serverErrorMessage && (
                                <Alert severity="error" sx={{ width: '100%', my: 2 }}>
                                    {serverErrorMessage}
                                </Alert>
                            )}
                            <Controller
                                name='content'
                                control={ control }
                                render={({field}) => (
                                    <TextField
                                    {...field}
                                    inputProps={{
                                        style: { fontSize: 18 }
                                    }}
                                    InputLabelProps={{
                                        style: { fontSize: 18 }
                                    }}
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="content"
                                    name="content"
                                    label="Add your post..."
                                    fullWidth
                                    multiline
                                    variant="standard"
                                    />
                                )}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button type="button" onClick={handleClose}>Cancel</Button>
                            <Button type="submit" variant="contained" disabled={!isValid || isLoading}>Post</Button>
                        </DialogActions>
                    </Dialog>

                </ListItem>

            </List>

            {/* Divider */}
            
            <Divider />

            {/* Display username */}
            <List>

                <ListItem disablePadding sx={{display: 'block'}}>

                    <ListItemButton sx={{ minHeight: 48, justifyContent: props.drawerOpen ? 'initial': 'center', px: 2.5 }}>

                        <Avatar sx={{ minWidth: 0, mr: props.drawerOpen ? 3 : 'auto', justifyContent: 'center' }}>{props.userInfo ? props.getInitals(props.userInfo.first_name, props.userInfo.last_name): 'XX'}</Avatar>
                        <ListItemText primary={ props.userInfo ? props.userInfo.username : 'Fetching'} sx={{ opacity: props.drawerOpen ? 1 : 0 }} />

                    </ListItemButton>

                </ListItem>

            </List>



        </Drawer>

    );

}

function Tab(props:ITab) {

    return (

        <ListItem disablePadding sx={{display: 'block'}}>

        <ListItemButton sx={{ minHeight: 48, justifyContent: props.drawerOpen ? 'inital': 'center', px: 2.5 }} selected={props.currentTab === 3} onClick={() => props.handleTabClick(props.tab.tab_number)}>

            <ListItemIcon sx={{ minWidth: 0, mr: props.drawerOpen ? 3 : 'auto', justifyContent: 'center' }}>{props.tab.icon}</ListItemIcon>
            <ListItemText primary={props.tab.title} sx={{ opacity: props.drawerOpen ? 1 : 0 }} />

        </ListItemButton>

        </ListItem>

    );

}
