import React, { useState } from 'react';
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

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />

      <div className="controls">
        <Button
          className="pomodoro-button"
          text="teste"
          onClick={() => console.log(1)}
        />

        <Button
          className="pomodoro-button"
          text="teste"
          onClick={() => console.log(1)}
        />

        <Button
          className="pomodoro-button"
          text="teste"
          onClick={() => console.log(1)}
        />
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
