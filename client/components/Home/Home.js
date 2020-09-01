import React, {useEffect, useState} from "react";

import { Button, Box, Divider, Grid, Typography } from "@material-ui/core";

import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';

import { sendGarageDataRequest, sendWeatherDataRequest } from "../../hooks/api";

import HomeScreenDrawer from "./HomeScreenDrawer";
import Widgets from "./Widgets";

const Home = props =>
{
	const [delMarWeatherData, setDelMarWeatherData] = useState();

	useEffect(() =>
	{
		const getClosestTime = data => data.hours.find(element => new Date() < new Date(element.time));

		sendWeatherDataRequest("getLatLngWeatherStats", {lat: "32.9546027", lng: "-117.2719195"})
		.then(res => setDelMarWeatherData(getClosestTime(res.data)));
	}, []);

	return (
		<HomeScreenDrawer>
			<Box pl={2} pr={2}>
				<Grid container spacing={6} style={{height: "90vh"}}>
					<Grid item xs={12} sm={4} container justify={"center"} alignContent={"center"} alignItems={"center"}>
						<Grid item>
							<GarageOpener {...props}/>
						</Grid>
					</Grid>
					{props.width < 500 ? null : <Divider orientation="vertical" flexItem style={{justifySelf: 'center', alignSelf: 'center', height: '90%'}}/>}
						<Widgets {...props}/>
				</Grid>
			</Box>
		</HomeScreenDrawer>

	)
};

const GarageOpener = props =>
{
	return(
		<Grid container direction={"column"} justify={"center"} alignContent={"center"} alignItems={"center"} spacing={6}>
			<Grid item>
				<Button color={"primary"} variant={"contained"} size={"large"} style={{width: '100%', height: 400}}
						onClick={() => sendGarageDataRequest("garageSwitch", {percentToClose: 100})}
				>
					<HomeTwoToneIcon style={{width: '100%', height: '100%'}}/>
				</Button>
			</Grid>
			<Grid
				item
				container justify={"center"} alignContent={"center"} alignItems={"center"} spacing={4}
			>
				<Grid item>
					<Button color={"primary"} variant={"contained"} size={"large"} style={{width: '100%', height: 200}}
							onClick={() => sendGarageDataRequest("garageSwitch", {percentToClose: 90})}
					>
						<Typography color={"inherit"} variant={"h5"}>Close Garage 90%</Typography>
					</Button>
				</Grid>
			</Grid>
		</Grid>
	)
};

export default Home;
