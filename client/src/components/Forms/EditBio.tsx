import { Alert, Box, Button, Modal, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';


{/* Register Zod Schema */}
const UpdateBioSchema = z.object({

    bio: z.string()
    .max(255, { message: 'Bio cannot exceed 255 characters' })

});

type UpdateBioSchema = z.infer<typeof UpdateBioSchema>;

interface EditBioProps {
    editBio: boolean;
    setEditBio: (editBio: boolean) => void;
    fetchUserInfo: () => void;
};

// Define the modal style
const modalStyle = (isSmallScreen: boolean) => ({
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isSmallScreen ? '90%' : 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
});

export default function EditBio({editBio, setEditBio, fetchUserInfo}: EditBioProps) {

    /* Define state */
    const [serverResponseMessage, setServerResponseMessage] = useState('');         // Holds server error messages
    const [isLoading, setIsLoading] = useState(false);                              // Disables the register button while form is handling a submit
    const [serverResponseCode, setServerResponseCode] = useState(0);                // State to track server response code
    const [showAlert, setShowAlert] = useState(false);

    /* Get the logout from authState */
    const { logout } = useAuth();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    /* Handle edit bio close */
    const closeModal = () => {
        setEditBio(false);
    };

    {/* React Hook Form Configuration */}
    const { handleSubmit, control, formState: { errors, isValid }, setError } = useForm({
        mode: 'all',
        defaultValues: {
            bio: ''
        },
        resolver: zodResolver(UpdateBioSchema),   
    });

    /*  Handle Bio Update */
    const handleUpdateBioSubmit = useCallback( async (values: UpdateBioSchema) => {

        try {

            // Set the loading state to be true while processing request
            setIsLoading(true);

            // Get the user's session token from local storage
            const token = localStorage.getItem('token');

            // If there is no session token update the global auth state to logged out
            if(!token) {
                logout();
            }

            // Attempt to make a bio update by calling the bio update api
            const response = await axios.patch('/api/user/update-bio', values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Set the response state
            setServerResponseCode(response.data.code);
            setServerResponseMessage(response.data.message);
            setShowAlert(true);

            // Trigger bio update callback
            fetchUserInfo();

        }
        
        catch(error) {

            if(axios.isAxiosError(error) && error.response) {

                // Set the error response state
                setServerResponseCode(error.response.data.code);
                setServerResponseMessage(error.response.data.message);
                setShowAlert(true);

            }

        }

        finally {

            // Reset the loading state when done processing
            setIsLoading(false);

        }

    },[]);

    /* Auto-dismiss alert after 5 seconds */
    useEffect(() => {

        if (showAlert) {

            const timer = setTimeout(() => setShowAlert(false), 5000);
            return () => clearTimeout(timer);

        }

    }, [showAlert]);

    return (

        <Modal
            open={editBio}
            onClose={closeModal}
            aria-labelledby="edit-bio-modal-title"
            aria-describedby="edit-bio-modal-description"
        >

            <Box component="form" onSubmit={handleSubmit(handleUpdateBioSubmit)} sx={modalStyle(isSmallScreen)}>

                {showAlert && (
                    <Alert severity={serverResponseCode === 200 ? 'success' : 'error'}>
                        {serverResponseMessage}
                    </Alert>
                )}

                <Typography id="edit-bio-modal-title" variant="h6" component="h2">
                    Edit Bio
                </Typography>

                <Controller 
                    control={control}
                    name='bio'
                    render={({field}) => (

                        <TextField
                            {...field}
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                            variant="outlined"
                            label="Your Bio"
                            id="bio"
                            error={!!errors.bio}
                            helperText={errors.bio?.message}
                        />

                    )}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    
                    <Button onClick={closeModal} sx={{ mr: 2 }}>
                        Cancel
                    </Button>

                    <Button
                        type='submit'
                        variant='contained'
                        sx={{my: 2}}
                        disabled={!isValid || isLoading}
                    >
                        Update
                    </Button>

                </Box>

            </Box>

        </Modal>

    );

}