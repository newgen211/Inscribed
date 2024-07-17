import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, Link, TextField } from '@mui/material';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link as ReactRouterDomLink, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { APIResponse } from '../types/APIResponse';

{/* Request Password Reset Zod Schema */}
export const RequestPasswordResetSchema = z.object({

    email: z.string().trim()
        .min(1, { message: 'Email address is required' })
        .max(255, { message: 'Email address cannot exceed 50 characters in length' })
        .email({ message: 'Invalid email address' }),

});

export type RequestPasswordResetSchema = z.infer<typeof RequestPasswordResetSchema>;

{/* Request Password Reset form */}
export default function RequestPasswordResetForm() {

    {/* Define State */}
    const [serverErrorMessage, setServerErrorMessage] = useState('');               // Holds server error messages
    const [isLoading, setIsLoading] = useState(false);                              // Disables the register button while form is handleing a submit

    {/* Deifine page navigator for redirects */}
    const navigate = useNavigate();

    {/* React Hook Form Configuration */}
    const { handleSubmit, control, formState: { errors, isValid }, setError } = useForm({
        mode: 'all',
        defaultValues: {
            email: ''
        },
        resolver: zodResolver(RequestPasswordResetSchema),   
    });

    {/* Password reset form handler */}
    const handleRequestSubmit = useCallback( async (values: RequestPasswordResetSchema) => {
        
        {/* Set the loading state to true while processing request */}
        setIsLoading(true);

        {/* Attempt to send password reset email */}
        try {

            {/* Attempt to send a password reset email */}
            await axios.post('/api/auth/request-password-reset', values);

            {/* Navigate to success page after email sent */}
            navigate('/reset-email-sent');

        }

        catch(error) {

            if(axios.isAxiosError(error) && error.response) {

                {/* Get the error response */}
                const response: APIResponse = error.response.data;

                {/* Set the server error message */}
                setServerErrorMessage(response.message);

            }

        }

        finally {

            {/* Reset the loading state to false when done processing */}
            setIsLoading(false);

        }

    },[]);

    return (

        <Box component="form" onSubmit={handleSubmit(handleRequestSubmit)} noValidate sx={{ mt: 3 }}>

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

            {/* Submit Forgot Password Request Button */}
            <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{my: 2}}
                disabled={!isValid || isLoading}
            >
                Reset Password
            </Button>

            {/* Link back to login */}
            <Grid container>

                <Grid item>

                    <Link component={ReactRouterDomLink} to='/' variant='body2'>
                        Back to login
                    </Link>
                    
                </Grid>

            </Grid>

        </Box>

    );

}