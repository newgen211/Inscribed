import { Box, Container, Link } from '@mui/material';
import Copyright from '../components/Copyright';
import LoginForm from '../components/LoginForm/LoginForm';
import { Link as ReactRouterDomLink, useNavigate } from 'react-router-dom';


export default function LoginPage() {

    return (

        <>

            <LoginForm />
            <Copyright sx={{ mt: 8, mb: 4 }} />

        </>

    );

}