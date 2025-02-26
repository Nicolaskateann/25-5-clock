import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const Timer = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);

  useEffect(() => {
    let timer = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            document.getElementById("beep").play();
            setIsSession(!isSession);
            return isSession ? breakLength * 60 : sessionLength * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, isSession, breakLength, sessionLength]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(1500);
    setIsRunning(false);
    setIsSession(true);
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  return (
    <div className="container text-center mt-5">
      <h1>25 + 5 Clock</h1>
      <div className="row mt-3">
        <div className="col">
          <h3 id="break-label">Break Length</h3>
          <button id="break-decrement" className="btn btn-danger" onClick={() => setBreakLength((prev) => Math.max(1, prev - 1))}>-</button>
          <span id="break-length" className="mx-3">{breakLength}</span>
          <button id="break-increment" className="btn btn-success" onClick={() => setBreakLength((prev) => Math.min(60, prev + 1))}>+</button>
        </div>
        <div className="col">
          <h3 id="session-label">Session Length</h3>
          <button id="session-decrement" className="btn btn-danger" onClick={() => setSessionLength((prev) => Math.max(1, prev - 1))}>-</button>
          <span id="session-length" className="mx-3">{sessionLength}</span>
          <button id="session-increment" className="btn btn-success" onClick={() => setSessionLength((prev) => Math.min(60, prev + 1))}>+</button>
        </div>
      </div>
      <div className="mt-4">
        <h3 id="timer-label">{isSession ? "Session" : "Break"}</h3>
        <h2 id="time-left">{formatTime(timeLeft)}</h2>
        <button id="start_stop" className="btn btn-primary mx-2" onClick={() => setIsRunning(!isRunning)}>{isRunning ? "Pause" : "Start"}</button>
        <button id="reset" className="btn btn-warning mx-2" onClick={handleReset}>Reset</button>
      </div>
      <audio id="beep" src="/beep.mp3" />
      <footer className="mt-5">&copy; Kate Ann</footer>
    </div>
  );
};

export default Timer;
