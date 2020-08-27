import React, {useEffect, useState} from "react";

import { Button, Box, Divider, Grid, Paper, Typography } from "@material-ui/core";

import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';

import { sendGarageDataRequest, sendWeatherDataRequest } from "../../../hooks/api";

import HomeScreenDrawer from "../HomeScreenDrawer";

const FullScreenHome = props =>
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
					<Grid item xs={12} sm={8} container spacing={4} style={{padding: 40}}>
						{
							props.adminDashboard ?
								<Grid item>
									<AdminWidget />
								</Grid> : null
						}
						<Grid item>
							<WeatherWidget />
						</Grid>
					</Grid>
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
						onClick={() => sendGarageDataRequest("garageSwitch", {percentClosed: 100})}
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
							onClick={() => sendGarageDataRequest("garageSwitch", {percentClosed: 90})}
					>
						<Typography color={"inherit"} variant={"h5"}>Close Garage 90%</Typography>
					</Button>
				</Grid>
			</Grid>
		</Grid>
	)
};

const AdminWidget = props =>
{
	useEffect(() =>
	{

	}, []);

	return (
		<Paper>
			<Box width={300} height={300}>
				<Grid container justify={"center"} alignItems={"center"} alignContent={"center"} spacing={2}>
					<Grid item>
						This is an admin widget
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
}

const WeatherWidget = props =>
{
	return (
		<Paper>
			<Box width={300} height={300}>
				<Grid container justify={"center"} alignItems={"center"} alignContent={"center"} spacing={2}>
					It is hot out!
				</Grid>
			</Box>
		</Paper>
	);
}

export default FullScreenHome;
