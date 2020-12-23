import React, {useEffect, useState} from "react";

import {Box, CircularProgress, Grid, IconButton, Typography} from '@material-ui/core';
import {grey} from "@material-ui/core/colors";

import {makeStyles} from "@material-ui/core/styles";

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import OpacityIcon from '@material-ui/icons/Opacity';
import WavesIcon from '@material-ui/icons/Waves';
import DirectionsIcon from '@material-ui/icons/Directions';

import {getSurf, getTidePrediction, getTideActual, getWeather} from '../../../hooks/useAPI';

import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import moment from 'moment';

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

	return (
		<Grid container spacing={5}>
			<Grid item>
				<WidgetCard title={"Administration"}/>
			</Grid>
			<Grid item>
				<WidgetCard title={"Surf"}/>
			</Grid>
			<Grid item>
				<WidgetCard title={"Weather"}>
					{weatherData ? <WeatherCard weatherData={weatherData}/> : <CircularProgress />}
				</WidgetCard>
			</Grid>
			<Grid item style={{width: "100%"}}>
				<WidgetCard title={"Tide"}>
					{tidePredictionData ? <TideCard tidePredictionData={tidePredictionData} tideActualData={tideActualData}/> : <CircularProgress />}
				</WidgetCard>
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
					<Grid container direction={"column"} spacing={4}>
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

const WeatherCard = props =>
{
	return(
		<Grid container direction={"column"} spacing={2}>
			<Grid item>
				<Grid container spacing={4}
					  alignItems={"center"}
				>
					<Grid item>
						<Grid container direction={"column"}>
							<Grid item>
								<Typography variant={"h4"}>{props.weatherData.main.temp + " °F"}</Typography>
							</Grid>
							<Grid item>
								<Typography variant={"h5"}>{props.weatherData.weather[0].main}</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<img
							alt={"Weather Icon"}
							src={"http://openweathermap.org/img/wn/" + props.weatherData.weather[0].icon + "@2x.png"}
							style={{height: 140}}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<Grid container spacing={4}>
					<Grid item>
						<IconTextPair
							icon={<OpacityIcon />}
							text={props.weatherData.main.humidity + "%"}
						/>
					</Grid>
					<Grid item>
						<IconTextPair
							icon={<WavesIcon />}
							text={props.weatherData.wind.speed + " mi/h"}
						/>
					</Grid>
					<Grid item>
						<IconTextPair
							icon={<DirectionsIcon />}
							text={props.weatherData.wind.deg + "°"}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}

const IconTextPair = props =>
{
	return(
		<Grid container spacing={1}
			  justify={"center"} alignItems={"center"} alignContent={"center"}
		>
			<Grid item>
				{props.icon}
			</Grid>
			<Grid item>
				<Typography variant={"h6"}>{props.text}</Typography>
			</Grid>
		</Grid>
	)
}

const TideCard = props =>
{
	if (!props.tidePredictionData || !props.tideActualData) return null;

	const firstDataPointDate = new Date(props.tidePredictionData.predictions[0].t);

	const startDate = new Date(firstDataPointDate.getFullYear(), firstDataPointDate.getMonth(), firstDataPointDate.getDate());
	const endDate = new Date(firstDataPointDate.getFullYear(), firstDataPointDate.getMonth(), firstDataPointDate.getDate());

	const predictionData = props.tidePredictionData.predictions.map(({t, v}) => ({time: new Date(t), timeNumber: new Date(t).getTime(), prediction: v}));
	const actualData = props.tideActualData.data.map(({t, v}) => ({time: new Date(t), timeNumber: new Date(t).getTime(), actual: v}));

	let data = predictionData.map(obj => ({...obj, ...actualData.find(item => item.timeNumber === obj.timeNumber)}));


	return(
		<Grid container direction={"column"} spacing={3}
			justify={"center"} alignItems={"center"} alignContent={"center"}
		>
			<Grid item container spacing={4}
				  justify={"center"} alignItems={"center"} alignContent={"center"}
			>
				<Grid item>
					<Typography variant={"h6"}>Next Low Tide: 1:00 PM</Typography>
				</Grid>
				<Grid item>
					<Typography variant={"h6"}>Next High Tide: 2:00 PM</Typography>
				</Grid>
			</Grid>
			<Grid item style={{width: "100%"}}>
				<ResponsiveContainer width={"100%"} height={350}>
					<LineChart width={730} height={250} data={data}
							   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							dataKey="timeNumber"
							type="number"
							scale="time"
							interval="preserveStartEnd"
							tickFormatter={tickItem => moment(tickItem).format('h:mm')}
							domain={[startDate.getTime(), endDate.getTime()]}
						/>
						<YAxis />
						<Legend />
						<Line name="Predicted" type="monotone" dataKey="prediction" stroke="#8884d8" dot={false}/>
						<Line name="Actual" type="monotone" dataKey="actual" stroke="#82ca9d" dot={false}/>
					</LineChart>
				</ResponsiveContainer>
			</Grid>
		</Grid>
	)
}

export default DashBoard;
