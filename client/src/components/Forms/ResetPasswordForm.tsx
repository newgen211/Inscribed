import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { APIResponse } from '../../types/APIResponse';

{/* Reset Password Zod Schema */}

const ResetPasswordSchema = z.object({

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

type ResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

{/* Reset Password Form */}
export default function ResetPasswordForm() {

    {/* Define State */}
    const [serverResponseMessage, setServerResponseMessage] = useState('');          // Holds server response messages
    const [isLoading, setIsLoading] = useState(false);                              // Disables the register button while form is handleing a submit
    const [showPassword, setShowPassword] = useState(false);                        // State for toggle show and hide password
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);          // State for toggle show and hide confirm_password
    const [responseCode, setResponseCode] = useState(0);                            // State to hold http response code

    {/* Deifine page navigator for redirects */}
    const navigate = useNavigate();

    {/* Define functions to toggle the show state for the password fields */}
    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    {/* Get the search params */}
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    {/* React Hook Form Configuration */}
    const { handleSubmit, control, formState: { errors, isValid }, setError } = useForm({
        mode: 'all',
        defaultValues: {
            password: '', confirm_password: ''
        },
        resolver: zodResolver(ResetPasswordSchema),   
    });

    {/* Function to handle form submit */}
    const handleRegisterSubmit = useCallback( async (values: ResetPasswordSchema) => {

        {/* Set the loading state of the form to true while submitting */}
        setIsLoading(true);

        {/* Attempt to register the user */}
        try {

            {/* Make post request to reset password api */}
            const response = await axios.post(`/api/auth/reset-password?token=${token}`, values);

            {/* Set the server error message */}
            setServerResponseMessage(response.data.message);

            {/* Set the response code state */}
            setResponseCode(response.data.code);

            {/* After 5 seconds auto-redirect to login page */}
            setTimeout(() => {
                navigate('/');
            }, 5000);

        }

        catch(error) {

            if(axios.isAxiosError(error) && error.response) {

                {/* Get the error response */}
                const response: APIResponse = error.response.data;

                {/* Set the server error message */}
                setServerResponseMessage(response.message);

            }

        }

        finally {
            {/* Reset the loading state of the form */}
            setIsLoading(false);
        }

    },[token]);

    {/* Redirect back to login function */}
    const handleRedirect = () => {
        navigate('/');
    };

    {/* Password Reset Form JSX */}
    return (

        <Box component="form" onSubmit={handleSubmit(handleRegisterSubmit)} noValidate sx={{ mt: 1 }}>
            
            {/* Display server response */}
            {
            serverResponseMessage && 
                <Alert severity={responseCode === 200 ? 'success' : 'error'}>
                    {serverResponseMessage}
                </Alert>
            }

            {/* Password Input field */}
            <Controller 
                control={control}
                name='password'
                render={({field}) => (
                    <TextField 
                        {...field}
                        margin="normal"
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

            {/* Confirm Password Input field */}
            <Controller 
                control={control}
                name='confirm_password'
                render={({field}) => (
                    <TextField 
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        id='confirm_password'
                        name='confirm_password'
                        label='Confirm Password'
                        autoComplete='password'
                        type={showConfirmPassword ? 'text' : 'password'}
                        error={!!errors.confirm_password}
                        helperText={errors.confirm_password?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleShowPassword}
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

            {/* Reset Submit Button */}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isValid || isLoading}
            >
                Reset Password
            </Button>

            {/* Button to Login */}
            {responseCode === 200 && 
                
                <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleRedirect}
                color="secondary"
            >
                Back to Login
            </Button>
        
        }

        </Box>

    );

}