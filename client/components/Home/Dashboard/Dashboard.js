import React, {useEffect, useState} from "react";

import {Avatar, Box, Button, Divider, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";

import {makeStyles} from "@material-ui/core/styles";

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';

import AddIcon from '@material-ui/icons/Add';

import Image from "../../../static/images/carousel1.jpg";

const useStyles = makeStyles(theme => ({
	cardBox: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),

		borderWidth: 2,
		borderStyle: "solid",
		borderColor: grey[300],
		borderRadius: 5,
	}
}));

const DashBoard = props =>
{
	return (
		<Grid container spacing={5}>
			<Grid item>
				<WidgetCard title={"Administration"}/>
			</Grid>
			<Grid item>
				<WidgetCard title={"Weather"}/>
			</Grid>
			<Grid item>
				<WidgetCard title={"Tide"}/>
			</Grid>
			<Grid item>
				<WidgetCard title={"Surf"}/>
			</Grid>
		</Grid>

	);
}

const WidgetCard = props =>
{
	const classes = useStyles();
	return (
		<Box className={classes.cardBox}>
			<Grid container direction={"column"}>
				<Grid item>
					<Grid container
						  justify={"space-between"} alignItems={"center"} alignContent={"center"}
					>
						<Grid item>
							<Box width={75} height={5} bgcolor={"primary.main"}/>
						</Grid>
						<Grid item>
							<IconButton>
								<MoreHorizIcon />
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid container direction={"column"} spacing={4}>
						<Grid item>
							<Typography variant={"h6"}>{props.title}</Typography>
						</Grid>
						<Grid item>
							{props.children}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}

export default DashBoard;
