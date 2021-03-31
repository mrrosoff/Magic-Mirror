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
    width: 300,
    height: 200,
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
                        {Math.floor(props.weatherData.main.temp) + " °F"}
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
                  <i
                    className={`wi wi-owm-${props.weatherData.weather[0].id}`}
                    alt={"Weather Icon"}
                    style={{ fontSize: 45 }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <OtherDetails {...props} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const OtherDetails = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Grid container spacing={1} alignItems={"center"}>
          <Grid item>
            <OpacityIcon style={{ fontSize: 18, paddingTop: 4 }} />
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: 15, fontWeight: 400 }}>
              {props.weatherData.main.humidity + "%"}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={1} alignItems={"center"}>
          <Grid item>
            <i
              className={`<wi wi-wind from-${props.weatherData.wind.deg}-deg`}
              style={{ fontSize: 15 }}
            />
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: 15, fontWeight: 400 }}>
              {props.weatherData.wind.speed + " mi/h"}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WeatherCard;
