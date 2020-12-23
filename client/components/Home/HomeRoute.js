import React, {useContext} from "react";

import {Redirect, Route} from "react-router-dom";

import {Box, Grid, Paper} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";

import SideBar from "../UI/SideBar";

import {AuthContext} from "../Router";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(5)
    },
    fancyBox: {
        height: "100%",
        [theme.breakpoints.up('xs')]: {
            padding: theme.spacing(3)
        },
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
            paddingRight: theme.spacing(3)
        }
    },
}));

const HomeRoute = props =>
{
    const classes = useStyles();

    return (
        <PrivateRoute {...props}>
            <Box height={"100vh"}>
                <Grid container style={{height: "100%"}}>
                    <Grid item sm={12} md={6} lg={4} style={{height: "100%"}}>
                        <SideBar {...props}/>
                    </Grid>
                    <Grid item sm={12} md={6} lg={8} style={{height: "100%"}}>
                        <Box className={classes.fancyBox}>
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
