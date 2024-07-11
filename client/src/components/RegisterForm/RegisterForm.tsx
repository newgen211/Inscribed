import {  Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { Link as ReactRouterDomLink, useNavigate } from 'react-router-dom';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useCallback, useState } from 'react';
import { registrationSchema, RegistrationSchema } from './schema';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { APIResponse } from '../../types/response/APIResponse';


const RegisterForm: React.FC = () => {

    /* Page Navigtor */
    const navigate = useNavigate();

    /* Show password */
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    /* Form handler */

    const [isLoading, setLoading] = useState(false);

    const { handleSubmit, control, formState: { errors, isValid }, setError } = useForm({
        mode: 'all',
        defaultValues: {
            first_name: '', last_name: '', username: '', email: '', password: '', confirm_password: '', terms: false
        },
        resolver: zodResolver(registrationSchema),   
    });

    /* Form Handler */
    const handleRegisterSubmit = useCallback( async (values: RegistrationSchema) => {

        setLoading(true);

        try {

            await axios.post("/api/auth/register", values);
            navigate('/');

            
        }
        catch(error) {

            if(axios.isAxiosError(error) && error.response) {

                const response: APIResponse = error.response.data;
                
                // Loop through all the server errors and add them to the form
                response.errors?.forEach(err => {
                    setError(err.field as keyof RegistrationSchema, { type: "manual", message: err.message });
                });

            }

        }
        finally {
            setLoading(false);
        }


    },[]);

    return (

        <Container component='main' maxWidth="xs">

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                {/* Icon and Title */}
                <Avatar
                    sx={{
                        m: 1,
                        bgcolor: 'secondary.main'
                    }}
                >
                    <AlternateEmailIcon />
                </Avatar>

                <Typography component='h1' variant='h5'>Sign Up</Typography>

                {/* Sign Up Form */}
                <Box component='form' onSubmit={handleSubmit(handleRegisterSubmit)} noValidate sx={{mt: 3}}>

                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6}>

                        <Controller
                                name='first_name'
                                control={control}
                                render={({ field }) => (
                                    <TextField 
                                        {...field}
                                        required
                                        fullWidth
                                        id='first_name'
                                        label='First Name'
                                        autoComplete="given-name"
                                        autoFocus
                                        error={!!errors.first_name}
                                        helperText={errors.first_name?.message}
                                    />
                                )}
                            />


                        </Grid>

                        <Grid item xs={12} sm={6}>

                        <Controller
                            name='last_name'
                            control={control}
                            render={({field}) => (

                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    id='last_name'
                                    label='Last Name'
                                    name='last_name'
                                    autoComplete="family_name"
                                    error={!!errors.last_name}
                                    helperText={errors.last_name?.message}
                                />

                            )}
                        />

                        </Grid>

                        <Grid item xs={12}>

                        <Controller
                                name='username'
                                control={control}
                                render={({field}) => (

                                    <TextField
                                        {...field}
                                        required
                                        fullWidth
                                        id='username'
                                        label='Username'
                                        name='username'
                                        autoComplete="username"
                                        error={!!errors.username}
                                        helperText={errors.username?.message}
                                    />

                                )}
                            />

                        </Grid>

                        <Grid item xs={12}>

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
                                    
                                />

                            )}
                        />

                        </Grid>

                        <Grid item xs={12}>

                        <Controller
                            name='password'
                            control={control}
                            render={({field}) => (

                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    id='password'
                                    label='Password'
                                    name='password'
                                    autoComplete="password"
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

                        </Grid>

                        <Grid item xs={12}>

                        <Controller
                            name='confirm_password'
                            control={control}
                            render={({field}) => (

                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    id='confirm_password'
                                    label='Confirm Password'
                                    name='confirm_password'
                                    autoComplete="confirm_password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    error={!!errors.confirm_password}
                                    helperText={errors.confirm_password?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle confirm password visibility"
                                                    onClick={toggleShowConfirmPassword}
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

                    </Grid>

                    <Controller
                        name='terms'
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} color="primary" />}
                                label="Accept Terms and Services"
                            />
                        )}
                    />
                    {errors.terms && (
                        <Typography variant="body2" color="error">
                            {errors.terms.message}
                        </Typography>
                    )}

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{my: 2}}
                        disabled={!isValid || isLoading}
                    >
                        Sign Up
                    </Button>

                    <Grid container>

                        <Grid item>
                            <Link component={ReactRouterDomLink} to='/' variant='body2'>
                                Already have an account? Sign In
                            </Link>
                        </Grid>

                    </Grid>

                </Box>

            </Box>

        </Container>

    );

}

export default RegisterForm;