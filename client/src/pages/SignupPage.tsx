import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Copyright from '../components/Copyright';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import { boolean, z } from 'zod';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';

// Define RegisterSchema
const RegisterFormData = z.object({

    first_name: z.string().trim()
        .min(1, { message: 'First name is required'} )
        .max(50, { message: 'First name cannot exceed 50 characters in length' })
        .regex(/^[a-zA-Z\s'-]+$/, { message: 'First name can only contain letters, spaces, hypens, and apostrophes' })
        .transform((name) => name.replace(/\s+/g, ' '))
        .transform((name) => name.charAt(0).toUpperCase() + name.slice(1))
        .refine((name) => name.trim().length > 0, { message: 'First name cannot be just whitespace' }),

    last_name: z.string().trim()
        .min(1, { message: 'Last name is required'} )
        .max(50, { message: 'Last name cannot exceed 50 characters in length' })
        .regex(/^[a-zA-Z\s'-]+$/, { message: 'Last name can only contain letters, spaces, hypens, and apostrophes' })
        .transform((name) => name.replace(/\s+/g, ' '))
        .transform((name) => name.charAt(0).toUpperCase() + name.slice(1))
        .refine((name) => name.trim().length > 0, { message: 'Last name cannot be just whitespace' }),
    
    username: z.string().trim()
        .min(1, { message: 'Username required' })
        .max(50, { message: 'Username cannot exceed 50 characters in length' })
        .regex(/^[a-zA-Z][a-zA-Z0-9-_]{0,49}$/, { message: 'Username must start with a letter and can only contain letters, numbers, hypens, and underscores' })
        .refine((name) => name.trim().length > 0, { message: 'Username cannot be just whitespace' }),

    email: z.string().trim()
        .min(1, { message: 'Email address is required' })
        .max(255, { message: 'Email address cannot exceed 50 characters in length' })
        .email({ message: 'Invalid email address' }),

    password: z.string().trim()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(64, { message: 'Password cannot exceed 64 characters in length' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&_-]{8,}$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' }),

    confirm_password: z.string().trim()
        .min(8, { message: 'Confirm password must be at least 8 characters long' })
        .max(64, { message: 'Confirm password cannot exceed 64 characters in length' }),

}).refine( data => data.password === data.confirm_password, { message: 'Passwords do not match' } );

type RegisterFormData = z.infer<typeof RegisterFormData>;


const SignupPage: React.FC = () => {

    /* State for input fields */
    const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({ first_name : '', last_name : '', username : '', email : '', password : '', confirm_password : '' });

    /* State to keep track of fields the user has interacted with */
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({ first_name: false, last_name: false, username: false, email: false, password: false, confirm_password: false });

    /* State to hold client/server side validation errors */
    const [errors, setErrors] = useState<z.ZodIssue[]>([]);

    /* Handle the form submit */
    const handleSubmit = (event: ChangeEvent<HTMLInputElement>) => {

    };

    /* Validate the input fields against zod schema */
    const validateInput = () => {

    };

    /*  */
    
    
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
                <Box component='form' onSubmit={handleSubmit} noValidate sx={{mt: 3}}>

                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6}>

                            <TextField 
                                required
                                fullWidth
                                id='first_name'
                                label='First Name'
                                name='first_name'
                                autoComplete="given-name"
                                value={registerFormData.first_name}
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
                                value={registerFormData.last_name}
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
                                value={registerFormData.username}
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
                                value={registerFormData.email}
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
                                value={registerFormData.password}
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
                                value={registerFormData.confirm_password}
                            />

                        </Grid>

                    </Grid>

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

export default SignupPage;