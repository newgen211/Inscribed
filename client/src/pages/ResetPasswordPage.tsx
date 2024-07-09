import { Avatar, Box, Button, Container, Grid, TextField, Typography, Link } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import Copyright from '../components/Copyright';


export default function ResetPasswordPage() {

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

                <Typography component='h1' variant='h5'>Reset Password</Typography>
                
                {/* Reset Password Form */}
                <Box component='form' noValidate sx={{ mt: 1 }}>

                    <TextField 
                        margin='normal'
                        required
                        fullWidth
                        id='password'
                        label='Password'
                        name='password'
                        type='password'
                        autoComplete='password'
                    />

                    <TextField 
                        margin='normal'
                        required
                        fullWidth
                        id='confrim_password'
                        label='Confirm Password'
                        name='confirm_password'
                        type='confirm_password'
                        autoComplete='confirm_password'
                    />

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{my: 2}}
                    >
                        Reset Password
                    </Button>

                    <Grid container>

                        <Grid item xs>
                            <Link component={ReactRouterDomLink} to='/' variant='body2'>
                                Back to login
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