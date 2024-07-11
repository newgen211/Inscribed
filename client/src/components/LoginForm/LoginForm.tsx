import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, Link, InputAdornment, IconButton } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, loginSchema } from './schema';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginForm: React.FC = () => {

    /* Show password */
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(!showPassword);

    /* Loading state */
    const [isLoading, setLoading] = useState(false);

    /* Form handler */

    const { handleSubmit, control, formState: { errors, isValid }, setError } = useForm({
        mode: 'all',
        defaultValues: { username: '', password: '' },
        resolver: zodResolver(loginSchema),   
    });

    const handleLoginSubmit = useCallback( async(values: LoginSchema) => {
        
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
                {/* Icon and Title */}
                <Avatar
                    sx={{
                        m: 1,
                        bgcolor: 'secondary.main'
                    }}
                >
                    <AlternateEmailIcon />
                </Avatar>

                <Typography component='h1' variant='h5'>Sign In</Typography>
                
                {/* Login Form */}
                <Box component='form' noValidate sx={{ mt: 1 }}>

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
                                sx={{ mb:2 }}
                            />

                        )}
                    />

                    
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
                                sx={{ mb:2 }}
                            />

                        )}
                    />


                    <FormControlLabel 
                        control={<Checkbox value='remeber' color='primary' />}
                        label='Remeber Me'
                    />

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

                        <Grid item xs>
                            <Link component={ReactRouterDomLink} to='/forgot-password' variant='body2'>
                                Forgot Password?
                            </Link>
                        </Grid>

                        <Grid item>
                            <Link component={ReactRouterDomLink} to='/sign-up' variant='body2'>
                                    Dont't have an account? Sign Up
                            </Link>
                        </Grid>

                    </Grid>

                </Box>

            </Box>

        </Container>

    );

};

export default LoginForm;