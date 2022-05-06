import "./App.css";
import MediaCard from "./components/Card";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Progress.css";
import { useState, useEffect } from "react";
const App = () => {
  const { day } = useParams();
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [currentLocationData, setCurrentLocationData] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [forecastSelectedDay, setForecastSelectedDay] = useState([]);
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    if (
      weekDays.length &&
      selectedDay === new Date().getDate() &&
      !forecastSelectedDay.length
    ) {
      setSelectedDay(new Date(new Date().setDate(weekDays[0])).getDate());
    }
  }, [forecastSelectedDay, weekDays, selectedDay]);

  useEffect(() => {
    if (days.length > 0) {
      let options = days.map((day) => {
        return new Date(day.dt_txt).getDate();
      });
      options = [...new Set(options)];
      setWeekDays(options);

      let selected = days.filter((day) => {
        return (
          new Date(day.dt_txt).getDate() ===
          new Date(new Date().setDate(selectedDay)).getDate()
        );
      });

      setForecastSelectedDay(selected);
    }
    return () => {
      setForecastSelectedDay([]);
    };
  }, [days, selectedDay]);

  const getData = async (location) => {
    console.log(location);
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${location.latitude}&lon=${location.longitude}&limit=1&appid=cc12183198b65a2770b4c0ebd7f35101`
      )
      .then(async (res) => {
        let city = res.data[0];
        let { data: forecast } = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=cc12183198b65a2770b4c0ebd7f35101`
        );
        let { data: current_weather } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=cc12183198b65a2770b4c0ebd7f35101`
        );

        setCurrentLocationData(current_weather);
        setCurrentLocation(
          `${city.local_names["de"]}, ${forecast.city.name}, ${city.country}`
        );
        setDays(forecast.list);
      });
  };
  useEffect(() => {
    let coords = window.navigator && window.navigator.geolocation;
    if (coords) {
      coords.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setLocation({ latitude: null, longitude: null });
        }
      );
    }
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      getData(location);
    }
  }, [location]);

  useEffect(() => {
    if (day !== undefined) {
      setSelectedDay(Number(day));
    }
  }, [day]);

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "80px",
        }}
      >
        <MediaCard
          days={forecastSelectedDay}
          city={currentLocation}
          currentLocationData={currentLocationData}
          options={weekDays}
          selectedDay={selectedDay}
          dayParam={day}
        />
      </div>
    </div>
  );
};

export default App;
