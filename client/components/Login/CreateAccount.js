import React, {useState, useEffect} from "react";

import {Button, Grid, InputAdornment, TextField, Typography} from "@material-ui/core";

import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';

import {useHistory} from "react-router-dom";

import {keccak256} from "js-sha3";

import {sendPostRequest} from "../../hooks/api";

const CreateAccount = props =>
{
	const history = useHistory();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const [disabledAccountCreation, setDisabledAccountCreation] = useState(true);

	useEffect(() =>
	{
		if (!username || !password || !email)
		{
			setDisabledAccountCreation(true);
		}

		else
		{
			setDisabledAccountCreation(false);
		}
	}, [username, password, email]);

	const createAccount = () =>
	{
		setDisabledAccountCreation(true);

		sendPostRequest("createAccount", {username: username, password: keccak256(password), email: email, phoneNumber: phoneNumber})
		.then(res =>
		{
			if (res.data.accountCreationSuccess)
			{
				props.produceSnackBar("Account Creation Successful, Please Log In", "info");
				setDisabledAccountCreation(false);
				history.push("/");
			}

			else
			{
				props.produceSnackBar(res.data.message, "error");
				setDisabledAccountCreation(false);
			}
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
				email={email} setEmail={setEmail}
				phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
				createAccount={createAccount} {...props}
			/>
			<Grid item container justify={"center"} alignItems={"center"} alignContent={"center"}>
				<Grid item style={{width: "80%"}} align={"center"}>
					<Button
						color={"primary"} variant={"contained"} style={{width: "80%", height: "50px"}}
						disabled={disabledAccountCreation} onClick={() => createAccount()}
					>
						Create Account
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
					autoComplete={"username"} required
					label={"New Username"} value={props.username} onChange={(e) => props.setUsername(e.target.value)}
					onKeyDown={(e) =>
					{
						if(e.keyCode === 13) props.createAccount();
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
					type={"password"} autoComplete={"current-password"} required
					label={"New Password"} value={props.password} onChange={(e) => props.setPassword(e.target.value)}
					onKeyDown={(e) =>
					{
						if(e.keyCode === 13) props.createAccount();
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
			<Grid item style={{width: '100%'}}>
				<TextField
					fullWidth color={"primary"} variant={"outlined"} required
					label={"Email"} value={props.email} onChange={(e) => props.setEmail(e.target.value)}
					onKeyDown={(e) =>
					{
						if(e.keyCode === 13) props.createAccount();
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<MailIcon />
							</InputAdornment>
						),
					}}
				/>
			</Grid>
			<Grid item style={{width: '100%'}}>
				<TextField
					fullWidth color={"primary"} variant={"outlined"}
					label={"Phone Number"} value={props.phoneNumber} onChange={(e) => props.setPhoneNumber(e.target.value)}
					onKeyDown={(e) =>
					{
						if(e.keyCode === 13) props.createAccount();
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<PhoneIcon />
							</InputAdornment>
						),
					}}
				/>
			</Grid>
		</Grid>
	);
}

export default CreateAccount;
