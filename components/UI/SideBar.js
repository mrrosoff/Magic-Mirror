import React from "react";

import {Box, Button, Grid, IconButton, Paper, Typography} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import HomeIcon from '@material-ui/icons/Home';

import {post} from '../../hooks/useAPI';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(3)
	},
	garageIcon: {
		width: "80%",
		height: "80%"
	}
}));

const SideBar = props =>
{
	const classes = useStyles();

	return(
		<Box p={3} width={"100%"} height={"100%"}>
			<Paper style={{width: "100%", height: "100%"}} className={classes.paper}>
				<Grid container direction={"column"} spacing={1} style={{height: "100%"}}
					  justify={"center"} alignItems={"center"} alignContent={"center"}
				>
					<Grid item style={{width: "100%"}}>
						<IconButton
							style={{width: "100%"}}
							onClick={() => post("garageSwitch")}
						>
							<HomeIcon className={classes.garageIcon}/>
						</IconButton>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	)
}

export default SideBar;
