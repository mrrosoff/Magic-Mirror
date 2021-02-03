import React from "react";

import {CssBaseline} from "@material-ui/core";
import {blue, blueGrey, green, grey} from "@material-ui/core/colors";

import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

import { SnackbarProvider, useSnackbar } from 'notistack';

import Router from "./Router";

const LoadApp = props =>
{
    const { enqueueSnackbar } = useSnackbar();
    const produceSnackBar = (message, variant="error") => enqueueSnackbar(message, { variant: variant });

    return <Router produceSnackBar={produceSnackBar} {...props}/>;
};

const App = () =>
{
    let theme = createMuiTheme({
        palette: {
            type: 'light',
            primary: { main: green[500] },
            secondary: { main: blueGrey[500] }
        },
    });
    theme = responsiveFontSizes(theme);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3} preventDuplicate>
                <LoadApp />
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
