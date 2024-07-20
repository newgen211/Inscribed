import { AppBar, Toolbar, Box } from '@mui/material';
import { Air } from '@mui/icons-material';

export default function MobileTopAppbar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Air fontSize="large" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}