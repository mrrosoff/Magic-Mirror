import React from "react";

import { Button, Grid, Typography } from "@material-ui/core";
import {sendServerRequest} from "../utils/api";

const Layout = () =>
{
	let request = {requestType: "garageSwitch"};

	return (
		<Grid
			container
			direction={"column"}
			justify={"center"}
			alignContent={"center"}
			alignItems={"center"}
			spacing={2}
			style={{height: "100vh"}}
			>
			<Grid item>
				<Typography variant={"h2"}>Hello World!</Typography>
			</Grid>
			<Grid item>
				<Button color={"primary"} onClick={() => sendServerRequest(request)}>Click Me To Hit API</Button>
			</Grid>
		</Grid>
	)
};

export default Layout;
