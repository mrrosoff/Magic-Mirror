import React from "react";

import { Grid, Typography } from "@material-ui/core";

import moment from "moment";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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

  return (
    <Grid container direction={"column"} spacing={4}>
      <Grid item>
        <Grid
          container
          spacing={2}
          alignItems={"center"}
          alignContent={"center"}
        >
          <Grid item>
            <Typography variant={"h4"}>{`Del Mar: ${dayAverages[0].toFixed(
              0
            )} ft`}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SurfCard;
