import { Typography, Link, Container } from '@mui/material';
import { Link as ReactRouterDomLink } from 'react-router-dom';

export default function Copyright(props: any) {

    return (

        <Container>
            
            <Typography
                variant='body2'
                color='text.secondary'
                align='center'
                {...props}
            >
                {'Copyright © '}
                <Link component={ReactRouterDomLink} to='/' variant='body2'>
                    Inscribed
                </Link>{' '}
                {new Date().getFullYear()}
            </Typography>

        </Container>

    );

}