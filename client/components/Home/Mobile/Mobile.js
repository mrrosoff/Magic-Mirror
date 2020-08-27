import React from "react";

import { Button, Box, Grid, Typography } from "@material-ui/core";

import HomeScreenDrawer from "../HomeScreenDrawer";

import { sendGarageGarageDataRequest } from "../../../hooks/api";

const MobileHome = props =>
{
	return (
		<HomeScreenDrawer>
			<Box pl={2} pr={2}>
				<Grid
					container justify={"center"} alignContent={"center"} alignItems={"center"}
					spacing={6} style={{height: "90vh"}}
				>
					<Grid item xs={12} sm={4}>
						<Grid container direction={"column"} justify={"center"} alignContent={"center"} alignItems={"center"} spacing={6}>
							<Grid item>
								<Typography variant={"h4"} align={"center"}>Garage Door Opener</Typography>
							</Grid>
							<Grid item>
								<Button color={"primary"} variant={"contained"} size={"large"}
										onClick={() => sendGarageGarageDataRequest("garageSwitch", {percentClosed: 100})}
								>
									Toggle Garage
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</HomeScreenDrawer>
	)
};

export default MobileHome;
