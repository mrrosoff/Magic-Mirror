import React, {forwardRef, useEffect, useState} from "react";

import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Button, Box, CssBaseline, Divider, Drawer, Grid, IconButton, Paper, Toolbar, Typography } from "@material-ui/core";

import MaterialTable from "material-table";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Menu from '@material-ui/icons/Menu';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

import {sendGetRequest, sendPostRequest} from "../../hooks/api";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: { display: 'flex' },
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: { marginRight: theme.spacing(2) },
	hide: { display: 'none' },
	drawer: { width: drawerWidth, flexShrink: 0 },
	drawerPaper: { width: drawerWidth },
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}));

const GarageScreen = props =>
{
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = useState(false);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {[classes.appBarShift]: open})}
			>
				<Toolbar>
					<IconButton
						color="inherit" edge="start"
						onClick={() => setOpen(true)}
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<Menu />
					</IconButton>
					<Typography variant={"h6"} noWrap>The Rosoff Club</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent" anchor="left"
				open={open}
				classes={{paper: classes.drawerPaper,}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={() => setOpen(false)}>
						{theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
					</IconButton>
				</div>
				<Divider />
			</Drawer>
			<main className={clsx(classes.content, {[classes.contentShift]: open})}>
				<div className={classes.drawerHeader} />
				<GarageScreenLayout {...props}/>
			</main>
		</div>
	);
};

const GarageScreenLayout = props =>
{
	const [delMarWeatherData, setDelMarWeatherData] = useState();

	useEffect(() =>
	{
		const getClosestTime = data => data.hours.find(element => new Date() < new Date(element.time));

		sendPostRequest("getLatLngWeatherStats", {lat: "32.9546027", lng: "-117.2719195"})
		.then(res => setDelMarWeatherData(getClosestTime(res.data)));
	}, []);

	return (
		<Box pl={1} pr={1}>
			<Grid
				container justify={"center"} alignContent={"center"} alignItems={"center"}
				spacing={6} style={{height: "90vh"}}
			>
				<Grid item xs={12} sm={4}>
					<GarageOpener {...props}/>
				</Grid>
				<Divider orientation="vertical" flexItem style={{height: '90%'}}/>
				<Grid
					item xs={12} sm={8}
					container justify={"center"} alignContent={"center"} alignItems={"center"} spacing={2}
				>
					<Grid item style={{width: '100%'}}>
						<MaterialTable
							title="Weather"
							icons={tableIcons}
							options={{
								search: false,
								pageSizeOptions: []
							}}
							columns={[{ title: "Key", field: "key" }, { title: "Value", field: "value" }]}
							data={delMarWeatherData ? Object.entries(delMarWeatherData).map(([key, value]) =>
							{
								return { key: key, value: value.noaa || value.noaa === 0 ? value.noaa : value.meto || value.meto === 0 ? value.meto : value};
							}) : []}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	)
};

const GarageOpener = props =>
{
	const [garageState, setGarageState] = useState();

	useEffect(() =>
	{
		sendGetRequest("getGarageState").then(res => setGarageState(res.data));
	}, []);

	return(
		<Grid container direction={"column"} justify={"center"} alignContent={"center"} alignItems={"center"} spacing={6}>
			<Grid item>
				<Button color={"primary"} variant={"contained"} size={"large"} style={{width: '100%', height: 400}}
						onClick={() =>
						{
							sendPostRequest("garageSwitch", {percentClosed: 100})
							.then(res => setGarageState(res.data));
						}}
				>
					<Typography color={"inherit"} variant={"h3"}>
						{garageState && garageState.nextDirection === "Up" ? "Open Garage" : "Close Garage"}
					</Typography>
				</Button>
			</Grid>
			<Grid
				item
				container justify={"center"} alignContent={"center"} alignItems={"center"} spacing={4}
			>
				<Grid item>
					<Button color={"primary"} variant={"contained"} size={"large"}
							disabled={garageState && garageState.nextDirection === "Up"}
							onClick={() =>
							{
								sendPostRequest("garageSwitch", {percentClosed: 90})
								.then(res => setGarageState(res.data));
							}}
					>
						<Typography color={"inherit"} variant={"h5"}>Close Garage 90%</Typography>
					</Button>
				</Grid>
			</Grid>
		</Grid>
	)
};

export default GarageScreen;
