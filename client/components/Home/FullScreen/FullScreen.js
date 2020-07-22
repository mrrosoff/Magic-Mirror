import React, {useEffect, useState} from "react";

import { Button, Box, Divider, Grid, Typography } from "@material-ui/core";

import {sendGetRequest, sendPostRequest} from "../../../hooks/api";
import HomeScreenDrawer from "../HomeScreenDrawer";

const FullScreenHome = props =>
{
	const [delMarWeatherData, setDelMarWeatherData] = useState();

	useEffect(() =>
	{
		const getClosestTime = data => data.hours.find(element => new Date() < new Date(element.time));

		sendPostRequest("getLatLngWeatherStats", {lat: "32.9546027", lng: "-117.2719195"})
		.then(res => setDelMarWeatherData(getClosestTime(res.data)));
	}, []);

	return (
		<HomeScreenDrawer>
			<Box pl={2} pr={2}>
				<Grid
					container justify={"center"} alignContent={"center"} alignItems={"center"}
					spacing={6} style={{height: "90vh"}}
				>
					<Grid item xs={12} sm={4}>
						<GarageOpener {...props}/>
					</Grid>
					{props.width < 1200 ? null : <Divider orientation="vertical" flexItem style={{height: '90%'}}/>}
					<Grid
						item xs={12} sm={8}
						container justify={"center"} alignContent={"center"} alignItems={"center"} spacing={2}
					>
						<Grid item style={{width: '100%'}}>

						</Grid>
					</Grid>
				</Grid>
			</Box>
		</HomeScreenDrawer>

	)
};

/*
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
 */
const GarageOpener = props =>
{
	return(
		<Grid container direction={"column"} justify={"center"} alignContent={"center"} alignItems={"center"} spacing={6}>
			<Grid item>
				<Button color={"primary"} variant={"contained"} size={"large"} style={{width: '100%', height: 400}}
						onClick={() => sendPostRequest("garageSwitch", {percentClosed: 100})}
				>
					<Typography color={"inherit"} variant={"h3"}>Toggle Garage</Typography>
				</Button>
			</Grid>
			<Grid
				item
				container justify={"center"} alignContent={"center"} alignItems={"center"} spacing={4}
			>
				<Grid item>
					<Button color={"primary"} variant={"contained"} size={"large"} style={{width: '100%', height: 200}}
							onClick={() => sendPostRequest("garageSwitch", {percentClosed: 90})}
					>
						<Typography color={"inherit"} variant={"h5"}>Close Garage 90%</Typography>
					</Button>
				</Grid>
			</Grid>
		</Grid>
	)
};

export default FullScreenHome;
