import React, {useState} from "react";

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";

import { SnackbarProvider, useSnackbar } from 'notistack';

import Layout from "./Layout";

const LoadApp = props =>
{
    const { enqueueSnackbar } = useSnackbar();
    const produceSnackBar = (message, variant="error") => enqueueSnackbar(message, { variant: variant });

    return <Layout produceSnackBar={produceSnackBar} {...props}/>;
};

const App = () =>
{
    const [darkMode, setDarkMode] = useState(useMediaQuery('(prefers-color-scheme: dark)'));

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: darkMode ? 'dark' : 'light',
                },
            }),
        [darkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3} preventDuplicate>
                <LoadApp darkMode={darkMode} setDarkMode={setDarkMode}/>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
