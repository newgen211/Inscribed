import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, IconButton, InputAdornment, Link, Stack, TextField, ThemeProvider, Typography } from '@mui/material';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import { Fullscreen, Height, Maximize, Visibility, VisibilityOff } from '@mui/icons-material';
import theme from './ColorPalet';

const SideBar: React.FC = () => {

    return (
        <ThemeProvider theme={theme}>
                
             <Box
                position="absolute"
                left="0px"
                top="0px"
                width="30%"
                height="100%"
                sx={{
                    border: '2px solid',
                    borderColor: 'secondary.dark',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    bgcolor: 'primary.light',
                }}
            >
                
                <Box
                    marginTop="20%"
                    marginLeft="10%"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                        bgcolor: 'primary.light',
                        fontSize: 32
                    }}
                >

                    inscribe

                </Box>

                <Stack
                    margin="10%"
                    marginTop="30%"
                    spacing={3}
                >
                    <Link component={ReactRouterDomLink} to='/dashboard'>
                        <Button
                            variant="text"
                            style={{justifyContent: "flex-start"}}
                        >
                            Home
                        </Button>
                    </Link>
                    <Button
                        variant="text"
                        style={{justifyContent: "flex-start"}}
                    >
                        Explore
                    </Button>
                    <Button
                        variant="text"
                        style={{justifyContent: "flex-start"}}
                    >
                        Messages
                    </Button>
                    <Button
                        variant="text"
                        style={{justifyContent: "flex-start"}}
                    >
                        Notifications
                    </Button>
                    <Button
                        variant="text"
                        style={{justifyContent: "flex-start"}}
                    >
                        Profile
                    </Button>
                    <Button
                        variant="contained"
                        color="error" 
                    >
                        Post
                    </Button>
                    <Button
                        variant="text"
                        style={{justifyContent: "flex-start"}}
                    >
                        Settings
                    </Button>

                </Stack>

            </Box>

        </ThemeProvider>
    );

}

export default SideBar;