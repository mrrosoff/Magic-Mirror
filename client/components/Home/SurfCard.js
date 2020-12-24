import React from 'react';

import {Grid, Typography} from '@material-ui/core';

import TrendingUpIcon from '@material-ui/icons/TrendingUp';

import moment from 'moment';

const SurfCard = props =>
{
	let dayAverages = [];
	let average = 0;

	for (let i = 0; i < props.surfData.data.wave.length; i++)
	{
		if (i !== 0 && i % 8 === 0)
		{
			dayAverages.push(average);
			average = 0;
		}

		average += props.surfData.data.wave[i].surf.max;
		average /= 2;
	}

	return(
		<Grid container direction={"column"} spacing={2}>
			<Grid item>
				<Grid container spacing={2}
					alignItems={"center"} alignContent={"center"}
				>
					<Grid item>
						<TrendingUpIcon />
					</Grid>
					<Grid item>
						<Typography variant={"h4"}>Today: {dayAverages[0].toFixed(0)} ft</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<Grid container spacing={4}>
					{
						dayAverages.slice(1).map((average, index) =>
							<Grid item key={index}>
								<Typography variant={"h6"}>{(moment(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + index + 1))).format("dddd")}</Typography>
								<Typography variant={"h6"}>{average.toFixed(0)} ft</Typography>

							</Grid>
						)
					}
				</Grid>
			</Grid>
		</Grid>
	)
}

export default SurfCard;
