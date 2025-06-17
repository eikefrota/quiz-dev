import React, { useState, useEffect } from 'react';


function Timer({ initialTime = 30, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, onTimeUp]);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return minutes + ':' + (secs < 10 ? '0' : '') + secs;
  }

  return (
    <div>
      <h3>Tempo restante: {formatTime(timeLeft)}</h3>
    </div>
  );
}

export default Timer;

