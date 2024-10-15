import React, { useState, useEffect, useRef } from "react";

function Stopwatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isStopped, setIsStopped] = useState(false);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        } else {
            clearInterval(intervalIdRef.current);
        }
        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isRunning]);

    function start() {
        setIsRunning(true);
        setIsStopped(false); // Reset the stop state when starting
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop() {
        setIsRunning(false);
        setIsStopped(true);
    }

    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
        setIsStopped(false); // Ensure the start button says "Start"
    }

    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        if (hours === "00") {
            return `${minutes}:${seconds}:${milliseconds}`;
        } else {
            return `${hours}:${minutes}:${seconds}:${milliseconds}`;
        }
    }

    return (
        <div className="stopwatch">
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button 
                    onClick={start} 
                    className="start-button"
                    disabled={isRunning}
                >
                    {isStopped ? "Resume" : "Start"}
                </button>
                <button 
                    onClick={stop} 
                    className="stop-button"
                    disabled={!isRunning}
                >
                    Stop
                </button>
                <button 
                    onClick={reset} 
                    className="reset-button"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default Stopwatch;
