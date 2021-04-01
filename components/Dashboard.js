import React, { useEffect, useState } from "react";

import { Box, Grid, Paper } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

import { makeStyles } from "@material-ui/core/styles";

import TideCard from "./Cards/TideCard";
import WeatherCard from "./Cards/WeatherCard";
import SurfCard from "./Cards/SurfCard";
import SideBar from "./SideBar";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(3)
	},
	cardBox: {
		borderWidth: 2,
		borderStyle: "solid",
		borderColor: grey[300],
		borderRadius: 5
	}
}));

const DashBoard = (props) => {
	const classes = useStyles();

	const [weatherData, setWeatherData] = useState();
	const [surfData, setSurfData] = useState([]);
	const [tidePredictionData, setTidePredictionData] = useState();
	const [tideActualData, setTideActualData] = useState();

	useEffect(() => {
		const getWeatherFromAPI = () => {
			axios
				.get(
					`https://api.openweathermap.org/data/2.5/weather?zip=92130&units=imperial&appid=114e2f8559d9daba8a4ad4e51464c8b6`
				)
				.then((r) => setWeatherData(r.data));
		};

		getWeatherFromAPI();
		const interval = setInterval(getWeatherFromAPI, 60000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const getTidesFromAPI = () => {
			axios
				.get(
					`https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=today&station=9410230&product=predictions&datum=MLLW&time_zone=lst_ldt&units=english&format=json`
				)
				.then((r) => setTidePredictionData(r.data));

			axios
				.get(
					`https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=today&station=9410230&product=one_minute_water_level&datum=MLLW&time_zone=lst_ldt&units=english&format=json`
				)
				.then((r) => setTideActualData(r.data));
		};

		getTidesFromAPI();
		const interval = setInterval(getTidesFromAPI, 60000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const getSurfFromAPI = () => {
			axios
				.get(
					`https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=5842041f4e65fad6a770883b&days=1&intervalHours=1&maxHeights=true`
				)
				.then((r) => {
					setSurfDataWithSplice(r, "Blacks", 0, setSurfData);
				});
			axios
				.get(
					`https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=5842041f4e65fad6a77088af&days=1&intervalHours=1&maxHeights=true`
				)
				.then((r) => {
					setSurfDataWithSplice(r, "15th Street", 1, setSurfData);
				});
			axios
				.get(
					`https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=5842041f4e65fad6a77088a0&days=1&intervalHours=1&maxHeights=true`
				)
				.then((r) => {
					setSurfDataWithSplice(r, "Beacons", 2, setSurfData);
				});
		};

		getSurfFromAPI();
		const interval = setInterval(getSurfFromAPI, 60000);
		return () => clearInterval(interval);
	}, []);

	return (
		<Box height={"100%"} p={3}>
			<Box height={"100%"} display={"flex"} flexDirection={"row"}>
				<Box width={"33.33%"} height={"100%"} paddingRight={3}>
					<Paper
						elevation={2}
						style={{ width: "100%", height: "100%" }}
						className={classes.root}
					>
						<SideBar {...props} />
					</Paper>
				</Box>
				<Box width={"66.66%"} height={"100%"}>
					<Paper
						elevation={2}
						style={{ width: "100%", height: "100%" }}
						className={classes.root}
					>
						<Box
							width={"100%"}
							height={"100%"}
							display={"flex"}
							flexDirection={"column"}
						>
							<Box display={"flex"}>
								<Box>
									{weatherData ? <WeatherCard weatherData={weatherData} /> : null}
								</Box>
								<Box pl={3} flexGrow={1}>
									{surfData.length > 0 ? <SurfCard surfData={surfData} /> : null}
								</Box>
							</Box>
							<Box pt={3} flexGrow={1}>
								{tidePredictionData ? (
									<TideCard
										tidePredictionData={tidePredictionData}
										tideActualData={tideActualData}
									/>
								) : null}
							</Box>
						</Box>
					</Paper>
				</Box>
			</Box>
		</Box>
	);
};

const setSurfDataWithSplice = (r, location, id, setSurfData) => {
	setSurfData((surfData) => {
		const isItem = surfData.some((item) => item.name === location);
		surfData.splice(
			isItem ? surfData.findIndex((item) => item.name === location) : 0,
			isItem ? 1 : 0,
			{
				id: id,
				name: location,
				waveHeight: calculateTodaysAverage(r.data.data.wave)
			}
		);
		return surfData;
	});
};

const calculateTodaysAverage = (data) =>
	data.map((item) => item.surf.max).reduce((a, b) => a + b) / data.length;

export default DashBoard;
