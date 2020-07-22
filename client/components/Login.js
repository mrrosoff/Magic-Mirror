import React, {useState} from "react";

import { Button, Box, Grid, Paper, TextField, Typography } from "@material-ui/core";

import {sendPostRequest} from "../hooks/api";

const Login = props =>
{
	return (
		<Box p={4}>
			<Grid
				container justify={"center"} alignContent={"center"} alignItems={"center"}
				style={{height: "92vh"}}
			>
				<Grid item xs={12} sm={10} md={8}>
					<Paper elevation={4} style={{height: props.width < 1200 ? '80vh' : '75vh'}}>
						<Grid
							container justify={"center"} alignContent={"center"} alignItems={"center"}
							style={{height: "100%"}}
						>
							<Grid item style={{width: props.width < 1200 ? '90%' : '60%'}}>
								<LoginGrid {...props}/>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	)
};

const LoginGrid = props =>
{
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const login = () =>
	{
		sendPostRequest("login", {username: username, password: password})
		.then(res =>
		{
			if (res.data) props.setLoggedIn(true);
			else props.produceSnackBar("Incorrect Username or Password");
		})
	};

	return(
		<Grid
			container direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
			spacing={8}
		>
			<Grid item>
				<Typography variant={props.width < 1200 ? "h4" : "h2"} align={"center"}>The Rosoff Club</Typography>
			</Grid>
			<LoginFields
				username={username} setUsername={setUsername}
				password={password} setPassword={setPassword}
				login={login} {...props}
			/>
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

const LoginFields = props =>
{
	return(
		<Grid
			item container direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
			spacing={3}
		>
			<Grid item style={{width: '100%'}}>
				<TextField
					fullWidth color={"primary"} variant={"outlined"}
					autoComplete={"username"}
					label={"Username"} value={props.username} onChange={(e) => props.setUsername(e.target.value)}
					onKeyDown={(e) =>
					{
						if(e.keyCode === 13) props.login();
					}}
				/>
			</Grid>
			<Grid item style={{width: '100%'}}>
				<TextField
					fullWidth color={"primary"} variant={"outlined"}
					type={"password"} autoComplete={"current-password"}
					label={"Password"} value={props.password} onChange={(e) => props.setPassword(e.target.value)}
					onKeyDown={(e) =>
					{
						if(e.keyCode === 13) props.login();
					}}
				/>
			</Grid>
		</Grid>
	);
}

export default Login;
