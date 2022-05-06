import * as React from "react";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import InsetDividers from "./ListDays";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function MediaCard(props) {
  const WEEK_DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dateTest = new Date();
  const showImage = (currentWeather) => {
    switch (currentWeather) {
      case "Drizzle":
        return require("../media/images/drizzle.gif");
      case "Clear":
        return require("../media/images/sunny.gif");
      case "Clouds":
        return require("../media/images/clouds.gif");
      case "Rain":
        return require("../media/images/raining.gif");
      case "Snow":
        return require("../media/images/snowing.gif");
      case "Thunderstorm":
        return require("../media/images/thunderstorm.gif");
      default:
        return require("../media/images/clouds sunny.gif");
    }
  };
  return (
    <Card sx={{ width: "80%" }}>
      {props.currentLocationData ? (
        <CardMedia
          component="img"
          height="140"
          image={showImage(props.currentLocationData.weather[0].main)}
          alt="weather"
        />
      ) : (
        <Skeleton variant="rectangular" width={"100%"} height={140} />
      )}
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {props.currentLocationData ? props.city : <Skeleton />}
        </Typography>

        <h1
          style={{
            color: "gray",
            fontSize: "40px",
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {props.currentLocationData ? (
            `${Math.floor(props.currentLocationData.main.temp - 273.15)}°`
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Skeleton width={40} height={40} />
            </div>
          )}{" "}
          {props.currentLocationData ? (
            <Avatar>
              <img
                src={`https://openweathermap.org/img/wn/${props?.currentLocationData?.weather[0].icon}.png`}
                alt="weather icon"
              />
            </Avatar>
          ) : (
            <Skeleton variant="circular" width={40} height={40} />
          )}
        </h1>
        <Typography variant="body2" color="textSecondary" component="div">
          {props.currentLocationData ? (
            `${props.currentLocationData.weather[0].description}`
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Skeleton width={100} height={40} />
            </div>
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            width: "100%",
          }}
        >
          {props.options.map((option, index) => {
            return (
              <Link
                key={index + 1}
                to={`/weatherApp/day/${option}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Item
                  style={{
                    background:
                      props.selectedDay === option ? "#deded0" : "white",
                  }}
                >
                  <span
                    style={{
                      fontWeight:
                        props.selectedDay === option ? "bold" : "bold",
                      color: props.selectedDay === option ? "black" : "gray",
                    }}
                  >
                    {option === new Date().getDate()
                      ? "Today"
                      : WEEK_DAYS[
                          new Date(
                            `${
                              dateTest.getMonth() + 1
                            }-${option}-${dateTest.getFullYear()}`
                          ).getDay()
                        ]}
                  </span>
                </Item>
              </Link>
            );
          })}
        </div>
      </CardActions>
      <CardActions>
        <InsetDividers days={props.days} />
      </CardActions>
    </Card>
  );
}
