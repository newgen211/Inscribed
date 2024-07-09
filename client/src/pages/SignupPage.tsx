import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Copyright from '../components/Copyright';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm/RegisterForm';


const SignupPage: React.FC = () => {

    return (

        <>

            <RegisterForm />
            <Copyright sx={{mt: 5}} />

        </>

    );

}

export default SignupPage;