import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { APIResponse } from '../../types/APIResponse';

const UpdatePasswordSchema = z.object({

    current_password: z.string().trim()
        .min(1, { message: 'Current Password is required' })
        .max(64, { message: 'Password cannot exceed 64 characters' }),

    new_password: z.string().trim()
        .min(8, { message: 'Password must be at least charracters long' })
        .max(64, { message: 'Password cannot exceed 64 characters in length' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&_-]{8,}$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' }),

    confirm_password: z.string().trim()
        .min(8, { message: 'Confirm password must be at least 8 characters long' })
        .max(64, { message: 'Confirm password cannot exceed 64 characters in length' }),

}).strict().refine((data) => data.new_password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
});

type UpdatePasswordSchema = z.infer<typeof UpdatePasswordSchema>;

export default function UpdatePasswordForm() {
    // Define State
    const [serverResponseMessage, setServerResponseMessage] = useState('');         // Holds server error messages
    const [isLoading, setIsLoading] = useState(false);                              // Disables the register button while form is handling a submit
    const [serverResponseCode, setServerResponseCode] = useState(0);                // State to track server response code
    const [showAlert, setShowAlert] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Functions to toggle password show
    const toggleShowCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
    const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    // Get auth state
    const { logout } = useAuth();

    // React Hook Form Configuration
    const { handleSubmit, control, formState: { errors, isValid }, setError } = useForm<UpdatePasswordSchema>({
        mode: 'all',
        defaultValues: { current_password: '', new_password: '', confirm_password: '' },
        resolver: zodResolver(UpdatePasswordSchema),
    });

    // Form submission handler
    const handlePasswordChange = async (values: UpdatePasswordSchema) => {
        
        // Set the loading state to true while processing
        setIsLoading(true);

        try {

            // Get the user token
            const token = localStorage.getItem('token');

            // If we dont have a token set the auth state to logged out
            if(!token) {
                logout();
                return;
            }

            // Attempt to change the password
            const response = await axios.patch('/api/user/update-password', values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Set the response state
            console.log(`RESPONSE MESSAGE: ${response.data.message}`);
            setServerResponseMessage(response.data.message);
            setServerResponseCode(response.data.code);
            setShowAlert(true);

        }

        catch(error) {

            if(axios.isAxiosError(error) && error.response) {

                // Get the error response
                const response = error.response.data;

                // Check if the user's token is valid
                if(response.code === 401 && response.message !== 'Current password incorrect') {
                    logout();
                }

                // Set the response state
                console.log(`RESPONSE ERROR MESSAGE: ${response.message}`);
                setServerResponseMessage(response.message);
                setServerResponseCode(response.code);
                setShowAlert(true);

            }

        }

        finally {

            // Set the loading state to false when done processing
            setIsLoading(false);

        }

    };

    // Auto-dismiss alert after 5 seconds
    useEffect(() => {

        if (showAlert) {

            const timer = setTimeout(() => setShowAlert(false), 5000);
            return () => clearTimeout(timer);

        }

    }, [showAlert]);

    return (
        
        <Box component="form" noValidate onSubmit={handleSubmit(handlePasswordChange)}>
            
            <Typography variant="h5" component="h2" gutterBottom>
                Update Password
            </Typography>

            {/* Alert positioning */}
            <Box sx={{ mb: 2 }}>
                {showAlert && (
                    <Alert severity={serverResponseCode === 200 ? 'success' : 'error'}>
                        {serverResponseMessage}
                    </Alert>
                )}
            </Box>

            <Grid container spacing={2}>
                {/* Current Password Input */}
                <Grid item xs={12} md={4}>
                    <Controller
                        control={control}
                        name="current_password"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                required
                                id="current_password"
                                label="Current Password"
                                type={showCurrentPassword ? 'text' : 'password'}
                                error={!!errors.current_password}
                                helperText={errors.current_password?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={toggleShowCurrentPassword} edge="end">
                                                {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                </Grid>

                {/* New Password Input */}
                <Grid item xs={12} md={4}>
                    <Controller
                        control={control}
                        name="new_password"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                required
                                id="new_password"
                                label="New Password"
                                type={showNewPassword ? 'text' : 'password'}
                                error={!!errors.new_password}
                                helperText={errors.new_password?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={toggleShowNewPassword} edge="end">
                                                {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                </Grid>

                {/* Confirm Password Input */}
                <Grid item xs={12} md={4}>
                    <Controller
                        control={control}
                        name="confirm_password"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                required
                                id="confirm_password"
                                label="Confirm Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                error={!!errors.confirm_password}
                                helperText={errors.confirm_password?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={toggleShowConfirmPassword} edge="end">
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                </Grid>

                {/* Update Button */}
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, mt: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: 200 }}
                            disabled={!isValid || isLoading}
                        >
                            Update Password
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>

    );
}
