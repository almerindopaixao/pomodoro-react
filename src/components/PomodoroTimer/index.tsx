import React, { useState } from 'react';
import useInterval from '../../hooks/user-interval';
import Button from '../Button';
import Timer from '../Timer';

interface Props {
  defaultPomodoroTime: number;
}

export default function PomodoroTimer({
  defaultPomodoroTime,
}: Props): JSX.Element {
  const [mainTime, setMainTime] = useState<number>(defaultPomodoroTime);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />
      <Button text="teste" onClick={() => console.log(1)} />
    </div>
  );
}
