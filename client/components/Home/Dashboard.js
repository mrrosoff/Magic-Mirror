import React, {useContext, useEffect, useState} from 'react';

import {Box, CircularProgress, Grid, IconButton, Typography} from '@material-ui/core';
import {grey} from "@material-ui/core/colors";

import {makeStyles} from "@material-ui/core/styles";

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import {AuthContext} from '../Router';
import {getSurf, getTidePrediction, getTideActual, getWeather} from '../../hooks/useAPI';

import TideCard from "./TideCard";
import WeatherCard from "./WeatherCard";
import SurfCard from "./SurfCard";

const useStyles = makeStyles(theme => ({
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
	const [weatherData, setWeatherData] = useState();
	const [surfData, setSurfData] = useState();
	const [tidePredictionData, setTidePredictionData] = useState();
	const [tideActualData, setTideActualData] = useState();

	useEffect(() =>
	{
		const getWeatherFromAPI = () =>
		{
			getWeather({key: '114e2f8559d9daba8a4ad4e51464c8b6'})
			.then(r => setWeatherData(r.data));
		};

		const interval = setInterval(getWeatherFromAPI(), 60000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() =>
	{
		const getTidesFromAPI = () =>
		{
			getTidePrediction({}).then(r => setTidePredictionData(r.data));
			getTideActual({}).then(r => setTideActualData(r.data));
		}
		const interval = setInterval(getTidesFromAPI(), 60000);
		return () => clearInterval(interval);
	}, [])

	useEffect(() =>
	{
		const getSurfFromAPI = () =>
		{
			getSurf().then(r => setSurfData(r.data));
		}
		const interval = setInterval(getSurfFromAPI(), 60000);
		return () => clearInterval(interval);
	}, [])

	let authData = useContext(AuthContext);

	return (
		<Grid container spacing={5}>
			{
				authData.userData.admin ?
					<Grid item>
						<WidgetCard title={"Admin"}/>
					</Grid> : null
			}
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

	);
}

const WidgetCard = props =>
{
	const classes = useStyles();
	return (
		<Box className={classes.cardBox}>
			<Grid container direction={"column"}>
				<Grid item>
					<Grid container
						  justify={"space-between"} alignItems={"center"} alignContent={"center"}
					>
						<Grid item>
							<Box width={75} height={5} bgcolor={"primary.main"}/>
						</Grid>
						<Grid item>
							<IconButton>
								<MoreHorizIcon />
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid container direction={"column"} spacing={2}>
						<Grid item>
							<Typography variant={"h3"}>{props.title}</Typography>
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
