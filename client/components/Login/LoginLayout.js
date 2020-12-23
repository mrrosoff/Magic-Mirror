import React, {useEffect, useState} from "react";

import {Box, Grid, Hidden, Paper} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";

import { makeStyles } from '@material-ui/core/styles';

import { motion } from "framer-motion"

import Carousel1 from "../../static/images/carousel1.jpg";
import Carousel2 from "../../static/images/carousel2.jpg";
import Carousel3 from "../../static/images/carousel3.jpg";
import Carousel4 from "../../static/images/carousel4.jpg";
import Carousel5 from "../../static/images/carousel5.jpg";

const useStyles = makeStyles(theme =>
	({
		root: {
			[theme.breakpoints.up('xs')]: {
				padding: theme.spacing(4)
			},
			[theme.breakpoints.up('sm')]: {
				padding: theme.spacing(6)
			},
			[theme.breakpoints.up('md')]: {
				padding: theme.spacing(10)
			},
			[theme.breakpoints.up('lg')]: {
				padding: theme.spacing(15)
			},
		},
		boundingBox: {
			[theme.breakpoints.up('xs')]: {},
			[theme.breakpoints.up('sm')]: {
				padding: theme.spacing(2)
			},
			[theme.breakpoints.up('md')]: {
				padding: theme.spacing(2)
			},
			[theme.breakpoints.up('lg')]: {
				padding: theme.spacing(6)
			},
			[theme.breakpoints.up('xl')]: {
				padding: theme.spacing(8)
			},
		}
	})
)


const LoginLayout = props =>
{
	const classes = useStyles();

	return (
		<>
			<Box className={"background-image"} />
			<Box width={"100vw"} height={"100vh"} className={classes.root}>
				<Paper elevation={8} style={{height: '100%'}} square>
					<Grid
						container justify={"center"} alignContent={"center"} alignItems={"center"}
						style={{height: "100%"}}
					>
						<Hidden mdDown>
							<Grid item lg={7} style={{height: "100%"}}>
								<ImageCarousel />
							</Grid>
						</Hidden>
						<Grid item xs={12} lg={5}>
							<Box className={classes.boundingBox}>
								{props.children}
							</Box>
						</Grid>
					</Grid>
				</Paper>
			</Box>
		</>
	);
};

const ImageCarousel = props =>
{
	const [carouselActiveIndex, setCarouselActiveIndex] = useState(0);

	let images = [
		<img alt={"Surf Background"} src={Carousel1} style={{height: "100%"}}/>,
		<img alt={"Surf Background"} src={Carousel2} style={{height: "100%"}}/>,
		<img alt={"Surf Background"} src={Carousel3} style={{height: "100%"}}/>,
		<img alt={"Surf Background"} src={Carousel4} style={{height: "100%"}}/>,
		<img alt={"Surf Background"} src={Carousel5} style={{height: "100%"}}/>,
	]

	useEffect(() =>
	{
		let nextImageTimer = setInterval(() =>
		{
			setCarouselActiveIndex(prevIndex =>
			{
				if (prevIndex < images.length - 1) return prevIndex + 1;
				else return 0;
			});
		}, 8000)
		return () => clearInterval(nextImageTimer);
	}, []);

	return(
		<Box style={{height: "100%", position: "relative"}}>
			<Box style={{height: "100%", overflow: "hidden"}}>
				{images[carouselActiveIndex]}
			</Box>
			<Box style={{width: "100%", position: "absolute", bottom: 30}}>
				<Grid container spacing={2}
					  justify={"center"} alignItems={"center"} alignContent={"center"}
				>
					{images.map((_, i) =>
						<Grid item key={i}>
							<CarouselIndicator active={carouselActiveIndex === i}/>
						</Grid>
					)}
				</Grid>
			</Box>
		</Box>

	)
}

const CarouselIndicator = props =>
{
	const variants = {
		active: { width: 30, backgroundColor: "#FFFFFF" },
		other: { width: 10, backgroundColor: grey[300] },
	}

	return (
		<motion.div
			animate={props.active ? "active" : "other"}
			variants={variants}
			style={{height: 10, borderRadius: 10}}
		/>
	);
}

export default LoginLayout;
