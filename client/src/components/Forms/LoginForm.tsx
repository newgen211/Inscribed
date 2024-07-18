import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Checkbox, FormControlLabel, Grid, Link, TextField } from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link as ReactRouterDomLink, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';

/* Zod Login Schema For Input Validation */

const LoginSchema = z.object({

    username: z.string().trim()
        .min(1, { message: 'Username required' })
        .max(50, { message: 'Username cannot exceed 50 characters in length' })
        .regex(/^[a-zA-Z][a-zA-Z0-9-_]{0,49}$/, { message: 'Username must start with a letter and can only contain letters, numbers, hypens, and underscores' })
        .refine((name) => name.trim().length > 0, { message: 'Username cannot be just whitespace' }),

    password: z.string().trim()
        .min(1, { message: 'Password is required' })

});

type LoginSchema = z.infer<typeof LoginSchema>; 

/* Login Form Component */

export default function LoginForm() {

    {/* Use the login function from the Auth Provider. Also, get the current auth state from the provider */}
    const { login, isAuthenticated } = useAuth();

    {/* Page Navigtor */}
    const navigate = useNavigate();

    {/* State to hold server error message */}
    const [serverErrorMessage, setServerErrorMessage] = useState('');

    {/* Loading state */}
    const [isLoading, setLoading] = useState(false);

    {/* Automatically redirect to dashboard if alreasy authenticated */}
    useEffect(() => {

        if(isAuthenticated) {
            navigate('/dashboard');
        }

    },[isAuthenticated, navigate]);

    {/* React Hook Form Handler */}
    const { handleSubmit, control, formState: { errors, isValid }, setError } = useForm({
        mode: 'all',
        defaultValues: { username: '', password: '' },
        resolver: zodResolver(LoginSchema),   
    });

    const handleLoginSubmit = useCallback( async(values: LoginSchema) => {

        // Set the loading state of the form to true
        setLoading(true);

        // Attempt to login user
        try {

            // Make axios post request to the api
            const response = await axios.post('/api/auth/login', values);

            // Upon success response, store the login token in local storage using the useAuth hook
            login(response.data.token);

            // Redirect to the dashboard
            navigate('/dashboard');

        }

        catch(error) {

            if(axios.isAxiosError(error) && error.response) {

                const response = error.response.data;

                setServerErrorMessage(response.message);

            }

        }
        finally {

            // Reset the form loading stage to fasle
            setLoading(false);

        }

    }, [login, navigate]);

    return (

        <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)} noValidate sx={{ mt: 1 }}>

            {/* Display any server errors that may arise */}
            {
            serverErrorMessage &&
            <Alert severity='error' sx={{ width: '100%' }}>
                {serverErrorMessage}
            </Alert>
            }
            
            {/* Username Input */}
            <Controller 
                name='username'
                control={control}
                render={({field}) => (

                    <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />

                )}

            />

            {/* Password Input */}
            <Controller 
                name='password'
                control={control}
                render={({field}) => (

                    <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        autoComplete="password"
                        type='password'
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                )}
            />

            {/* Login Submit Button */}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isValid || isLoading}
            >
                Sign In
            </Button>

            {/* Link to Forgot Password and Register */}
            <Grid container>

                <Grid item xs>
                    <Link component={ReactRouterDomLink} to="/request-password-reset" variant="body2">
                        Forgot password?
                    </Link>
                </Grid>

                <Grid item>
                    <Link component={ReactRouterDomLink} to="/register" variant="body2">
                        Dont't have an account? Sign Up
                    </Link>
                </Grid>

            </Grid>

        </Box>

    );

}