import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, Link } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import Copyright from '../components/Copyright';


export default function ForgotpasswordPage() {

    return (

        <Container component='main' maxWidth='xs'>

            
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* Icon and Title */}
                <Avatar
                    sx={{
                        m: 1,
                        bgcolor: 'secondary.main'
                    }}
                >
                    <AlternateEmailIcon />
                </Avatar>

                <Typography component='h1' variant='h5'>Forgot Password</Typography>
                
                {/* Forgot Password Form */}
                <Box component='form' noValidate sx={{ mt: 1 }}>

                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label='Email'
                        name='email'
                        autoComplete='email'
                        type='email'
                        autoFocus
                    />

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{my: 2}}
                    >
                        Request Password Reset
                    </Button>

                    <Grid container>

                        <Grid item xs>
                            <Link component={ReactRouterDomLink} to='/' variant='body2'>
                                Back to login
                            </Link>
                        </Grid>

                        <Grid item>
                            <Link component={ReactRouterDomLink} to='/sign-up' variant='body2'>
                                Dont't have an account? Sign Up
                            </Link>
                        </Grid>

                    </Grid>

                </Box>

            </Box>

            {/* Copyright component */} 
            <Copyright 
                sx={{
                    mt: 8,
                    mb: 4
                }}
            />

        </Container>

    );

}