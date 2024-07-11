import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, IconButton, InputAdornment, Link, TextField, ThemeProvider, Typography, Stack } from '@mui/material';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import { Fullscreen, Height, Maximize, Visibility, VisibilityOff } from '@mui/icons-material';
import theme from './ColorPalet';

const SettingsComponent: React.FC = () => {

    return (
        <ThemeProvider theme={theme}>

            <Box
                position="absolute"
                left="30%"
                top="0px"
                width="70%"
                height="20%"
                sx={{
                    border: '2px solid',
                    borderColor: 'secondary.dark',
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: 'secondary.light',
                    fontSize: 24
                }}
            >
                Settings
            </Box>

            <Box
                position="absolute"
                right="0px"
                top="20%"
                width="70%"
                height="80%"
                sx={{
                    border: '2px solid',
                    borderColor: 'secondary.dark',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: 'secondary.main'
                }}
            >
                
                <Box
                    position="absolute"
                    margin="10%"
                    width="80%"
                    height="80%"
                    sx={{
                        border: '2px solid',
                        borderColor: 'secondary.dark',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: 'primary.light',
                        borderRadius: 8
                    }}
                >

                    <Stack
                        margin="10%"
                        spacing={4}
                    >
                        <Stack
                        spacing={10}
                            direction="row"
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Box> 
                                Light/Dark Mode
                            </Box>
                            
                            <Button
                                variant='outlined'
                            >
                                Light
                            </Button>
                        </Stack>

                    </Stack>

                </Box>

            </Box>

        </ThemeProvider>
    );

}

export default SettingsComponent;