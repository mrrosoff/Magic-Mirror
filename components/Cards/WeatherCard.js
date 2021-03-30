import React from "react";

import { Box, Grid, makeStyles, Typography } from "@material-ui/core";

import OpacityIcon from "@material-ui/icons/Opacity";
import WavesIcon from "@material-ui/icons/Waves";
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

const WeatherCard = (props) => {
  const classes = useStyles();
  return (
    <Box p={4} className={classes.cardBox}>
      <Grid container direction={"column"} spacing={2}>
        <Grid item>
          <Box fontWeight={500} fontSize="h1.fontSize">
            Weather
          </Box>
        </Grid>
        <Grid item>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <Grid container spacing={4} alignItems={"center"}>
                <Grid item>
                  <Grid container direction={"column"}>
                    <Grid item>
                      <Typography style={{ fontSize: 40 }}>
                        {props.weatherData.main.temp + " °F"}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography style={{ fontSize: 35 }}>
                        {props.weatherData.weather[0].main}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <img
                    alt={"Weather Icon"}
                    src={
                      "http://openweathermap.org/img/wn/" +
                      props.weatherData.weather[0].icon +
                      "@2x.png"
                    }
                    style={{ height: 150 }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={4}>
                <Grid item>
                  <IconTextPair
                    icon={<OpacityIcon />}
                    text={props.weatherData.main.humidity + "%"}
                  />
                </Grid>
                <Grid item>
                  <IconTextPair
                    icon={<WavesIcon />}
                    text={props.weatherData.wind.speed + " mi/h"}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const IconTextPair = (props) => {
  return (
    <Grid
      container
      spacing={1}
      justify={"center"}
      alignItems={"center"}
      alignContent={"center"}
    >
      <Grid item>{props.icon}</Grid>
      <Grid item>
        <Typography variant={"h6"}>{props.text}</Typography>
      </Grid>
    </Grid>
  );
};

export default WeatherCard;