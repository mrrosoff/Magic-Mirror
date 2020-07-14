import React, {useEffect, useState} from "react";

import { AppBar, Button, Box, Grid, Toolbar, Typography } from "@material-ui/core";

import {sendGetRequest, sendPostRequest} from "../utils/api";

import WaveImage from "../static/images/wave.jpg";

const Layout = () =>
{
	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h4">Rosoff Club</Typography>
				</Toolbar>
			</AppBar>
			<Box pl={2} pr={2} pt={2}>
				<Grid container justify={"center"} alignContent={"center"} alignItems={"center"}
					  spacing={3} style={{height: "90vh"}}
				>
					<Grid item xs={12} sm={4}>
						<GarageOpener />
					</Grid>
					<Grid item xs={12} sm={8} container justify={"center"} alignContent={"center"} alignItems={"center"} spacing={2}>
						<Grid item>
							<img src={WaveImage} alt={"A Wave"} width={"100%"}/>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</>
	)
};

const GarageOpener = props =>
{
	const [garageState, setGarageState] = useState();

	useEffect(() =>
	{
		sendGetRequest("getGarageState").then(res => setGarageState(res.data.state));
	}, []);

	return(
		<Grid container direction={"column"} justify={"center"} alignContent={"center"} alignItems={"center"} spacing={2}>
			<Grid item>
				<Button color={"primary"} variant={"contained"} size={"large"} style={{height: 300}}
						onClick={() =>
						{
							sendPostRequest("garageSwitch", {percentClosed: 100})
							.then(res => setGarageState(res.data.state));
						}}
				>
					Full Open/Close Garage
				</Button>
			</Grid>
			<Grid item>
				<Button color={"primary"} variant={"contained"} size={"large"} style={{height: 300}}
						onClick={() =>
						{
							sendPostRequest("garageSwitch", {percentClosed: 90})
							.then(res => setGarageState(res.data.state));
						}}
				>
					90% Closed Garage
				</Button>
			</Grid>
		</Grid>
	)
};

export default Layout;
