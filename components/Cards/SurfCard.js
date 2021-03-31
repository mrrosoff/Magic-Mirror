import React from "react";

import {Box, Grid, Typography } from "@material-ui/core";

import moment from "moment";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
	root: {
	  padding: theme.spacing(5),
	},
	fancyBox: {
	  height: "100%",
	  [theme.breakpoints.up("xs")]: {
		padding: theme.spacing(3),
	  },
	  [theme.breakpoints.up("sm")]: {
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		paddingRight: theme.spacing(3),
	  },
	},
	cardBox: {
	  borderWidth: 2,
	  borderStyle: "solid",
	  borderColor: grey[300],
	  borderRadius: 5,
	},
  }));

const SurfCard = (props) => {
  let dayAverages = [];
  let average = 0;

  for (let i = 0; i < props.surfData.data.wave.length; i++) {
    if (i !== 0 && i % 8 === 0) {
      dayAverages.push(average);
      average = 0;
    }

    average += props.surfData.data.wave[i].surf.max;
    average /= 2;
  }

  const classes = useStyles();
  return (
    <Box p={4} className={classes.cardBox}>
      <Grid container direction={"column"} spacing={2}>
        <Grid item>
          <Typography style={{ fontSize: 35, fontWeight: 500 }}>
            Surf
          </Typography>
        </Grid>
        <Grid item>
          <Grid container direction={"column"} spacing={4}>
            <Grid item>
              <Grid
                container
                spacing={2}
                alignItems={"center"}
                alignContent={"center"}
              >
                <Grid item>
                  <Typography
                    style={{fontSize: 20, fontWeight: 400}}
                  >{`Del Mar: ${dayAverages[0].toFixed(0)} ft`}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SurfCard;
