import { createTheme } from '@mui/material';
declare module '@mui/material/styles' {
  interface PaletteColor {
    container?: string;
  }
  interface SimplePaletteColorOptions {
    container?: string;
  }
}
export const theme = createTheme({
  palette: {
    primary: {
      main: '#6750A4',
      container: '#EADDFF'
    }
  }
});