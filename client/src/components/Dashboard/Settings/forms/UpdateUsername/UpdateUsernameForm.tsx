import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { UpdateUsernameSchema } from './schema';
import axios, { AxiosResponse } from 'axios';
import { Alert, Box, Button, Grid, TextField, Typography } from '@mui/material';

/* Defines types and interfaces */
interface IUpdateUsernameFormProps {
    fetchUserData    : () => void;
};

export default function UpdateUsernameForm(props: IUpdateUsernameFormProps) {

    /* Define State Variables */
    const [isLoading, setIsLoading]                         = useState<boolean>(false);
    const [serverResponseMessage, setServerResponseMessage] = useState<string>('');
    const [serverResponseCode, setServerResponseCode]       = useState<number>(0);
    const [showAlert, setShowAlert]                         = useState<boolean>(false);

    /* Get the logout function from the global auth state */
    const { logout } = useAuth();

    /* React Hook Form Configuration */
    const { handleSubmit, control, formState: { errors, isValid }, setError } = useForm<UpdateUsernameSchema>({
        mode: 'all',
        defaultValues: { username: '' },
        resolver: zodResolver(UpdateUsernameSchema),
    });

    /* Handle Username Form Submit */
    const handleFormSubmit = async (values: UpdateUsernameSchema) => {

        try {

            // Set the loading state to true while processing the request
            setIsLoading(true);

            // Get the user session token from local storage
            const token: string | null = localStorage.getItem('token');

            // If there is no token the user is not logged in, so update the auth state accordingly
            if(!token) logout();

            // Attempt to change the user's username
            const response: AxiosResponse<any, any> = await axios.patch('/api/user/update-username', values, { headers: { Authorization: `Bearer ${token}` } });

            // Set the response code and server message
            setServerResponseCode(response.data.code);
            setServerResponseMessage(response.data.message);

            // Get the new user data
            props.fetchUserData();

        }

        catch(error) {

            if(axios.isAxiosError(error) && error.response) {

                // Set the error message from the error response
                setServerResponseMessage(error.response.data.message);
                
                // Set the error code returned
                setServerResponseCode(error.response.data.code);

                // If the response if a expired/unauthroized user update the auth state accordingly
                if(error.response.data.code === 401) logout();

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

    /* Auto dismiss the server alert after 5 seconds */
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
           <Typography variant="h5" component="h2" gutterBottom>Update Username</Typography>

           {/* Show any server error messages */}

           
           <Grid container spacing={2}>

                {/* First Name Input */}
                <Grid item xs={12} md={4}>

                    <Controller control={control} name='username' render={({field}) => (

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

                {/* Update Password Button */}
                <Grid item xs={12}>

                    <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, mt: 2 }}>
                        
                        <Button type="submit" variant="contained" sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: 200 }} disabled={!isValid || isLoading}>Update Username</Button>

                    </Box> 

                </Grid>

           </Grid>


        </Box>

    );

}