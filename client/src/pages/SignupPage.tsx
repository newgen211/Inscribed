import { Link } from '@mui/material';
import Copyright from '../components/Copyright';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import { Link as ReactRouterDomLink, useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {

    return (

        <>

            <RegisterForm />
            <Copyright sx={{mt: 5}} />

        </>

    );

}

export default SignupPage;