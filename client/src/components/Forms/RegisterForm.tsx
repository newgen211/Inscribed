import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Box, Button, Grid, IconButton, InputAdornment, Link, TextField } from '@mui/material';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link as ReactRouterDomLink, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { APIResponse } from '../../types/APIResponse';

{/* Register Zod Schema */}
const RegistrationSchema = z.object({

    first_name: z.string().trim()
        .min(1, { message: 'First name is required'} )
        .max(50, { message: 'First name cannot exceed 50 characters in length' })
        .regex(/^[a-zA-Z\s'-]+$/, { message: 'First name can only contain letters, spaces, hypens, and apostrophes' })
        .transform((name) => name.replace(/\s+/g, ' '))
        .transform((name) => name.charAt(0).toUpperCase() + name.slice(1))
        .refine((name) => name.trim().length > 0, { message: 'First name cannot be just whitespace' }),

    last_name: z.string().trim()
        .min(1, { message: 'First name is required'} )
        .max(50, { message: 'First name cannot exceed 50 characters in length' })
        .regex(/^[a-zA-Z\s'-]+$/, { message: 'First name can only contain letters, spaces, hypens, and apostrophes' })
        .transform((name) => name.replace(/\s+/g, ' '))
        .transform((name) => name.charAt(0).toUpperCase() + name.slice(1))
        .refine((name) => name.trim().length > 0, { message: 'First name cannot be just whitespace' }),
    
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
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&_-]{8,}$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character and be at least 8 characters long' })
        .min(8, { message: 'Password must be at least charracters long' })
        .max(64, { message: 'Password cannot exceed 64 characters in length' }),

    confirm_password: z.string().trim()
        .max(64, { message: 'Confirm password cannot exceed 64 characters in length' }),
    

}).refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
});


type RegistrationSchema = z.infer<typeof RegistrationSchema>;

{/* Register Form Component */}
export default function RegisterForm() {

    {/* Define State */}
    const [serverErrorMessage, setServerErrorMessage] = useState('');               // Holds server error messages
    const [isLoading, setIsLoading] = useState(false);                              // Disables the register button while form is handleing a submit
    const [showPassword, setShowPassword] = useState(false);                        // State for toggle show and hide password
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);          // State for toggle show and hide confirm_password

    {/* Deifine page navigator for redirects */}
    const navigate = useNavigate();

    {/* Define functions to toggle the show state for the password fields */}
    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    {/* React Hook Form Configuration */}
    const { handleSubmit, control, formState: { errors, isValid }, setError } = useForm({
        mode: 'all',
        defaultValues: {
            first_name: '', last_name: '', username: '', email: '', password: '', confirm_password: ''
        },
        resolver: zodResolver(RegistrationSchema),   
    });


    {/* Function to handle form submit */}
    const handleRegisterSubmit = useCallback( async (values: RegistrationSchema) => {
        
        {/* Set the loading state of the form to true while submitting */}
        setIsLoading(true);

        {/* Attempt to register the user */}
        try {

            {/* Make post request to register api */}
            await axios.post('/api/auth/register', values);

            {/* Navigate to the success page */}
            navigate('/register-success');

        }

        catch(error) {

            if(axios.isAxiosError(error) && error.response) {

                {/* Get the error response */}
                const response: APIResponse = error.response.data;

                {/* Set the server error message */}
                setServerErrorMessage(response.message);

                {/* Loop through the server errors and set them to the appropriate field */}
                {/* This handles the error messages when username and email are already in use */}
                response.errors?.forEach(err => {
                    setError(err.field as keyof RegistrationSchema, { type: 'conflict', message: err.message });
                });

            }

        }

        finally {
            {/* Reset the loading state of the form */}
            setIsLoading(false);
        }

    }, []);


    {/* Return JSX */}
    return (

        <Box component="form" onSubmit={handleSubmit(handleRegisterSubmit)} noValidate sx={{ mt: 3 }}>
            
            {/* Display any server errors that may arise */}
            {
            serverErrorMessage &&
            <Alert severity='error' sx={{ width: '100%', mb: 3 }}>
                {serverErrorMessage}
            </Alert>
            }

            <Grid container spacing={2}>
                
                {/* First name input field */}
                <Grid item xs={12} sm={6}>

                    <Controller 
                        control={control}
                        name='first_name'
                        render={({field}) => (
                            <TextField 
                                {...field}
                                required
                                fullWidth
                                id='first_name'
                                name='first_name'
                                label='First Name'
                                autoComplete='given-name'
                                error={!!errors.first_name}
                                helperText={errors.first_name?.message}
                            />
                        )}
                    />

                </Grid>

                {/* Last name input field */}
                <Grid item xs={12} sm={6}>

                    <Controller 
                        control={control}
                        name='last_name'
                        render={({field}) => (
                            <TextField 
                                {...field}
                                required
                                fullWidth
                                id='last_name'
                                name='last_name'
                                label='Last Name'
                                autoComplete='family-name'
                                error={!!errors.last_name}
                                helperText={errors.last_name?.message}
                            />
                        )}
                    />

                </Grid>

                {/* Email input field */}
                <Grid item xs={12} >

                    <Controller 
                        control={control}
                        name='email'
                        render={({field}) => (
                            <TextField 
                                {...field}
                                required
                                fullWidth
                                id='email'
                                name='email'
                                label='Email'
                                autoComplete='email'
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        )}
                    />

                </Grid>

                {/* Username input field */}
                <Grid item xs={12} >

                    <Controller 
                        control={control}
                        name='username'
                        render={({field}) => (
                            <TextField 
                                {...field}
                                required
                                fullWidth
                                id='username'
                                name='username'
                                label='Username'
                                autoComplete='username'
                                error={!!errors.username}
                                helperText={errors.username?.message}
                            />
                        )}
                    />

                </Grid>

                {/* Password input field */}
                <Grid item xs={12} >

                    <Controller 
                        control={control}
                        name='password'
                        render={({field}) => (
                            <TextField 
                                {...field}
                                required
                                fullWidth
                                id='password'
                                name='password'
                                label='Password'
                                autoComplete='password'
                                type={showPassword ? 'text' : 'password'}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={toggleShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />

                </Grid>

                {/* Confirm Password input field */}
                <Grid item xs={12} >

                    <Controller 
                        control={control}
                        name='confirm_password'
                        render={({field}) => (
                            <TextField 
                                {...field}
                                required
                                fullWidth
                                id='confirm_password'
                                name='confirm_password'
                                label='Confirm Password'
                                autoComplete='confirm_password'
                                type={showConfirmPassword ? 'text' : 'password'}
                                error={!!errors.confirm_password}
                                helperText={errors.confirm_password?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle confirm password visibility"
                                                onClick={toggleShowConfirmPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />

                </Grid>

            </Grid>
                        
            {/* Register Submit Button */}
            <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{my: 2}}
                disabled={!isValid || isLoading}
            >
                Sign Up
            </Button>

            {/* Link back to login */}
            <Grid container>

                <Grid item>

                    <Link component={ReactRouterDomLink} to='/' variant='body2'>
                        Already have an account? Sign In
                    </Link>
                    
                </Grid>

            </Grid>

        </Box>

    );

}