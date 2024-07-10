import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, IconButton, InputAdornment, Link, TextField, ThemeProvider, Typography, Stack } from '@mui/material';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import { Fullscreen, Height, Maximize, Visibility, VisibilityOff } from '@mui/icons-material';
import theme from './ColorPalet';

const PostPageComponent: React.FC = () => {

    return (
        <ThemeProvider theme={theme}>

            <Box
                position="absolute"
                left="30%"
                top="0px"
                width="70%"
                height="100%"
                sx={{
                    border: '2px solid',
                    borderColor: 'secondary.dark',
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: "left",
                    bgcolor: 'secondary.light',
                }}
            >

                <Box
                    margin="5%"
                >

                    <Stack
                        spacing={12}
                        direction="row"
                    >

                        <Box>

                            <Box
                                sx={{
                                    fontSize: 24
                                }}
                            >
                                Title
                            </Box>

                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                <Button
                                    variant="contained"
                                    color="error" 
                                >
                                    R
                                </Button>

                                <Button
                                    variant="contained"
                                    color="error" 
                                >
                                    L
                                </Button>

                                <Button
                                    variant="contained"
                                    color="error" 
                                >
                                    C
                                </Button>

                                <Button
                                    variant="contained"
                                    color="error" 
                                >
                                    S
                                </Button>
                            </Stack>

                        </Box>

                        <Box
                            sx={{
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Avatar>
                                Profile Pic
                            </Avatar>

                            <Box>
                                Profile Name
                            </Box>
                        </Box>

                    </Stack>

                </Box>

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

                    <Box
                        margin="5%"
                    >
                        Blog goes here with a margin of 5% relative to this white box
                    </Box>

                </Box>

            </Box>

        </ThemeProvider>
    );

}

export default PostPageComponent;