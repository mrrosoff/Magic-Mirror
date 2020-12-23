import React from 'react';

import {Grid, Typography} from '@material-ui/core';

import OpacityIcon from '@material-ui/icons/Opacity';
import WavesIcon from '@material-ui/icons/Waves';
import DirectionsIcon from '@material-ui/icons/Directions';

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

export default WeatherCard;
