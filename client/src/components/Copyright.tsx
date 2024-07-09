import { Typography, Link } from '@mui/material';
import { Link as ReactRouterDomLink } from 'react-router-dom';

export default function Copyright(props: any) {

    return (

        <Typography
            variant='body2'
            color='text.secondary'
            align='center'
            { ...props }
        >
            { 'Copywrite © ' }
            <Link component={ReactRouterDomLink} to='/' variant='body2'>
                Inscribed
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>

    );

}