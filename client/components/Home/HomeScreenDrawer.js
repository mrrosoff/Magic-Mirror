import React, {useState} from "react";

import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Checkbox, CssBaseline, Divider, Drawer, FormControl, FormControlLabel, FormGroup, Hidden, IconButton, Toolbar, Typography } from "@material-ui/core";

import {Menu} from "@material-ui/icons";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
	root: { display: 'flex' },
	appBar: { [theme.breakpoints.up('sm')]: { width: `calc(100% - ${drawerWidth}px)`, marginLeft: drawerWidth }},
	content: { flexGrow: 1, padding: theme.spacing(3) },
	drawer: { [theme.breakpoints.up('sm')]: { width: drawerWidth, flexShrink: 0 }},
	drawerPaper: { width: drawerWidth },
	menuButton: { marginRight: theme.spacing(2), [theme.breakpoints.up('sm')]: { display: 'none' }},
	toolbar: theme.mixins.toolbar
}));

const HomeScreenDrawer = props =>
{
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const [widgets, setWidgets] = useState({ admin: false, weather: false });
	const handleChange = (event) => setWidgets({ ...widgets, [event.target.name]: event.target.checked });

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={classes.appBar}
			>
				<Toolbar>
					<IconButton
						color="inherit" edge="start"
						onClick={() => setOpen(true)}
						className={classes.menuButton}
					>
						<Menu />
					</IconButton>
					<Typography variant={"h6"} noWrap>The Rosoff Club</Typography>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer}>
				<Hidden smUp implementation="css">
					<Drawer
						open={open} onClose={() => setOpen(!open)}
						variant="temporary"
						ModalProps={{keepMounted: true}}
					>
						<DrawerItems widgets={widgets} handleChange={handleChange} {...props} />
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						className={classes.drawer}
						classes={{paper: classes.drawerPaper}}
						variant="permanent" anchor="left" open
					>
						<DrawerItems widgets={widgets} handleChange={handleChange} {...props} />
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{React.cloneElement(props.children, {widgets: widgets})}
			</main>
		</div>
	);
};

const DrawerItems = props =>
{
	return(
		<FormControl component="fieldset">
			<FormGroup>
				<FormControlLabel
					control={<Checkbox checked={props.widgets.admin} onChange={props.handleChange} name="gilad" />}
					label="Gilad Gray"
				/>
				<Divider />
				<FormControlLabel
					control={<Checkbox checked={props.widgets.weather} onChange={props.handleChange} name="jason" />}
					label="Jason Killian"
				/>
			</FormGroup>
		</FormControl>
	);
}

export default HomeScreenDrawer;
