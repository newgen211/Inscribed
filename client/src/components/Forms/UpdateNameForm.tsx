import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { APIResponse } from '../../types/APIResponse';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

const UpdateNameSchema = z.object({
    first_name: z.string().trim()
        .min(1, { message: 'First name is required' })
        .max(50, { message: 'First name cannot exceed 50 characters in length' })
        .regex(/^[a-zA-Z\s'-]+$/, { message: 'First name can only contain letters, spaces, hyphens, and apostrophes' })
        .transform((name) => name.replace(/\s+/g, ' '))
        .transform((name) => name.charAt(0).toUpperCase() + name.slice(1))
        .refine((name) => name.trim().length > 0, { message: 'First name cannot be just whitespace' })
        .optional(),

    last_name: z.string().trim()
        .min(1, { message: 'Last name is required' })
        .max(50, { message: 'Last name cannot exceed 50 characters in length' })
        .regex(/^[a-zA-Z\s'-]+$/, { message: 'Last name can only contain letters, spaces, hyphens, and apostrophes' })
        .transform((name) => name.replace(/\s+/g, ' '))
        .transform((name) => name.charAt(0).toUpperCase() + name.slice(1))
        .refine((name) => name.trim().length > 0, { message: 'Last name cannot be just whitespace' })
        .optional(),
});

type UpdateNameSchemaType = z.infer<typeof UpdateNameSchema>;

export default function UpdateNameForm() {
    // Define State
    const [serverResponseMessage, setServerResponseMessage] = useState('');         // Holds server error messages
    const [isLoading, setIsLoading] = useState(false);                              // Disables the register button while form is handling a submit
    const [serverResponseCode, setServerResponseCode] = useState(0);                // State to track server response code
    const [showAlert, setShowAlert] = useState(false);

    // Get auth state
    const { logout } = useAuth();

    // React Hook Form Configuration
    const { handleSubmit, control, formState: { errors, isValid }, setError } = useForm<UpdateNameSchemaType>({
        mode: 'all',
        defaultValues: {
            first_name: '', 
            last_name: ''
        },
        resolver: zodResolver(UpdateNameSchema),
    });

    // Form submission handler
    const handleNameChange = async (values: UpdateNameSchemaType) => {
        try {
            setIsLoading(true);

            // Retrieve the auth token from local storage
            const token = localStorage.getItem('token');
            
            if (!token) {
                logout();
            }

            // Attempt to change user's name
            const response = await axios.patch('/api/user/update-name', values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Set the server response message
            setServerResponseMessage(response.data.message || 'Name updated successfully');

            // Set the response code
            setServerResponseCode(response.data.code);

            // Make sure to set the show alert
            setShowAlert(true);
            
        } 
        
        catch (error) {
            
            if (axios.isAxiosError(error) && error.response) {
                
                // Get the error response
                const response = error.response.data;

                // Check if the error is due to an invalid or expired token

                if (response.code === 401 || response.code === 403) {

                    logout(); 

                }

                // Set server error message
                setServerResponseMessage(response.message || 'An error occurred');

                // Set the response code
                setServerResponseCode(response.code);

            } 

            else {

                setServerResponseMessage('An unexpected error occurred');

                // Set the response code
                setServerResponseCode(500);
            }

            // Make sure to set the show alert
            setShowAlert(true);
            
        } 
        
        finally {
            setIsLoading(false);
        }
    };

    // Auto-dismiss alert after 5 seconds
    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 5000);
            return () => clearTimeout(timer); // Cleanup the timer on component unmount
        }
    }, [showAlert]);

    return (
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(handleNameChange)}>

            {/* Display server response */}
            {
                showAlert &&
                    
                    <Alert severity={serverResponseCode === 200 ? 'success' : 'error'} sx={{mb: 2}}>
                        {serverResponseMessage}
                    </Alert>

            }
            <Grid container spacing={2} alignItems="center">

                <Grid item xs={12} sm={4}>

                    {/* First Name Input */}
                    <Controller
                        control={control}
                        name='first_name'
                        render={({ field }) => (
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

                <Grid item xs={12} sm={4}>

                    {/* Last Name Input */}
                    <Controller
                        control={control}
                        name='last_name'
                        render={({ field }) => (
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

                <Grid item xs={12} sm={4}>

                    {/* Update Button */}
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ height: '56px', my: 2 }}
                        disabled={!isValid || isLoading}
                    >
                        Update Name
                    </Button>
                </Grid>

            </Grid>

        </Box>

    );
}
