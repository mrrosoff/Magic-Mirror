import React, {useEffect, useState} from 'react';

import {Box, Grid, IconButton, Paper} from '@material-ui/core';
import {grey} from "@material-ui/core/colors";

import {makeStyles} from "@material-ui/core/styles";

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import TideCard from "./Cards/TideCard";
import WeatherCard from "./Cards/WeatherCard";
import SurfCard from "./Cards/SurfCard";
import SideBar from "./SideBar";

import axios from "axios";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(5)
	},
	fancyBox: {
		height: "100%",
		[theme.breakpoints.up('xs')]: {
			padding: theme.spacing(3)
		},
		[theme.breakpoints.up('sm')]: {
			paddingTop: theme.spacing(3),
			paddingBottom: theme.spacing(3),
			paddingRight: theme.spacing(3)
		}
	},
	cardBox: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),

		borderWidth: 2,
		borderStyle: "solid",
		borderColor: grey[300],
		borderRadius: 5,
	}
}));

const DashBoard = props =>
{
	const classes = useStyles();

	const [weatherData, setWeatherData] = useState();
	const [surfData, setSurfData] = useState();
	const [tidePredictionData, setTidePredictionData] = useState();
	const [tideActualData, setTideActualData] = useState();

	useEffect(() =>
	{
		const getWeatherFromAPI = () =>
		{
			axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=92130&units=imperial&appid=114e2f8559d9daba8a4ad4e51464c8b6`)
				.then(r => setWeatherData(r.data));
		};

		getWeatherFromAPI();
		const interval = setInterval(getWeatherFromAPI, 60000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() =>
	{
		const getTidesFromAPI = () =>
		{
			axios.get(`https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=today&station=9410230&product=predictions&datum=MLLW&time_zone=lst&units=english&format=json`)
				.then(r => setTidePredictionData(r.data));

			axios.get(`https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=today&station=9410230&product=one_minute_water_level&datum=MLLW&time_zone=lst&units=english&format=json`)
				.then(r => setTideActualData(r.data));

		}

		getTidesFromAPI();
		const interval = setInterval(getTidesFromAPI, 60000);
		return () => clearInterval(interval);
	}, [])

	useEffect(() =>
	{
		const getSurfFromAPI = () =>
		{
			axios.get(`https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=5842041f4e65fad6a77088af&days=5&intervalHours=3&maxHeights=true`)
				.then(r => setSurfData(r.data));
		}

		getSurfFromAPI();
		const interval = setInterval(getSurfFromAPI, 60000);
		return () => clearInterval(interval);
	}, [])

	console.log(tideActualData)

	return (
		<Box height={"100vh"}>
			<Grid container style={{height: "100%"}}>
				<Grid item sm={12} md={6} lg={4} style={{height: "100%"}}>
					<SideBar {...props}/>
				</Grid>
				<Grid item sm={12} md={6} lg={8} style={{height: "100%"}}>
					<Box className={classes.fancyBox}>
						<Paper id={"wrappingPaper"} style={{width: "100%", height: "100%", overflow: "hidden"}} className={classes.root}>
							<Grid container spacing={5}>
								<Grid item>
									{
										weatherData ?
											<WidgetCard title={"Weather"}>
												<WeatherCard weatherData={weatherData}/>
											</WidgetCard> : null
									}
								</Grid>
								<Grid item>
									{
										surfData && surfData.data ?
											<WidgetCard title={"Surf"}>
												<SurfCard surfData={surfData}/>
											</WidgetCard> : null
									}
								</Grid>
								<Grid item style={{width: "100%"}}>
									{
										tideActualData && tideActualData.data && tidePredictionData && tidePredictionData.predictions ?
											<WidgetCard title={"Tide"}>
												<TideCard tidePredictionData={tidePredictionData} tideActualData={tideActualData}/>
											</WidgetCard> : null
									}
								</Grid>
							</Grid>
						</Paper>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}

const WidgetCard = props =>
{
	const classes = useStyles();

	return (
		<Box className={classes.cardBox}>
			<Grid container direction={"column"}>
				<Grid item>
					<Box pt={3} pb={3}>
						<Grid container
							  justify={"space-between"} alignItems={"center"} alignContent={"center"}
						>
							<Grid item>
								<Box width={75} height={5} bgcolor={"primary.main"}/>
							</Grid>
						</Grid>
					</Box>
				</Grid>
				<Grid item>
					<Grid container direction={"column"} spacing={2}>
						<Grid item>
							<Box fontWeight={500} fontSize="h2.fontSize">
								{props.title}
							</Box>
						</Grid>
						<Grid item>
							{props.children}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}

export default DashBoard;
