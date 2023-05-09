import React from "react";
import { View, AppState } from "react-native";
import { Text } from "react-native-paper";
import moment from "moment";

export default function CountDownTimer({ hoursMinSecs, timeOut, time }) {
  const { hours = 0, minutes = 0, seconds = 0 } = hoursMinSecs;
  const appState = React.useRef(AppState.currentState);

  const [[hrs, mins, secs], setTime] = React.useState([
    hours,
    minutes,
    seconds,
  ]);
  let timerId;

  React.useEffect(() => {
    setTime([hours, minutes, seconds]);
  }, [hours, minutes, seconds]);

  const tick = () => {
    if (
      hrs < 0 ||
      mins < 0 ||
      secs < 0 ||
      (hrs === 0 && mins === 0 && secs === 0)
    ) {
      timeOut();
      if (timerId) {
        clearInterval(timerId);
      }
    } else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };

  React.useEffect(() => {
    timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });
  React.useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
    return () => AppState.removeEventListener("change", handleAppStateChange);
  }, []);

  const handleAppStateChange = async (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App is Active");
      if (time) {
        const duration = moment.duration(time.diff(moment()));
        const hr = duration.hours();
        const min = duration.minutes();
        const sec = duration.seconds();
        setTime([hr, min, sec]);
      }
    } else {
      console.log("App is in Active");
    }
    appState.current = nextAppState;
  };

  return (
    <Text>
      {`${hrs.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}
    </Text>
  );
}
