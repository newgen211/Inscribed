import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Copyright from '../components/Copyright';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import { z, ZodError } from 'zod';
import axios from 'axios';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';

// Define RegisterSchema
const RegisterSchema = z.object({

    first_name: z.string().trim()
        .min(1, { message: 'First name is required'} )
        .max(50, { message: 'First name cannot exceed 50 characters in length' })
        .regex(/^[a-zA-Z\s'-]+$/, { message: 'First name can only contain letters, spaces, hypens, and apostrophes' })
        .transform((name) => name.replace(/\s+/g, ' '))
        .transform((name) => name.charAt(0).toUpperCase() + name.slice(1))
        .refine((name) => name.trim().length > 0, { message: 'First name cannot be just whitespace' }),

    last_name: z.string().trim()
        .min(1, { message: 'Last name is required'} )
        .max(50, { message: 'Last name cannot exceed 50 characters in length' })
        .regex(/^[a-zA-Z\s'-]+$/, { message: 'Last name can only contain letters, spaces, hypens, and apostrophes' })
        .transform((name) => name.replace(/\s+/g, ' '))
        .transform((name) => name.charAt(0).toUpperCase() + name.slice(1))
        .refine((name) => name.trim().length > 0, { message: 'Last name cannot be just whitespace' }),
    
    username: z.string().trim()
        .min(1, { message: 'Username required' })
        .max(50, { message: 'Username cannot exceed 50 characters in length' })
        .regex(/^[a-zA-Z][a-zA-Z0-9-_]{0,49}$/, { message: 'Username must start with a letter and can only contain letters, numbers, hypens, and underscores' })
        .refine((name) => name.trim().length > 0, { message: 'Username cannot be just whitespace' }),

    email: z.string().trim()
        .min(1, { message: 'Email address is required' })
        .max(255, { message: 'Email address cannot exceed 50 characters in length' })
        .email({ message: 'Invalid email address' }),

    password: z.string().trim()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(64, { message: 'Password cannot exceed 64 characters in length' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&_-]{8,}$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' }),

    confirm_password: z.string().trim()
        .min(8, { message: 'Confirm password must be at least 8 characters long' })
        .max(64, { message: 'Confirm password cannot exceed 64 characters in length' }),

});


type RegisterSchema = z.infer<typeof RegisterSchema>;


const SignupPage: React.FC = () => {

    /* State for input fields */
    const [registerFormData, setRegisterFormData] = useState<RegisterSchema>({ first_name : '', last_name : '', username : '', email : '', password : '', confirm_password : '' });

    /* State to keep track of fields the user has interacted with */
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({ first_name: false, last_name: false, username: false, email: false, password: false, confirm_password: false });

    /* State to hold client/server side validation errors */
    const [errors, setErrors] = useState<z.ZodIssue[]>([]);

    /* Function to validate a individual field */
    const validateField = (name: keyof RegisterSchema, value: string) => {
        
        const fieldSchema = z.object({ [name]: RegisterSchema.shape[name] });

        try {

            fieldSchema.parse({ [name]: value });
            setErrors(errors.filter(error => error.path[0] !== name));

        } catch (error) {

            if (error instanceof ZodError) {

                setErrors([
                    ...errors.filter(err => err.path[0] !== name),
                    ...error.issues,
                ]);

            }
        }
    };

    /* Function to handle input change */
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setRegisterFormData({ ...registerFormData, [name]: value });
        validateField(name as keyof RegisterSchema, value);
    };

    /* Function to handle Input Blur */
    const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = event.target;
        setTouched({ ...touched, [name]: true });
        validateField(name as keyof RegisterSchema, value);

    };

    /* Function to get a error message given a field name */
    const getErrorMessage = ( field: keyof RegisterSchema ): string => {

        if(!touched[field]) return '';

        const error = errors.find(err => err.path[0] === field);

        return error ? error.message : '';

    };

    /* Handle the form submit */
    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {

        // Prevent the page from reloading when the form is submit
        event.preventDefault();

        // Mark all fields as touched to trigger all error messages if any
        setTouched({
            first_name: true,
            last_name: true,
            username: true,
            email: true,
            password: true,
            confirm_password: true
        });

        try {

            // Run the form input through the validation schema. This will throw a error if there are any validation errors.
            RegisterSchema.parse(registerFormData);

            // Make a api call to register a new user
            const response = await axios.post('http://localhost:5000/api/auth/register', registerFormData);

            // log the response
            //console.log(response.data);


        }
        catch(error) {

            if(error instanceof ZodError) {
                setErrors(error.issues);
            }

            if(axios.isAxiosError(error)) {
                
                if (error.response?.data.errors) {
                    // Update state with server-side validation errors
                    setErrors(error.response.data.errors.map((err: any) => ({
                        path: [err.field],
                        message: err.message
                    })));
                } else {
                    console.error(error);
                }

            }

        }

    };

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
                <Box component='form' onSubmit={handleSubmit} noValidate sx={{mt: 3}}>

                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6}>

                            <TextField 
                                required
                                fullWidth
                                id='first_name'
                                label='First Name'
                                name='first_name'
                                autoComplete="given-name"
                                value={registerFormData.first_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error ={!!getErrorMessage('first_name')}
                                helperText = {getErrorMessage('first_name')}
                                autoFocus
                            />

                        </Grid>

                        <Grid item xs={12} sm={6}>

                            <TextField 
                                required
                                fullWidth
                                id='last_name'
                                label='Last Name'
                                name='last_name'
                                value={registerFormData.last_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!getErrorMessage('last_name')}
                                helperText={getErrorMessage('last_name')}
                                autoComplete="family-name"
                            />

                        </Grid>

                        <Grid item xs={12}>

                            <TextField 
                                required
                                fullWidth
                                id='username'
                                label='Username'
                                name='username'
                                value={registerFormData.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!getErrorMessage('username')}
                                helperText={getErrorMessage('username')}
                                autoComplete="username"
                            />

                        </Grid>

                        <Grid item xs={12}>

                            <TextField 
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                autoComplete="email"
                                type='email'
                                value={registerFormData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!getErrorMessage('email')}
                                helperText={getErrorMessage('email')}
                                
                            />

                        </Grid>

                        <Grid item xs={12}>

                            <TextField 
                                required
                                fullWidth
                                id='password'
                                label='Password'
                                name='password'
                                autoComplete="password"
                                type='password'
                                value={registerFormData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!getErrorMessage('password')}
                                helperText={getErrorMessage('password')}
                                
                            />

                        </Grid>

                        <Grid item xs={12}>

                            <TextField 
                                margin='normal'
                                required
                                fullWidth
                                id='confirm_password'
                                label='Confirm Password'
                                name='confirm_password'
                                autoComplete="confirm_password"
                                type='password'
                                value={registerFormData.confirm_password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!getErrorMessage('confirm_password')}
                                helperText={getErrorMessage('confirm_password')}
                            />

                        </Grid>

                    </Grid>

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{my: 2}}
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

                {/* Copyright Component */}
                <Copyright 
                sx={{
                    mt: 5,
                    mb: 4
                }}
            />

            </Box>

        </Container>

    );

}

export default SignupPage;