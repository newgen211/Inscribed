import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, IconButton, InputAdornment, Link, TextField, ThemeProvider, Typography, Stack } from '@mui/material';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import { Fullscreen, Height, Maximize, Visibility, VisibilityOff } from '@mui/icons-material';
import theme from './ColorPalet';

const ErrorComponent: React.FC = () => {

    return (
        <ThemeProvider theme={theme}>

            <Box
                position="absolute"
                width="100%"
                height="100%"
                bgcolor="secondary.light"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Stack
                    spacing={4}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    
                    <Box
                        sx={{
                            fontSize: 32
                        }}
                    >
                        Error
                    </Box>

                    <Box>
                        This is an error message
                    </Box>

                    <Link component={ReactRouterDomLink} to='/'>
                        <Button
                            variant='contained'
                            color='error'
                        >
                            Return to Login
                        </Button>
                    </Link>

                </Stack>

            </Box>

        </ThemeProvider>
    );

}

export default ErrorComponent;