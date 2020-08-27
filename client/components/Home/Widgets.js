import React, {useEffect} from "react";

import {Box, Grid, Paper} from "@material-ui/core";

const Widgets = props =>
{
	const widgets = [<AdminWidget {...props} />, <WeatherWidget {...props} />];
	return(
		<Grid item xs={12} sm={8} container spacing={4} style={{padding: 40}}>
			{widgets.map(widget => <Grid item>{widget}</Grid>)}
		</Grid>
	);
}
const AdminWidget = props =>
{
	useEffect(() =>
	{

	}, []);

	return (
		<Paper>
			<Box width={300} height={300}>
				<Grid container justify={"center"} alignItems={"center"} alignContent={"center"} spacing={2}>
					<Grid item>
						This is an admin widget
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
}

const WeatherWidget = props =>
{
	return (
		<Paper>
			<Box width={300} height={300}>
				<Grid container justify={"center"} alignItems={"center"} alignContent={"center"} spacing={2}>
					It is hot out!
				</Grid>
			</Box>
		</Paper>
	);
}

export default Widgets;
