import React from "react";

import { Button, Grid, SvgIcon } from "@material-ui/core";

import { remote } from "electron";
const mainProcess = remote.require("./main.js");

const SideBar = (props) => {
	return (
		<Grid
			container
			direction={"column"}
			spacing={1}
			style={{ height: "100%" }}
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
		>
			<Grid item style={{ height: "100%", width: "100%" }}>
				<Button
					style={{ height: "100%", width: "100%" }}
					onClick={() => mainProcess.garageSwitch()}
				>
					<HomeIcon />
				</Button>
			</Grid>
		</Grid>
	);
};

const HomeIcon = (props) => (
	<SvgIcon color="primary" style={{ fontSize: 220 }}>
		<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" stroke="black" strokeWidth={1} />
	</SvgIcon>
);

export default SideBar;
