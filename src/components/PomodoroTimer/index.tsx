import React, { useEffect, useState } from 'react';
import useInterval from '../../hooks/user-interval';
import Button from '../Button';
import Timer from '../Timer';

import './styles.css';

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export default function PomodoroTimer({ pomodoroTime }: Props): JSX.Element {
  const [mainTime, setMainTime] = useState<number>(pomodoroTime);
  const [timeCounting, setTimeCounting] = useState<boolean>(false);
  const [working, setWorking] = useState<boolean>(false);

  useEffect(() => {
    if (working) document.body.classList.add('working');
  }, [working]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = () => {
    setTimeCounting(true);
    setWorking(true);
  };

  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />

      <div className="controls">
        <Button
          className="pomodoro-button"
          text="Work"
          onClick={() => configureWork()}
        />

        <Button
          className="pomodoro-button"
          text="teste"
          onClick={() => console.log(1)}
        />

        {working && (
          <Button
            className="pomodoro-button"
            text={timeCounting ? 'Pause' : 'Play'}
            onClick={() => setTimeCounting(!timeCounting)}
          />
        )}
      </div>

      <div className="details">
        <p>Detalhes finais</p>
        <p>Detalhes finais</p>
        <p>Detalhes finais</p>
        <p>Detalhes finais</p>
        <p>Detalhes finais</p>
      </div>
    </div>
  );
}
