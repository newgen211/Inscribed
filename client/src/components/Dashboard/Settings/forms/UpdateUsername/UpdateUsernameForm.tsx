import { useState } from 'react';
import { useAuth } from '../../../../../hooks/useAuth';
import { UpdateUsernameSchema } from './schema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosResponse } from 'axios';
import { APIResponse } from '../../../../../types/APIResponse';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { ISettingsProps } from '../../Settings';


const UpdateUsernameForm: React.FC<ISettingsProps> = (props) => {

    /* Define local state */
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /* Get the logout function from the global auth state */
    const { logout } = useAuth();

    /* React Hook Form Configuration */
    const { handleSubmit, control, formState: { errors, isValid }, setError } = useForm<UpdateUsernameSchema>({
        mode: 'all',
        defaultValues: { username: props.userData.username },
        resolver: zodResolver(UpdateUsernameSchema),
    });

    /* Handle Username form submit */
    const handleFormSubmit = async (values: UpdateUsernameSchema) => {

        try {

            // Set the loading state to true while processing the request
            setIsLoading(true);

            // Get the user session token from local storage
            const token: string | null = localStorage.getItem('token');

            // If there is no token the user is not logged in, so update the auth state accordingly
            if(!token) logout();

            // Attempt to change the user's username
            const response: AxiosResponse<APIResponse> = await axios.patch('/api/user/update-username', values, { headers: { Authorization: `Bearer ${token}` } });

            // Set the response code and server message
            props.setServerResponseCode(response.data.code);
            props.setServerResponseMessage(response.data.message);

            // Get the new user data
            props.fetchUserData();
        }

        catch(error) {

            if(axios.isAxiosError(error) && error.response) {

                // Set the error message from the error response
                props.setServerResponseMessage(error.response.data.message);
                
                // Set the error code returned
                props.setServerResponseCode(error.response.data.code);

                // If the response if a expired/unauthroized user update the auth state accordingly
                if(error.response.data.code === 401) logout();

            }

            else {

                // Set a general error messge
                props.setServerResponseMessage('An unexpected error occured');
                props.setServerResponseCode(500);

            }

        }

        finally {

            // Reset the loading state when request is finished
            setIsLoading(false);

            // Set show alert to true to show server response
            props.setShowAlert(true);

        }

    };

    return (

        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>

           {/* Form Title */}
           <Typography variant="h5" component="h2" gutterBottom>Update Name</Typography>

           {/* Show any server error messages */}

           
           <Grid container spacing={2}>

                {/* Username Input */}
                <Grid item xs={12} md={4}>

                    <Controller control={control} name='username' render={({field}) => (

                        <TextField 
                            {...field}
                            required
                            fullWidth
                            id='username'
                            name='username'
                            label='Username'
                            error={!!errors.username}
                            helperText={errors.username?.message}
                            placeholder={props.userData.username}
                        />

                        )}  
                        
                    />

                </Grid>


                {/* Update Username Button */}
                <Grid item xs={12}>

                    <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, mt: 2 }}>
                        
                        <Button type="submit" variant="contained" sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: 200 }} disabled={!isValid || isLoading}>Update Username</Button>

                    </Box> 

                </Grid>

           </Grid>


        </Box>

    );

}

export default UpdateUsernameForm;