import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../hooks/useAuth';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdatePasswordSchema } from './schema';
import axios, { AxiosResponse } from 'axios';
import { Alert, Box, Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

/* Define types and interfaces */
interface IUpdatePasswordFormProps {
    fetchUserData    : () => void;
};

export default function UpdatePasswordForm(props: IUpdatePasswordFormProps) {

    /* Define State Variables */
    const [isLoading, setIsLoading]                         = useState<boolean>(false);
    const [serverResponseMessage, setServerResponseMessage] = useState<string>('');
    const [serverResponseCode, setServerResponseCode]       = useState<number>(0);
    const [showAlert, setShowAlert]                         = useState<boolean>(false);
    const [showCurrentPassword, setShowCurrentPassword]     = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword]             = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword]     = useState<boolean>(false);

    /* Get the logout function from the global auth state */
    const { logout } = useAuth();

    /* React Hook Form Configuration */
    const { handleSubmit, control, formState: { errors, isValid }, setError } = useForm<UpdatePasswordSchema>({
        mode: 'all',
        defaultValues: { current_password: '', new_password: '', confirm_password: '' },
        resolver: zodResolver(UpdatePasswordSchema),
    });

    /* Handle Password Change Form Submit */
    const handleFormSubmit = async (values: UpdatePasswordSchema) => {

        try {

            // Set the loading state to true while processing the request
            setIsLoading(true);

            // Get the user session token from local storage
            const token: string | null = localStorage.getItem('token');

            // If there is no token the user is not logged in, so update the auth state accordingly
            if(!token) logout();

            // Attempt to change the user's password
            const response: AxiosResponse<any, any> = await axios.patch('/api/user/update-password', values, { headers: { Authorization: `Bearer ${token}` } });

            // Set the response code and server message
            setServerResponseCode(response.data.code);
            setServerResponseMessage(response.data.message);

            // Get new user data
            props.fetchUserData();

        }

        catch(error) {

            if(axios.isAxiosError(error) && error.response) {

                // Set the error message from the error response
                setServerResponseMessage(error.response.data.message);
                
                // Set the error code returned
                setServerResponseCode(error.response.data.code);

                // If the response if a expired/unauthroized user update the auth state accordingly
                if(error.response.data.code === 401 && error.response.data.message !== 'Current password incorrect') logout();

            }

            else {

                // Set a general error messge
                setServerResponseMessage('An unexpected error occured');
                setServerResponseCode(500);

            }

        }

        finally {

            // Reset the loading state when request is finished
            setIsLoading(false);

            // Set show alert to true to show server response
            setShowAlert(true);

        }

    };

    // Auto dismiss the server alert after 5 seconds
    useEffect(() => {

        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 5000);
            return () => clearTimeout(timer);
        }

    }, [showAlert]);

    
    return (

        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>

            <Box sx={{ mb: 2 }}>
                { showAlert && <Alert severity={serverResponseCode === 200 ? 'success' : 'error'}>{serverResponseMessage}</Alert> }
            </Box>

           {/* Form Title */}
           <Typography variant="h5" component="h2" gutterBottom>Update Password</Typography>

           {/* Show any server error messages */}

           
           <Grid container spacing={2}>

                {/* Current Password Input */}
                <Grid item xs={12} md={4}>

                    <Controller control={control} name='current_password' render={({field}) => (

                        <TextField 
                            {...field}
                            required
                            fullWidth
                            id='current_password'
                            name='current_password'
                            label='Current Password'
                            autoComplete='current_password'
                            error={!!errors.current_password}
                            helperText={errors.current_password?.message}
                            type={showCurrentPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle confirm password visibility"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            edge="end"
                                        >
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

                    <Controller control={control} name='new_password' render={({field}) => (

                        <TextField 
                            {...field}
                            required
                            fullWidth
                            id='new_password'
                            name='new_password'
                            label='New Password'
                            autoComplete='new_password'
                            error={!!errors.new_password}
                            helperText={errors.new_password?.message}
                            type={showNewPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle confirm password visibility"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            edge="end"
                                        >
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

                    <Controller control={control} name='confirm_password' render={({field}) => (

                        <TextField 
                            {...field}
                            required
                            fullWidth
                            id='confirm_password'
                            name='confirm_password'
                            label='Confirm Password'
                            autoComplete='confirm_password'
                            error={!!errors.confirm_password}
                            helperText={errors.confirm_password?.message}
                            type={showConfirmPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle confirm password visibility"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

                {/* Update Password Button */}
                <Grid item xs={12}>

                    <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, mt: 2 }}>
                        
                        <Button type="submit" variant="contained" sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: 200 }} disabled={!isValid || isLoading}>Update Password</Button>

                    </Box> 

                </Grid>

           </Grid>


        </Box>

    );

}