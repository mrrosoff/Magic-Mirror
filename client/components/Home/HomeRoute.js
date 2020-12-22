import React, {useContext} from "react";

import {Redirect, Route} from "react-router-dom";

import {Box, Grid, Paper} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";

import SideBar from "../UI/SideBar";

import {AuthContext} from "../Router";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(5)
    }
}));

const HomeRoute = props =>
{
    const classes = useStyles();

    return (
        <PrivateRoute {...props}>
            <Box height={"100vh"}>
                <Grid container style={{height: "100%"}}>
                    <Grid item style={{width: 250, height: "100%"}}>
                        <SideBar {...props}/>
                    </Grid>
                    <Grid item xs>
                        <Box pt={3} pb={3} pr={3} width={"100%"} height={"100%"}>
                            <Paper id={"wrappingPaper"} style={{width: "100%", height: "100%", overflow: "hidden"}} className={classes.root}>
                                {props.children}
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </PrivateRoute>
    );
};

const PrivateRoute = props => {

    let authData = useContext(AuthContext);

    return (
        <Route {...props}>
            { authData.loggedIn ? props.children : <Redirect to={{ pathname: "/", state: { from: props.location }}}/> }
        </Route>
    );
}


export default HomeRoute;
