import React from "react";

import { Box, Grid, Typography } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import moment from "moment";

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

const TideCard = (props) => {
  const firstDataPointDate = new Date(
    props.tidePredictionData.predictions[0].t
  );
  const domain = new Date(
    firstDataPointDate.getFullYear(),
    firstDataPointDate.getMonth(),
    firstDataPointDate.getDate()
  );

  const predictionData = props.tidePredictionData.predictions.map(
    ({ t, v }) => ({
      time: new Date(t),
      timeNumber: new Date(t).getTime(),
      prediction: v,
    })
  );

  let data = predictionData;
  console.log(props.tideActualData);
  let { highTide, lowTide } = getTideTimes(
    predictionData,
    props.tideActualData
  );

  if (props.tideActualData && props.tideActualData.data) {
    data = predictionData.map((obj) => ({
      ...obj,
      ...props.tideActualData.data
        .map(({ t, v }) => ({
          time: new Date(t),
          timeNumber: new Date(t).getTime(),
          actual: v,
        }))
        .find((item) => item.timeNumber === obj.timeNumber),
    }));
  }

  const classes = useStyles();

  return (
    <Box p={4} className={classes.cardBox}>
      <Grid container direction={"column"} spacing={5}>
        <Grid item container justify={"space-between"}>
          <Grid item>
            <Typography style={{ fontSize: 60, fontWeight: 500 }}>
              Tide
            </Typography>
          </Grid>
          <Grid item>
            {lowTide && highTide ? (
              <Grid
                container
                spacing={3}
                justify={"center"}
                alignItems={"center"}
              >
                <Grid item>
                  <Grid
                    container
                    justify={"center"}
                    alignItems={"center"}
                    spacing={1}
                  >
                    <ArrowDownwardIcon style={{ fontSize: 35 }} />
                    <Grid item>
                      <Typography style={{ fontSize: 35, fontWeight: 400 }}>
                        {moment(lowTide.getTime()).format("h:mm A")}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    justify={"center"}
                    alignItems={"center"}
                    spacing={1}
                  >
                    <ArrowUpwardIcon style={{ fontSize: 35 }} />
                    <Grid item>
                      <Typography style={{ fontSize: 35, fontWeight: 400 }}>
                        {moment(highTide.getTime()).format("h:mm A")}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
        <Grid item>
          <ResponsiveContainer width={"100%"} height={275}>
            <LineChart
              width={730}
              height={250}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey="timeNumber"
                type="number"
                scale="time"
                interval="preserveStartEnd"
                tickFormatter={(tickItem) => moment(tickItem).format("h:mm")}
                domain={[domain.getTime(), domain.getTime()]}
              />
              <YAxis
                domain={[
                  Math.floor(
                    Math.min(...predictionData.map((item) => item.prediction))
                  ),
                  6,
                ]}
              />
              <Legend />
              <Line
                name="Predicted"
                type="monotone"
                dataKey="prediction"
                stroke="#8884d8"
                dot={false}
                strokeWidth={4}
              />
              {props.tideActualData ? (
                <Line
                  name="Actual"
                  type="monotone"
                  dataKey="actual"
                  stroke="#82ca9d"
                  dot={false}
                  strokeWidth={4}
                />
              ) : null}
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

const getTideTimes = (predictionData, actualData) => {
  if (!actualData || !actualData.data) return { highTide: null, lowTide: null };

  let i = 0;
  const lastActualDate = new Date(
    actualData.data[actualData.data.length - 1].t
  );

  for (; i < predictionData.length; i++) {
    if (predictionData[i].time > lastActualDate) break;
  }

  let graphStartsDown =
    predictionData[0].prediction > predictionData[1].prediction;
  let firstInflectionPoint = predictionData[1];

  for (; i < predictionData.length; i++) {
    const nextDataPointIsBelow =
      firstInflectionPoint.prediction > predictionData[i].prediction;

    if (graphStartsDown !== nextDataPointIsBelow) break;

    firstInflectionPoint = predictionData[i];
  }

  let secondInflectionPoint = firstInflectionPoint;

  for (; i < predictionData.length; i++) {
    const nextDataPointIsBelow =
      secondInflectionPoint.prediction > predictionData[i].prediction;

    if (!graphStartsDown !== nextDataPointIsBelow) break;

    secondInflectionPoint = predictionData[i];
  }

  const highTide = graphStartsDown
    ? secondInflectionPoint.time
    : firstInflectionPoint.time;
  const lowTide = graphStartsDown
    ? firstInflectionPoint.time
    : secondInflectionPoint.time;

  return { highTide, lowTide };
};

const WidgetCard = (props) => {
  const classes = useStyles();

  return (
    <Box p={4} className={classes.cardBox}>
      <Grid container direction={"column"} spacing={2}>
        <Grid item>
          <Box fontWeight={500} fontSize="h1.fontSize">
            {props.title}
          </Box>
        </Grid>
        <Grid item>{props.children}</Grid>
      </Grid>
    </Box>
  );
};

export default TideCard;