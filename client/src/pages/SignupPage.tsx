import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Copyright from '../components/Copyright';
import { Link as ReactRouterDomLink } from 'react-router-dom';

export default function SignupPage() {

    return (

        <Container component='main' maxWidth="xs">

            
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

                <Typography component='h1' variant='h5'>Sign Up</Typography>

                {/* Sign Up Form */}
                <Box component='form' noValidate sx={{mt: 3}}>

                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6}>

                            <TextField 
                                required
                                fullWidth
                                id='first_name'
                                label='First Name'
                                name='first_name'
                                autoComplete="given-name"
                                autoFocus
                            />

                        </Grid>

                        <Grid item xs={12} sm={6}>

                            <TextField 
                                required
                                fullWidth
                                id='last_name'
                                label='Last Name'
                                name='last_name'
                                autoComplete="family-name"
                            />

                        </Grid>

                        <Grid item xs={12}>

                            <TextField 
                                required
                                fullWidth
                                id='username'
                                label='Username'
                                name='username'
                                autoComplete="username"
                            />

                        </Grid>

                        <Grid item xs={12}>

                            <TextField 
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                autoComplete="email"
                                type='email'
                            />

                        </Grid>

                        <Grid item xs={12}>

                            <TextField 
                                required
                                fullWidth
                                id='password'
                                label='Password'
                                name='password'
                                autoComplete="password"
                                type='password'
                            />

                        </Grid>

                        <Grid item xs={12}>

                            <TextField 
                                margin='normal'
                                required
                                fullWidth
                                id='confirm_password'
                                label='Confirm Password'
                                name='confirm_password'
                                autoComplete="confirm_password"
                                type='password'
                            />

                        </Grid>

                    </Grid>

                    <FormControlLabel 
                        control={<Checkbox value='terms-and-services' color='primary' />}
                        label='Agree to Terms and Services'
                    />

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{my: 2}}
                    >
                        Sign Up
                    </Button>

                    <Grid container>

                        <Grid item>
                            <Link component={ReactRouterDomLink} to='/' variant='body2'>
                                Already have an account? Sign In
                            </Link>
                        </Grid>

                    </Grid>

                </Box>

                {/* Copyright Component */}
                <Copyright 
                sx={{
                    mt: 5,
                    mb: 4
                }}
            />

            </Box>

        </Container>

    );

}