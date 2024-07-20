import { Avatar, Box, Button, Grid, IconButton, Paper, Typography } from '@mui/material';
import { IUserInfo } from '../../../../pages/Dashboard';
import { Edit } from "@mui/icons-material";
import EditBio from '../modals/EditBio';
import { useState } from 'react';

/* Define types and interfaces */
interface IUserProfileProps {
    userInfo         : IUserInfo;
    getInitals       : (first_name: string, last_name: string) => string;
    fetchUserData    : () => void;
};

export default function UserProfile(props: IUserProfileProps) {

    /* Define State Variables */
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

    return (
        
        <Paper elevation={3}>

            <Box sx={{ maxWidth: 600, p: { xs: 2, sm: 4 }, mx: 'auto' }}>
            
                {/* Show User Avatar and Username */}
                <Box display='flex' alignItems='center' gap={2} mb={2}>

                    <Avatar>{props.getInitals(props.userInfo.first_name, props.userInfo.last_name)}</Avatar>
                    <Typography variant='h5' component='h2'>{props.userInfo.username}</Typography>

                </Box>

                {/* Show following and follower counts */}
                <Grid container spacing={2} mb={2}>

                    {/* Followers Count */}
                    <Grid item xs={6}>

                        <Button variant='outlined' fullWidth sx={{ height: '100%', flexDirection: 'column', p: 1 }}>
                            <Typography variant='h6' component='div'>{props.userInfo.follower_count}</Typography>
                            <Typography variant='body2' component='div'>Followers</Typography>
                        </Button>

                    </Grid>

                    {/* Following Count */}
                    <Grid item xs={6}>

                        <Button variant='outlined' fullWidth sx={{ height: '100%', flexDirection: 'column', p: 1 }}>
                            <Typography variant='h6' component='div'>{props.userInfo.following_count}</Typography>
                            <Typography variant='body2' component='div'>Following</Typography>
                        </Button>

                    </Grid>

                </Grid>

                {/* Show the user bio */}
                <Box sx={{ mt: 2 }}>

                    <Grid container alignItems="center">

                    <Grid item>
                    
                        <Typography variant="body2" color="textSecondary">User Bio:</Typography>

                    </Grid>

                    <Grid item>

                        <IconButton size="small" sx={{ ml: 1 }} onClick={() => setEditModalOpen(true)}>
                            <Edit fontSize="small" />
                        </IconButton>

                        {/* Edit Bio Dialog Modal */}
                        <EditBio userInfo={props.userInfo} editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} fetchUserData={props.fetchUserData} />

                    </Grid>

                    </Grid>

                    <Typography variant="body1" sx={{ mt: 1 }}>
                        { props.userInfo.bio || 'No bio avaliable' }
                    </Typography>

                </Box>

            </Box>
            
        </Paper>

    );

}