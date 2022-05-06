import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

export default function InsetDividers(props) {
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  const generateListDays = (days) => {
    return days.map((day, index) => {
      return (
        <div key={index + day.dt}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt="weather icon"
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${new Date(day.dt * 1000).toDateString()},
                ${formatAMPM(new Date(day.dt * 1000))}`}
              secondary={day.weather[0].description}
            />
          </ListItem>
          {index + 1 < days.length ? (
            <Divider variant="inset" component="li" />
          ) : null}
        </div>
      );
    });
  };

  return (
    <List
      key={1}
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      {generateListDays(props.days)}
    </List>
  );
}
