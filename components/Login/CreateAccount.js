import React, {useState} from "react";

import {Grid, InputAdornment, Link, TextField, Typography} from "@material-ui/core";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import LockIcon from '@material-ui/icons/Lock';

import {SignInButton} from "../UI/Buttons";
import Logo from "../UI/Logo";

import MaskedInput from 'react-text-mask';

import { post } from "../../hooks/useAPI";

const CreateAccount = props =>
{
	return(

		<Grid container spacing={6}
			  direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
		>
			<Grid item>
				<Logo height={120}/>
			</Grid>
			<Grid item container spacing={5} style={{width: "100%"}}
				  direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
			>
				<Grid item container spacing={2}
					  direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
				>
					<Grid item>
						<Typography variant={"h5"} align={"center"}>Create Account</Typography>
					</Grid>
					<Grid item>
						<Typography variant={"body1"} align={"center"}>Give us a few details, and you will be on your way.</Typography>
					</Grid>
				</Grid>
				<Grid item style={{width: "90%"}}>
					<SignInArea {...props}/>
				</Grid>
			</Grid>
			<Grid item>
				<BackToSignInArea {...props}/>
			</Grid>
		</Grid>
	)
};

const SignInArea = props =>
{
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");

	const createAccount = () =>
	{
		post("createAccount", {username: username, password: password, email: email, phoneNumber: phoneNumber, approved: false})
		.then(r =>
		{
			if(r.data.success)
			{
				props.history.push("/");
			}

			else
			{
				props.produceSnackBar(r.data.message);
			}
		})
	};

	return (
		<Grid container spacing={8}
			  direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
		>
			<Grid item style={{width: "100%"}}>
				<LoginFields
					username={username} setUsername={setUsername}
					email={email} setEmail={setEmail}
					phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
					password={password} setPassword={setPassword}
					createAccount={createAccount} {...props}
				/>
			</Grid>
			<Grid item>
				<SignInButton onClick={() => createAccount()}>
					Create Account
				</SignInButton>
			</Grid>
		</Grid>
	)
}

const LoginFields = props =>
{
	const moveDown = (currentElement) =>
	{
		let input1 = document.getElementsByTagName("input")[currentElement + 1];
		input1.focus();
	};

	return(
		<Grid container spacing={1} style={{width: "100%", position: "relative"}}
			  direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
		>
			<Grid item container spacing={3} style={{width: "90%"}}
				  direction={"column"} justify={"center"} alignItems={"center"} alignContent={"center"}
			>
				<Grid item style={{width: '100%'}}>
					<TextField
						fullWidth autoComplete={"username"} size={"medium"}
						label={"Username"} value={props.username} onChange={(e) => props.setUsername(e.target.value)}
						onKeyDown={(e) =>
						{
							if(e.key === 'Enter') moveDown(0);
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AccountCircleIcon />
								</InputAdornment>
							),
						}}
					/>
				</Grid>
				<Grid item style={{width: '100%'}}>
					<TextField
						fullWidth
						label={"Email"} value={props.email} onChange={(e) => props.setEmail(e.target.value)}
						onKeyDown={(e) =>
						{
							if(e.key === 'Enter') moveDown(1);
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<EmailIcon />
								</InputAdornment>
							),
						}}
					/>
				</Grid>
				<Grid item style={{width: '100%'}}>
					<TextField
						fullWidth
						label={"Phone Number"} value={props.phoneNumber} onChange={(e) => props.setPhoneNumber(e.target.value)}
						onKeyDown={(e) =>
						{
							if(e.key === 'Enter') moveDown(2);
						}}
						InputProps={{
							inputComponent: PhoneNumberInput,
							startAdornment: (
								<InputAdornment position="start">
									<PhoneIcon />
								</InputAdornment>
							),
						}}
					/>
				</Grid>
				<Grid item style={{width: '100%'}}>
					<TextField
						fullWidth type={"password"} autoComplete={"current-password"}
						label={"Password"} value={props.password} onChange={(e) => props.setPassword(e.target.value)}
						onKeyDown={(e) =>
						{
							if(e.key === 'Enter') props.createAccount();
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
		</Grid>
	);
}

const PhoneNumberInput = props =>
{
	const { inputRef, ...other } = props;
	return (
		<MaskedInput
			{...other}
			ref={ref => inputRef(ref ? ref.inputElement : null)}
			mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
			placeholderChar={'\u2000'}
			showMask
		/>
	);
}

const BackToSignInArea = props =>
{
	return(
		<Grid container spacing={1}
			  justify={"center"} alignItems={"center"} alignContent={"center"}
		>
			<Grid item>
				<Typography variant={"body2"}>Already have an account?</Typography>
			</Grid>
			<Grid item>
				<Link variant={"body2"} onClick={() => props.history.push("/")}>Sign In</Link>
			</Grid>
		</Grid>
	)
}

export default CreateAccount;
