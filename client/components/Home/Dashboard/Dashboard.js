import React, {useEffect, useState} from "react";

import {Avatar, Box, Button, Divider, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";

import {makeStyles} from "@material-ui/core/styles";

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';

import AddIcon from '@material-ui/icons/Add';

import Image from "../../../static/images/carousel1.jpg";

const useStyles = makeStyles(theme => ({
	cardBox: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),

		borderWidth: 2,
		borderStyle: "solid",
		borderColor: grey[300],
		borderRadius: 5,
	}
}));

const DashBoard = props =>
{
	return (
		<Grid container spacing={5}>
			<Grid item>
				<InProgressMatches />
			</Grid>
			<Grid item>
				<Grid container spacing={4} direction={"column"}>
					<Grid item>
						<CreateInvitationWithFriends />
					</Grid>
					<Grid item>
						<PendingInvites />
					</Grid>
					<Grid item>
						<FinishedMatches />
					</Grid>
				</Grid>
			</Grid>
		</Grid>

	);
}

const InProgressMatches = props =>
{
	const matches = ["A", "A", "A", "A", "A"];

	return(
		<Grid container spacing={2} direction={"column"}>
			<Grid item>
				<Typography variant={"h6"}>In Progress</Typography>
			</Grid>
			<Grid item>
				<Box width={375} height={825} className={"verticalScrollDiv"}>
					<Grid container spacing={3} style={{height: "inherit"}}>
						{matches.map((match, index) =>
							<Grid item key={index}>
								<InProgressCard />
							</Grid>
						)}
					</Grid>
				</Box>
			</Grid>
		</Grid>
	)
}

const CreateInvitationWithFriends = props =>
{
	const friends = ["A", "A", "A", "A", "A"];

	return(
		<Grid container spacing={2} direction={"column"}>
			<Grid item>
				<Typography variant={"h6"}>Invite A Friend</Typography>
			</Grid>
			<Grid item>
				<Box width={1000} height={65} className={"horizontalScrollDiv"}>
					<Grid container style={{height: "inherit"}}>
						{friends.map((match, index) =>
							<Grid item key={index}>
								<Box mr={1}>
									<Avatar src={Image}/>
								</Box>
							</Grid>
						)}
						<Grid item>
							<Avatar>
								<AddIcon />
							</Avatar>
						</Grid>
					</Grid>
				</Box>
			</Grid>
		</Grid>
	)
}

const PendingInvites = props =>
{
	const invites = ["A", "A", "A", "A", "A"];

	return(
		<Grid container spacing={2} direction={"column"}>
			<Grid item>
				<Typography variant={"h6"}>Pending Invites</Typography>
			</Grid>
			<Grid item>
				<Box width={1000} height={225} className={"horizontalScrollDiv"}>
					<Grid container spacing={3} style={{height: "inherit"}}>
						{invites.map((match, index) =>
							<Grid item key={index}>
								<InviteCard />
							</Grid>
						)}
					</Grid>
				</Box>
			</Grid>
		</Grid>
	);
}

const FinishedMatches = props =>
{
	const finishedGames = ["A", "A", "A", "A", "A"];

	return(
		<Grid container spacing={2} direction={"column"}>
			<Grid item>
				<Typography variant={"h6"}>Recent Matches</Typography>
			</Grid>
			<Grid item>
				<Box width={1000} height={375} className={"verticalScrollDiv"}>
					<Grid container spacing={3} style={{height: "inherit"}}>
						{finishedGames.map((match, index) =>
							<Grid item key={index}>
								<Box>
									<FinishedMatchCard />
								</Box>
							</Grid>
						)}
					</Grid>
				</Box>
			</Grid>
		</Grid>
	);
}

const InviteCard = props =>
{
	const classes = useStyles();
	return (
		<Box width={320} height={200} className={classes.cardBox}>
			<Grid container direction={"column"}>
				<Grid item>
					<Grid container
						  justify={"space-between"} alignItems={"center"} alignContent={"center"}
					>
						<Grid item>
							<Box width={75} height={5} bgcolor={"primary.main"}/>
						</Grid>
						<Grid item>
							<IconButton>
								<MoreHorizIcon />
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid container direction={"column"} spacing={3}>
						<Grid item>
							<Typography variant={"h6"}>Match Name</Typography>
						</Grid>
						<Grid item>
							<Grid container spacing={4}>
								<Grid item>
									<Grid container spacing={2}
										  alignContent={"center"} alignItems={"center"}
									>
										<Grid item>
											<Avatar />
										</Grid>
										<Grid item>
											<Avatar />
										</Grid>
									</Grid>
								</Grid>
								<Grid item>
									<Button variant={"contained"} color={"primary"}>Start Game</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}

const InProgressCard = props =>
{
	const classes = useStyles();
	return (
		<Box width={350} height={250} className={classes.cardBox}>
			<Grid container direction={"column"}>
				<Grid item>
					<Grid container
						  justify={"space-between"} alignItems={"center"} alignContent={"center"}
					>
						<Grid item>
							<Box width={75} height={5} bgcolor={"primary.main"}/>
						</Grid>
						<Grid item>
							<IconButton>
								<MoreHorizIcon />
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid container direction={"column"} spacing={4}>
						<Grid item>
							<Typography variant={"h6"}>Match Name</Typography>
						</Grid>
						<Grid item>
							<Grid container spacing={2}
								  alignContent={"center"} alignItems={"center"}
							>
								<Grid item>
									<Avatar />
								</Grid>
								<Grid item>
									<Avatar />
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Grid container spacing={9}
								  alignContent={"center"} alignItems={"center"}
							>
								<Grid item>
									<Grid container spacing={2}
										  justify={"center"} alignContent={"center"} alignItems={"center"}
									>
										<Grid item>
											<ScheduleOutlinedIcon />
										</Grid>
										<Grid item>
											<Typography>{new Date().getUTCDate()}</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Divider orientation={"vertical"} style={{height: 30}}/>
								<Grid item>
									<Grid container spacing={2}
										  justify={"center"} alignContent={"center"} alignItems={"center"}
									>
										<Grid item>
											<ChatBubbleOutlineOutlinedIcon />
										</Grid>
										<Grid item>
											<Typography>0</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Divider orientation={"vertical"} style={{height: 30}}/>
								<Grid item>
									<Grid container spacing={2}
										  justify={"center"} alignContent={"center"} alignItems={"center"}
									>
										<Grid item>
											<NavigateNextOutlinedIcon />
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}

const FinishedMatchCard = props =>
{
	const classes = useStyles();
	return (
		<Box width={308} height={250} className={classes.cardBox}>
			<Grid container direction={"column"}>
				<Grid item>
					<Grid container
						  justify={"space-between"} alignItems={"center"} alignContent={"center"}
					>
						<Grid item>
							<Box width={75} height={5} bgcolor={"primary.main"}/>
						</Grid>
						<Grid item>
							<IconButton>
								<MoreHorizIcon />
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid container direction={"column"} spacing={4}>
						<Grid item>
							<Typography variant={"h6"}>Match Name</Typography>
						</Grid>
						<Grid item>
							<Grid container spacing={2}
								  alignContent={"center"} alignItems={"center"}
							>
								<Grid item>
									<Avatar />
								</Grid>
								<Grid item>
									<Avatar />
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Grid container spacing={9}
								  alignContent={"center"} alignItems={"center"}
							>
								<Grid item>
									<Grid container spacing={2}
										  justify={"center"} alignContent={"center"} alignItems={"center"}
									>
										<Grid item>
											<ScheduleOutlinedIcon />
										</Grid>
										<Grid item>
											{new Date().getUTCDate()}
										</Grid>
									</Grid>
								</Grid>
								<Divider orientation={"vertical"} style={{height: 30}}/>
								<Grid item>
									<Grid container spacing={2}
										  justify={"center"} alignContent={"center"} alignItems={"center"}
									>
										<Grid item>
											<NavigateNextOutlinedIcon />
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}

export default DashBoard;
