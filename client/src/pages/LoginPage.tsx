import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, Link } from '@mui/material';
import AdjustIcon from '@mui/icons-material/Adjust';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import Copyright from '../components/Copyright';


export default function LoginPage() {

    return (

        <Container component='main' maxWidth='xs'>

            {/* Icon and Title */}
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                
                <Avatar
                    sx={{
                        m: 1,
                        bgcolor: 'secondary.main'
                    }}
                >
                    <AdjustIcon />
                </Avatar>

                <Typography component='h1' variant='h5'>Sign In</Typography>
                
                {/* Login Form */}
                <Box component='form' noValidate sx={{ mt: 1 }}>

                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='username'
                        label='Username'
                        name='username'
                        autoComplete='username'
                        autoFocus
                    />

                    <TextField 
                        margin='normal'
                        required
                        fullWidth
                        id='password'
                        label='Password'
                        name='password'
                        type='password'
                        autoComplete='current-password'
                    />

                    <FormControlLabel 
                        control={<Checkbox value='remeber' color='primary' />}
                        label='Remeber Me'
                    />

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{my: 2}}
                    >
                        Sign In
                    </Button>

                    <Grid container>

                        <Grid item xs>
                            <Link component={ReactRouterDomLink} to='/forgot-password' variant='body2'>
                                Forgot Password?
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