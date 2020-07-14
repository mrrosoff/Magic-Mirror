import React, {useEffect, useState} from "react";

import { Button, Container, Grid, Typography } from "@material-ui/core";

import {sendGetRequest} from "../utils/api";

import WaveImage from "../static/images/wave.jpg";

const Layout = () =>
{
	return (
		<>
			<div style={{position: 'absolute', top: 40, left: 40}}>
				<Typography variant={"h4"}>Rosoff Club</Typography>
			</div>
			<Container>
				<Grid container justify={"center"} alignContent={"center"} alignItems={"center"}
					  spacing={3} style={{height: "98vh"}}
				>
					<Grid item xs={12} sm={4}>
						<GarageOpener />
					</Grid>
					<Grid item xs={12} sm={8} container justify={"center"} alignContent={"center"} alignItems={"center"}>
						<Grid item>
							<Typography>More Coming Soon</Typography>
						</Grid>
						<Grid item>
							<img src={WaveImage} alt={"A Wave"}/>
						</Grid>
					</Grid>
				</Grid>
			</Container>
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
		<Grid container>
			<Grid item>
				<Button color={"primary"} variant={"contained"} size={"large"}
						onClick={() =>
						{
							sendGetRequest("garageSwitch").then(res => setGarageState(res.data.state));
						}}
				>
					{garageState ? "Close" : "Open"} Garage
				</Button>
			</Grid>
		</Grid>
	)
};

export default Layout;
