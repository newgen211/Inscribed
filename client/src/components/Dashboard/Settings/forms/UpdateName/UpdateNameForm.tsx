import { useState } from 'react';
import { useAuth } from '../../../../../hooks/useAuth';
import { UpdateNameSchema } from './schema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosResponse } from 'axios';
import { APIResponse } from '../../../../../types/APIResponse';
import { Alert, Box, Button, Grid, TextField, Typography } from '@mui/material';
import { ISettingsProps } from '../../Settings';


const UpdateNameForm: React.FC<ISettingsProps> = (props) => {

    /* Define local state */
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /* Get the logout function from the global auth state */
    const { logout } = useAuth();

    /* React Hook Form Configuration */
    const { handleSubmit, control, formState: { errors, isValid }, setError } = useForm<UpdateNameSchema>({
        mode: 'all',
        defaultValues: { first_name: props.userData.first_name, last_name: props.userData.last_name },
        resolver: zodResolver(UpdateNameSchema),
    });

    /* Handle Name Change Form Submit */
    const handleFormSubmit = async (values: UpdateNameSchema) => {

        try {

            // Set the loading state to true while processing the request
            setIsLoading(true);

            // Get the user session token from local storage
            const token: string | null = localStorage.getItem('token');

            // If there is no token the user is not logged in, so update the auth state accordingly
            if(!token) logout();

            // Attempt to change the user's name
            const response: AxiosResponse<APIResponse> = await axios.patch('/api/user/update-name', values, { headers: { Authorization: `Bearer ${token}` } });

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

                {/* First Name Input */}
                <Grid item xs={12} md={4}>

                    <Controller control={control} name='first_name' render={({field}) => (

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

                {/* Last Name Input */}
                <Grid item xs={12} md={4}>

                    <Controller control={control} name='last_name' render={({field}) => (

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

                {/* Update Password Button */}
                <Grid item xs={12}>

                    <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, mt: 2 }}>
                        
                        <Button type="submit" variant="contained" sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: 200 }} disabled={!isValid || isLoading}>Update Name</Button>

                    </Box> 

                </Grid>

           </Grid>


        </Box>

    );

}

export default UpdateNameForm;