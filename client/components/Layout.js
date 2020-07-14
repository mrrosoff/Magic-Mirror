import React, {useEffect, useState} from "react";

import { Button, Box, Grid, Typography } from "@material-ui/core";

import {sendGetRequest, sendPostRequest} from "../utils/api";

const Layout = () =>
{
	const [weatherData, setWeatherData] = useState();

	return (
		<Box p={4}>
			<Grid
				container justify={"center"} alignContent={"center"} alignItems={"center"}
				spacing={6} style={{height: "95vh"}}
			>
				<Grid item xs={12} sm={5}>
					<GarageOpener />
				</Grid>
				<Grid
					item xs={12} sm={7}
					container justify={"center"} alignContent={"center"} alignItems={"center"} spacing={2}
				>
					<Grid item>
						<Button color={"primary"} variant={"contained"} size={"large"} style={{width: '100%', height: 200}}
								onClick={() =>
								{
									sendPostRequest("getLatLngWeatherStats", {lat: "32.9546027", lng: "-117.2719195"})
									.then(res => setWeatherData(res.data));
								}}
						>
							<Typography color={"inherit"} variant={"h3"}>
								Ping Weather API
							</Typography>
						</Button>
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
				<Button color={"primary"} variant={"contained"} size={"large"} style={{width: '100%', height: 200}}
						onClick={() =>
						{
							sendPostRequest("garageSwitch", {percentClosed: 100})
							.then(res => setGarageState(res.data.state));
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
								.then(res => setGarageState(res.data.state));
							}}
					>
						<Typography color={"inherit"} variant={"h5"}>Close Garage 90%</Typography>
					</Button>
				</Grid>
				<Grid item>
					<Button color={"primary"} variant={"contained"} size={"large"}
							disabled={true}
							onClick={() => {}}
					>
						<Typography color={"inherit"} variant={"h5"}>
							Coming Soon</Typography>
					</Button>
				</Grid>
			</Grid>
		</Grid>
	)
};

export default Layout;
