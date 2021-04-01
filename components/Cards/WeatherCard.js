import React from "react";

import { Box, Grid, makeStyles, Typography, useTheme } from "@material-ui/core";

import OpacityIcon from "@material-ui/icons/Opacity";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
	cardBox: {
		borderWidth: 2,
		borderStyle: "solid",
		borderColor: grey[300],
		borderRadius: 5,
		width: 240,
		height: 200
	}
}));

const WeatherCard = (props) => {
	const classes = useStyles();

	return (
		<Box p={2} className={classes.cardBox}>
			<Grid container direction={"column"} spacing={1}>
				<Grid item>
					<Typography style={{ fontSize: 32, fontWeight: 500 }}>Weather</Typography>
				</Grid>
				<Grid item>
					<Grid container direction={"column"} spacing={2}>
						<Grid item>
							<Box display={"flex"} alignItems={"center"}>
								<Box display={"flex"} flexDirection={"column"}>
									<Typography
										style={{
											fontSize: 28,
											fontWeight: 500
										}}
									>
										{Math.floor(props.weatherData.main.temp) + " °F"}
									</Typography>
									<Typography style={{ fontSize: 18 }}>
										{props.weatherData.weather[0].main}
									</Typography>
								</Box>
								<Box pl={4}>
									<i
										className={`wi wi-owm-${props.weatherData.weather[0].id}`}
										alt={"Weather Icon"}
										style={{ fontSize: 42 }}
									/>
								</Box>
							</Box>
						</Grid>
						<Grid item>
							<OtherDetails {...props} />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};

const OtherDetails = (props) => {
	const theme = useTheme();
	return (
		<Grid container spacing={2}>
			<Grid item>
				<Box display={"flex"} alignItems={"center"}>
					<OpacityIcon
						style={{
							fontSize: 18,
							fill: theme.palette.primary.main
						}}
					/>
					<Box pl={1}>
						<Typography style={{ fontSize: 16, fontWeight: 400 }}>
							{props.weatherData.main.humidity + "%"}
						</Typography>
					</Box>
				</Box>
			</Grid>
			<Grid item>
				<Box display={"flex"} alignItems={"center"}>
					<i
						className={`wi wi-wind from-${props.weatherData.wind.deg}-deg`}
						style={{
							fontSize: 22,
							color: theme.palette.primary.main
						}}
					/>
					<Box pl={1}>
						<Typography style={{ fontSize: 16, fontWeight: 400 }}>
							{props.weatherData.wind.speed + " mi/h"}
						</Typography>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export default WeatherCard;
