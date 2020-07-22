import React, {useState} from "react";

import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, CssBaseline, Divider, Drawer, IconButton, Toolbar, Typography } from "@material-ui/core";
import {ChevronLeft, ChevronRight, Menu} from "@material-ui/icons";

const drawerWidth = 225;

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

const HomeScreenDrawer = props =>
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
				{props.children}
			</main>
		</div>
	);
};

export default HomeScreenDrawer;
