import { Box, Card, CardContent, Typography, Avatar, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import EditBio from '../Forms/EditBio';

interface UserCardProps {
  userInfo: any,
  fetchUserInfo: () => void;
}

export default function UserCard({ userInfo, fetchUserInfo }: UserCardProps) {

  /* Define State */
  const [editBio, setEditBio] = useState<boolean>(false);

  /* Get user's initials */
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  /* Handle Edit Bio Modal Open */
  const handleEditBioModalOpen = () => setEditBio(true);

  return (

    <Card>
      <CardContent sx={{mx: 'auto', maxWidth: 500}}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar>{userInfo ? getInitials(userInfo.first_name, userInfo.last_name) : 'XX'}</Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h6">{userInfo ? userInfo.username : 'Loading'}</Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="body2" color="textSecondary">Following</Typography>
              <Typography variant="h6">{userInfo ? userInfo.following_count : '0'}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="textSecondary">Followers</Typography>
              <Typography variant="h6">{userInfo ? userInfo.follower_count : '0'}</Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 2 }}>

          <Grid container alignItems="center">

            <Grid item>
            
              <Typography variant="body2" color="textSecondary">User Bio:</Typography>

            </Grid>

            <Grid item>

              <IconButton size="small" sx={{ ml: 1 }} onClick={handleEditBioModalOpen}>
                <EditIcon fontSize="small" />
              </IconButton>

              <EditBio editBio={editBio} setEditBio={setEditBio} fetchUserInfo={fetchUserInfo} />

            </Grid>

          </Grid>

          <Typography variant="body1" sx={{ mt: 1 }}>
            {userInfo && userInfo.bio ? userInfo.bio : 'No bio available'}
          </Typography>

        </Box>

      </CardContent>
    </Card>

  );

}