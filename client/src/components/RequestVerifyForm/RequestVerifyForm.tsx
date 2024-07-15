import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link as ReactRouterDomLink, useNavigate } from 'react-router-dom';
import { RequestVerifySchema, requestVerifySchema } from './schema';
import axios from 'axios';
import { APIResponse } from '../../types/response/APIResponse';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';


export default function RequestVerifyForm() {

    /* Page Navigtor */
    const navigate = useNavigate();

    /* Server Error State */
    const [serverErrorMessage, setServerErrorMessage] = useState('');
    
    /* Loading state */
    const [isLoading, setLoading] = useState(false);

    /* Form handler */

    const { handleSubmit, control, formState: { errors, isValid }, setError } = useForm({
        mode: 'all',
        defaultValues: { email: '' },
        resolver: zodResolver(requestVerifySchema),   
    });

    const handleLoginSubmit = useCallback( async(values: RequestVerifySchema) => {
        
        setLoading(true);

        try {

            await axios.post('/api/auth/request-verify-email', values);
            navigate('/verify-email-sent');

        }
        catch(error) {

            if(axios.isAxiosError(error) && error.response) {

                const response: APIResponse = error.response.data;
                
                setServerErrorMessage(response.message);

            }

        }
        finally {
            setLoading(false);
        }

    }, []);

    return (

        <Container component='main' maxWidth='xs'>

            
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* Title */}

                <Typography component='h1' variant='h6'>Request Verify Email</Typography>
                
                {/* Display server error message */}
                {serverErrorMessage && (
                    <Alert severity="error" sx={{ width: '100%', my: 2 }}>
                        {serverErrorMessage}
                    </Alert>
                )}

                {/* Login Form */}
                <Box component='form' onSubmit={handleSubmit(handleLoginSubmit)} noValidate sx={{ mt: 1 }}>

                    <Controller
                        name='email'
                        control={control}
                        render={({field}) => (

                            <TextField
                                {...field}
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                autoComplete="email"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                sx={{ mb:2 }}
                            />

                        )}
                    />

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{my: 2}}
                        disabled={!isValid || isLoading}
                    >
                        Make Request
                    </Button>

                    <Grid container>


                        <Grid item>
                            <Link component={ReactRouterDomLink} to='/' variant='body2'>
                                Back to Login
                            </Link>
                        </Grid>

                    </Grid>

                </Box>

            </Box>

        </Container>

    );

}