import React, {useEffect, useState} from "react";

import { AppBar, Button, Box, Grid, Slider, Toolbar, Typography } from "@material-ui/core";

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
	const [amountToClose, setAmountToClose] = useState(100);

	useEffect(() =>
	{
		sendGetRequest("getGarageState").then(res => setGarageState(res.data.state));
	}, []);

	return(
		<Grid container direction={"column"} justify={"center"} alignContent={"center"} alignItems={"center"} spacing={2}>
			<Grid item>
				<Slider
					value={amountToClose}
					onChange={(e, value) => setAmountToClose(value)}
					valueLabelDisplay="auto"
					step={10}
					marks min={50} max={10}
				/>
			</Grid>
			<Grid item>
				<Button color={"primary"} variant={"contained"} size={"large"} style={{height: 300}}
						onClick={() =>
						{
							sendPostRequest("garageSwitch", {percentClosed: amountToClose})
							.then(res => setGarageState(res.data.state));
						}}
				>
					<Typography color={"inherit"} variant={"h4"}>Open / Close Garage</Typography>
				</Button>
			</Grid>
		</Grid>
	)
};

export default Layout;
