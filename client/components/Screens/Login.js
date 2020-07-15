import React, {useState} from "react";

import { Button, Box, Grid, Paper, TextField, Typography } from "@material-ui/core";

import {sendPostRequest} from "../../utils/api";

const Login = props =>
{
	return (
		<Box p={4}>
			<Grid
				container justify={"center"} alignContent={"center"} alignItems={"center"}
				style={{height: "92vh"}}
			>
				<Grid item xs={12} sm={10} md={8}>
					<Paper elevation={4} style={{height: '75vh'}}>
						<Grid
							container justify={"center"} alignContent={"center"} alignItems={"center"}
							style={{height: "100%"}}
						>
							<Grid item style={{width: '60%'}}>
								<LoginForm {...props}/>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	)
};

const LoginForm = props =>
{
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const login = () =>
	{
		sendPostRequest("login", {username: username, password: password})
		.then(res =>
		{
			if (res.data)
			{
				props.setLoggedIn(true);
			}

			else
			{
				props.produceSnackBar("Incorrect Username or Password");
			}
		})
	};

	return(
		<Grid
			container direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
			spacing={8}
		>
			<Grid item>
				<Typography variant={"h2"}>The Rosoff Club</Typography>
			</Grid>
			<Grid
				item container direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
				spacing={3}
			>
				<Grid item style={{width: '100%'}}>
					<TextField
						fullWidth color={"primary"} variant={"outlined"}
						label={"Username"} value={username} onChange={(e) => setUsername(e.target.value)}
						onKeyDown={(e) =>
						{
							if(e.keyCode === 13) login();
						}}
					/>
				</Grid>
				<Grid item style={{width: '100%'}}>
					<TextField
						fullWidth color={"primary"} variant={"outlined"}
						label={"Password"} value={password} onChange={(e) => setPassword(e.target.value)}
						onKeyDown={(e) =>
						{
							if(e.keyCode === 13) login();
						}}
					/>
				</Grid>
			</Grid>
			<Grid item>
				<Button
					color={"primary"} variant={"contained"} size={"large"}
					onClick={() => login()}
				>
					Login
				</Button>
			</Grid>
		</Grid>
	)
};

export default Login;
