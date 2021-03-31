import React from "react";

import { Box, Grid, Typography } from "@material-ui/core";

import moment from "moment";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
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
    <Box p={2} className={classes.cardBox}>
      <Grid container direction={"column"} spacing={2}>
        <Grid item container justify={"space-between"}>
          <Grid item>
            <Typography style={{ fontSize: 32, fontWeight: 500 }}>
              Tide
            </Typography>
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: 18, fontWeight: 500 }}>
              Del Mar
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction={"column"} spacing={3}>
            <Grid item>
              <Grid
                container
                spacing={2}
                alignItems={"center"}
                alignContent={"center"}
              >
                <Grid item>
                  <Typography
                    style={{ fontSize: 20, fontWeight: 400 }}
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
