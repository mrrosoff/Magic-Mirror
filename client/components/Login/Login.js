import React, {useState} from "react";

import { useHistory } from 'react-router-dom'

import { Button, Grid, InputAdornment, TextField, Typography } from "@material-ui/core";

import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';

import { keccak256 } from 'js-sha3';

import {sendPostRequest} from "../../hooks/api";

const Login = props =>
{
	const history = useHistory();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const login = () =>
	{
		sendPostRequest("login", {username: username, password: keccak256(password)})
		.then(res =>
		{
			if (res.data) history.push("/home");
			else props.produceSnackBar("Incorrect Username or Password");
		})
	};

	return(
		<Grid
			container direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
			spacing={8}
		>
			<Grid item>
				<Typography variant={"h4"} align={"center"}>The Rosoff Club</Typography>
			</Grid>
			<LoginFields
				username={username} setUsername={setUsername}
				password={password} setPassword={setPassword}
				login={login} {...props}
			/>
			<Grid item container justify={"center"} alignItems={"center"} alignContent={"center"}>
				<Grid item style={{width: "80%"}} align={"center"}>
					<Button
						color={"primary"} variant={"contained"} style={{width: "80%", height: "50px"}}
						onClick={() => login()}
					>
						Login
					</Button>
				</Grid>
			</Grid>
		</Grid>
	)
};

const LoginFields = props =>
{
	return(
		<Grid
			item container direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
			spacing={3} style={{width: '90%'}}
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
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<PersonIcon />
							</InputAdornment>
						),
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
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<LockIcon />
							</InputAdornment>
						),
					}}
				/>
			</Grid>
		</Grid>
	);
}

export default Login;
