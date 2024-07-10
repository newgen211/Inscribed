import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, IconButton, InputAdornment, Link, TextField, ThemeProvider, Typography } from '@mui/material';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import { Fullscreen, Height, Maximize, Visibility, VisibilityOff } from '@mui/icons-material';
import theme from './ColorPalet';

const PostPageComponent: React.FC = () => {

    return (
        <ThemeProvider theme={theme}>
                
             <Box
                position="absolute"
                right="0px"
                top="20%"
                width="70%"
                height="80%"
                sx={{
                    border: '2px solid',
                    borderColor: 'secondary.light',
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
                        borderColor: 'secondary.light',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: 'primary.light'
                    }}
                >

                    Blog goes here

                </Box>

            </Box>

        </ThemeProvider>
    );

}

export default PostPageComponent;