import React from "react";

import { Box, Grid, Typography, useTheme } from "@material-ui/core";

import moment from "moment";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { makeStyles } from "@material-ui/core/styles";
import { grey, green, blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  cardBox: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: grey[300],
    borderRadius: 5,
    height: 200,
  },
}));

const SurfCard = (props) => {
  const data = props.surfData.data.wave.map((item) => ({
    time: item.timestamp * 1000,
    waveHeight: item.surf.max,
  }));

  const todaysAverage =
    props.surfData.data.wave
      .slice(0, 12)
      .map((item) => item.surf.max)
      .reduce((a, b) => a + b) / 12;

  const needle = new Date();

  const closest = data.reduce((a, b) => {
    return Math.abs(new Date(b.time) - needle) <
      Math.abs(new Date(a.time) - needle)
      ? b
      : a;
  });

  const classes = useStyles();
  return (
    <Box
      p={2}
      className={classes.cardBox}
      display={"flex"}
      flexDirection={"column"}
    >
      <Grid item container justify={"space-between"}>
        <Grid item>
          <Typography style={{ fontSize: 32, fontWeight: 500 }}>
            Surf
          </Typography>
        </Grid>
        <Grid item>
          <Typography style={{ fontSize: 18, fontWeight: 500 }}>
            {`${Math.round(todaysAverage)} Feet - Del Mar`}
          </Typography>
        </Grid>
      </Grid>
      <Box pt={2} flexGrow={1}>
        <SurfGraph data={data} closest={closest} />
      </Box>
    </Box>
  );
};

const SurfGraph = (props) => {
  const theme = useTheme();
  return (
    <ResponsiveContainer width={"99%"} height={"100%"}>
      <LineChart
        data={props.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis
          dataKey="time"
          type="number"
          scale="time"
          interval="preserveStartEnd"
          minTickGap={70}
          tickFormatter={(tickItem) => moment(tickItem).format("ddd")}
          domain={[props.data[0].time, props.data[props.data.length - 1].time]}
        />
        <YAxis
          hide
          scale={"linear"}
          domain={[
            0,
            Math.ceil(Math.max(...props.data.map((item) => item.waveHeight))),
          ]}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <ReferenceLine
          x={new Date().getTime()}
          stroke={green[500]}
          strokeWidth={2}
        >
          <Label
          
            style={{fill: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.87)" : undefined}}
            value={`${props.closest.waveHeight.toFixed(2)} Feet`}
            position="insideLeft"
          />
        </ReferenceLine>
        <Line
          name="Wave Height"
          type="monotone"
          dataKey="waveHeight"
          stroke={blue[500]}
          dot={false}
          strokeWidth={4}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SurfCard;
