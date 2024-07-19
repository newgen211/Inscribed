import { Box, Card, CardContent, Typography, Avatar, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface UserCardProps {
  userInfo: any
}

export default function UserCard({ userInfo }: UserCardProps) {

  /* Get user's initials */
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };


  return (

    <Card>
      <CardContent>
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

              <IconButton size="small" sx={{ ml: 1 }}>
                <EditIcon fontSize="small" />
              </IconButton>

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