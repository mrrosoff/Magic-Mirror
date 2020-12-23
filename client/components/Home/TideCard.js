import React from 'react';

import {Grid, Typography} from '@material-ui/core';

import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import moment from 'moment';

const TideCard = props =>
{
	if (!props.tidePredictionData || !props.tideActualData) return null;

	const firstDataPointDate = new Date(props.tidePredictionData.predictions[0].t);
	const lastActualPointDate = new Date(props.tideActualData.data[props.tideActualData.data.length - 1].t);

	const startDate = new Date(firstDataPointDate.getFullYear(), firstDataPointDate.getMonth(), firstDataPointDate.getDate());
	const endDate = new Date(firstDataPointDate.getFullYear(), firstDataPointDate.getMonth(), firstDataPointDate.getDate());

	const predictionData = props.tidePredictionData.predictions.map(({t, v}) => ({time: new Date(t), timeNumber: new Date(t).getTime(), prediction: v}));
	const actualData = props.tideActualData.data.map(({t, v}) => ({time: new Date(t), timeNumber: new Date(t).getTime(), actual: v}));

	let data = predictionData.map(obj => ({...obj, ...actualData.find(item => item.timeNumber === obj.timeNumber)}));

	let directionOne = true;
	let dataPointOne;
	let foundDirection = false;

	for (let i = 0; i < predictionData.length; i++)
	{
		if(predictionData[i].time < lastActualPointDate) continue;

		if(!foundDirection)
		{
			if (!dataPointOne) dataPointOne = predictionData[i];

			else
			{
				if(predictionData[i].prediction < dataPointOne.prediction) directionOne = false;
				foundDirection = true;
				dataPointOne = predictionData[i];
			}
		}

		else
		{
			if (directionOne)
			{
				if(predictionData[i].prediction < dataPointOne.prediction) break;
			}

			else
			{
				if(predictionData[i].prediction > dataPointOne.prediction) break;
			}

			dataPointOne = predictionData[i];
		}
	}

	let directionTwo = !directionOne;
	let dataPointTwo;

	for(let i = 0; i < predictionData.length; i++)
	{
		if (predictionData[i].time < dataPointOne.time)
		{
			dataPointTwo = predictionData[i];
			continue;
		}

		if (directionTwo)
		{
			if(predictionData[i].prediction < dataPointTwo.prediction) break;
		}

		else
		{
			if(predictionData[i].prediction > dataPointTwo.prediction) break;
		}

		dataPointTwo = predictionData[i];
	}

	const highTide = foundDirection ? dataPointOne.time : dataPointTwo.time;
	const lowTide = foundDirection ? dataPointTwo.time : dataPointOne.time;

	return(
		<Grid container direction={"column"} spacing={3}
			  justify={"center"} alignItems={"center"} alignContent={"center"}
		>
			<Grid item container spacing={6}
				  justify={"center"} alignItems={"center"} alignContent={"center"}
			>
				<Grid item>
					<Typography variant={"h6"}>Next Low Tide: {moment(lowTide.getTime()).format('h:mm A')}</Typography>
				</Grid>
				<Grid item>
					<Typography variant={"h6"}>Next High Tide: {moment(highTide.getTime()).format('h:mm A')}</Typography>
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

export default TideCard;
