import React from 'react';

/* Theming */
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { darkTheme } from '../assets/themes/dark';
import { lightTheme } from '../assets/themes/light';

/* Routes */
import Routes from './routes';

/* Provider's */
import { SnackbarProvider } from 'notistack';

/* Context's */
import { AuthProvider } from './contexts/authContext';
import { AdminProvider } from './contexts/adminContext';
import { ThemeContext } from './contexts/themeContext';

/* Hook's */
import usePersistedState from './utils/usePersistedState';
import HandleAppUpdate from './utils/HandleAppUpdate';

export default function App() {
  const [theme_type, setTheme] = usePersistedState('theme_type', darkTheme);
  const theme = createMuiTheme(theme_type);
  const toggleTheme = () => {
    setTheme(theme_type === darkTheme ? lightTheme : darkTheme);
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={10} preventDuplicate={true}>
          {/*<HandleAppUpdate />*/}
          <AuthProvider>
            <AdminProvider>
              <Routes/>
            </AdminProvider>
          </AuthProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}