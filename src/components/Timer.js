import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import quote from "./motivationalQuote";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import "./Timer.css";
export default function Pomodoro({ id, theme, toggleTheme }) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);
  let history = useHistory();
  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);

      if (seconds === 0) {
        if (minutes !== 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        } else {
          let minutes = displayMessage ? 24 : 4;
          let seconds = 59;

          setSeconds(seconds);
          setMinutes(minutes);
          setDisplayMessage(!displayMessage);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
  }, [seconds]);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const doneHandler = async (e) => {
    e.preventDefault();
    history.push("/home");
  };

  return (
    <div className="pomodoro">
      <div className="pomodoro-nav">
        <h1 className="timer-title">Pomodoro timer for your task</h1>
        {theme === "light" ? (
          <DarkModeIcon className="icon-light-timer" onClick={toggleTheme} />
        ) : (
          <LightModeIcon className="icon-dark-timer" onClick={toggleTheme} />
        )}
      </div>
      <div className="message">
        {displayMessage && <div>Break time! New session starts in:</div>}
      </div>
      <div className="timer">
        {timerMinutes}:{timerSeconds}
      </div>
      <div className="task-done-timer-handler">
        <button className="task-done-timer" onClick={doneHandler}>
          Done with Task
        </button>
      </div>
      <div className="quote-handler">
        <h2 className="quote-text">
          {quote[Math.floor(Math.random() * 7) + 1]}
        </h2>
      </div>
    </div>
  );
}
