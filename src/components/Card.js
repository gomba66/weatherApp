import React from "react";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CardActions from "@mui/material/CardActions";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import InsetDividers from "./ListDays";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme, option }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? option === "true"
        ? "#fff"
        : "#1A2027"
      : option === "true"
      ? "gray"
      : theme.palette.primary,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color:
    theme.palette.mode === "dark"
      ? option === "true"
        ? "#1A2027"
        : theme.palette.text.secondary
      : option === "true"
      ? "#fff"
      : theme.palette.text.secondary,
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

  const current = new Date();
  const showImage = (currentWeather) => {
    switch (currentWeather) {
      case "Drizzle":
        return require("../assets/images/drizzle.gif");
      case "Clear":
        return require("../assets/images/sunny.gif");
      case "Clouds":
        return require("../assets/images/clouds.gif");
      case "Rain":
        return require("../assets/images/raining.gif");
      case "Snow":
        return require("../assets/images/snowing.gif");
      case "Thunderstorm":
        return require("../assets/images/thunderstorm.gif");
      default:
        return require("../assets/images/clouds sunny.gif");
    }
  };
  return (
    <Card sx={{ width: "85%" }}>
      {props.currentLocationData ? (
        <div style={{ width: "100%", position: "relative" }}>
          <div
            style={{ width: "100%", position: "absolute", textAlign: "right" }}
          >
            {props.darkMode}
          </div>
          <CardMedia
            component="img"
            height="140"
            image={showImage(props.currentLocationData.weather[0].main)}
            alt="weather"
          />
        </div>
      ) : (
        <Skeleton variant="rectangular" width={"100%"} height={140} />
      )}
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {props.currentLocationData ? props.city : <Skeleton variant="h4" />}
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
              <Skeleton width={40} height={50} />
            </div>
          )}{" "}
          {props.currentLocationData ? (
            <Avatar>
              <img
                src={`https://openweathermap.org/img/wn/${props?.currentLocationData?.weather[0].icon}.png`}
                alt="weather icon"
                style={{ marginTop: "6px", marginLeft: "6px" }}
              />
            </Avatar>
          ) : (
            <Skeleton
              style={{ marginTop: "6px", marginLeft: "6px" }}
              variant="circular"
              width={40}
              height={40}
            />
          )}
        </h1>
        <Typography variant="body2" color="textSecondary" component="div">
          {props.currentLocationData ? (
            `${new Date().toDateString()}`
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Skeleton width={100} height={30} />
            </div>
          )}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
          {props.currentLocationData ? (
            `${props.currentLocationData.weather[0].description}`
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Skeleton width={100} height={30} />
            </div>
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {props.currentLocationData
            ? props.options.map((option, index) => {
                return (
                  <Link
                    key={index + 1}
                    to={`/weatherApp/day/${option}`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      marginTop: "15px",
                      width: "100px",
                    }}
                  >
                    <Item
                      style={
                        {
                          // background:
                          // props.selectedDay === option
                          //   ? theme.palette.primary
                          //   : null,
                        }
                      }
                      // theme={props.selectedDay === option ? theme : null}
                      option={String(props.selectedDay === option)}
                    >
                      <span
                        style={{
                          fontWeight:
                            props.selectedDay === option ? "bold" : "bold",
                          // color:
                          //   props.selectedDay === option ? "black" : "gray",
                        }}
                      >
                        {option === new Date().getDate()
                          ? "Today"
                          : WEEK_DAYS[
                              new Date(
                                `${
                                  current.getMonth() + 1
                                }/${option}/${current.getFullYear()}`
                              ).getDay()
                            ]}
                      </span>
                    </Item>
                  </Link>
                );
              })
            : Array(6)
                .fill(" ", 0, 6)
                .map((_, index) => {
                  return (
                    <Skeleton
                      key={index + 1}
                      variant="text"
                      width={100}
                      height={60}
                    />
                  );
                })}
        </div>
      </CardActions>
      <CardActions>
        {props.currentLocationData ? (
          <InsetDividers days={props.days} />
        ) : (
          <ListItem>
            <ListItemAvatar>
              <Skeleton variant="circular" width={40} height={40} />
            </ListItemAvatar>
            <ListItemText
              primary={<Skeleton variant="text" width={180} height={30} />}
              secondary={<Skeleton variant="text" width={180} height={30} />}
            />
          </ListItem>
        )}
      </CardActions>
    </Card>
  );
}
