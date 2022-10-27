import React, { useEffect, useRef } from 'react';
import Countdown from 'react-countdown';

function CountdownCode({ isConfirm, reStartCountDown, onComplete, timeLimit = 1000 * 60 * 5 }) {
  const countdownRef = useRef();

  useEffect(() => {
    console.log('reStartCountDown');
    console.log(reStartCountDown);
    countdownRef.current.start();
  }, [reStartCountDown]);

  useEffect(() => {
    if (isConfirm) countdownRef.current.stop();
  }, [isConfirm]);

  return (
    <Countdown
      date={Date.now() + timeLimit}
      autoStart={false}
      ref={countdownRef}
      intervalDelay={0}
      onComplete={onComplete}
      renderer={({ minutes, seconds }) =>
        reStartCountDown > 0 &&
        !isConfirm && (
          <span>
            {minutes}:{seconds}
          </span>
        )
      }
    />
  );
}

export default React.memo(CountdownCode);
