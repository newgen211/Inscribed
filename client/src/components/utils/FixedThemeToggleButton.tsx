import React from 'react';
import { Fab } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useCustomTheme } from '../../hooks/useCustomContext';

const FixedThemeToggleButton = () => {
  const { toggleTheme, theme } = useCustomTheme();

  return (
    <Fab
      color="primary"
      aria-label="toggle theme"
      onClick={toggleTheme}
      style={{ position: 'fixed', bottom: 16, right: 16 }}
    >
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </Fab>
  );
};

export default FixedThemeToggleButton;