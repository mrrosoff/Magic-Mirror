import React from 'react';

import {Grid, Typography} from '@material-ui/core';

import moment from 'moment';
import {Bar, BarChart, XAxis, YAxis} from 'recharts';

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
		<Grid container direction={"column"} spacing={4}>
			<Grid item>
				<Grid container spacing={2}
					  alignItems={"center"} alignContent={"center"}
				>
					<Grid item>
						<Typography variant={"h4"}>{`Del Mar: ${dayAverages[0].toFixed(0)} ft`}</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<Grid container spacing={4}>
					{
						dayAverages.slice(1).map((average, index) =>
							<Grid item key={index}>
								<BarChart width={95} height={125}
										  data={[
											  {
												  date: (moment(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + index + 1))).format("dddd"),
												  value: average.toFixed(0)
											  }
										  ]}>
									<XAxis dataKey="date" />
									<YAxis type="number" domain={[0, 5]} hide={true} scale={"linear"}/>
									<Bar dataKey="value" fill="#8884d8" />
								</BarChart>
							</Grid>
						)
					}
				</Grid>
			</Grid>
		</Grid>
	)
}

export default SurfCard;
