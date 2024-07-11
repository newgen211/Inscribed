import { createTheme} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
        light: '#ffffff',
        main: '#000000',
        dark: '#000000',
        contrastText: '#000',
    },
    secondary: {
      light: '#ECFDF5',
      main: '#BBF7D0',
      dark: '#A5F3FC',
      contrastText: '#000',
    },
  },
});

export default theme;
