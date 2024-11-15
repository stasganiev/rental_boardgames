import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Синий цвет по умолчанию
    },
    secondary: {
      main: '#f50057', // Розовый цвет по умолчанию
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial',
  },
});

export default theme;
