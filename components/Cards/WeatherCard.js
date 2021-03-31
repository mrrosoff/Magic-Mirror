import React from "react";

import { Box, Grid, makeStyles, Typography } from "@material-ui/core";

import OpacityIcon from "@material-ui/icons/Opacity";
import WavesIcon from "@material-ui/icons/Waves";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
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
    <Box p={2} className={classes.cardBox}>
      <Grid container direction={"column"} spacing={2}>
        <Grid item>
          <Typography style={{ fontSize: 32, fontWeight: 500 }}>
            Weather
          </Typography>
        </Grid>
        <Grid item>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <Grid container spacing={4} alignItems={"center"}>
                <Grid item>
                  <Grid container direction={"column"}>
                    <Grid item>
                      <Typography style={{ fontSize: 25, fontWeight: 500 }}>
                        {props.weatherData.main.temp + " °F"}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography style={{ fontSize: 18 }}>
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
                    style={{ height: 75 }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <IconTextPair
                    icon={OpacityIcon}
                    text={props.weatherData.main.humidity + "%"}
                  />
                </Grid>
                <Grid item>
                  <IconTextPair
                    icon={WavesIcon}
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
  const Icon = props.icon;
  return (
    <Grid container spacing={1} alignItems={"center"}>
      <Grid item>
        <Icon style={{ fontSize: 18, paddingTop: 4 }} />
      </Grid>
      <Grid item>
        <Typography style={{ fontSize: 15, fontWeight: 400 }}>
          {props.text}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default WeatherCard;
