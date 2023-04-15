// components/CountdownTimer.js

import React, { useEffect, useState } from "react";

type CountdownTimerProps = {
  message: string;
  dueDate: Date;
};
const CountdownTimer = ({ dueDate, message }: CountdownTimerProps) => {
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeRemaining = dueDate.getTime() - now;

      const months = Math.floor(timeRemaining / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
      );
      const hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      setMonths(months);
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dueDate]);

  return (
    <div style={{fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} className="text-center bg-black rounded-lg p-2 shadow m-2">
      <h2 className="text-2xl font-bold mb-3">{message}</h2>
      <div className="flex justify-center items-center flex-wrap">
        <div className="bg-gray-200 text-gray-800 p-4 rounded-lg mx-2 mb-4">
          <div className="text-4xl font-semibold">{months || '--'}</div>
          <div className="text-sm">Months</div>
        </div>
        <div className="bg-gray-200 text-gray-800 p-4 rounded-lg mx-2 mb-4">
          <div className="text-4xl font-semibold">{days || '--'}</div>
          <div className="text-sm">Days</div>
        </div>
        <div className="bg-gray-200 text-gray-800 p-4 rounded-lg mx-2 mb-4">
          <div className="text-4xl font-semibold">{hours || '--'}</div>
          <div className="text-sm">Hours</div>
        </div>
        <div className="bg-gray-200 text-gray-800 p-4 rounded-lg mx-2 mb-4">
          <div className="text-4xl font-semibold">{minutes || '--'}</div>
          <div className="text-sm">Minutes</div>
        </div>
        <div className="bg-gray-200 text-gray-800 p-4 rounded-lg mx-2 mb-4">
          <div className="text-4xl font-semibold">{seconds || '--'}</div>
          <div className="text-sm">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
