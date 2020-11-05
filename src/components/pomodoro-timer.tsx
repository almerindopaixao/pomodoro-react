import React, { useState } from 'react';
import useInterval from '../hooks/user-interval';

interface Props {
  defaultPomodoroTime: 1500;
}

export default function PomodoroTimer({
  defaultPomodoroTime,
}: Props): JSX.Element {
  const [mainTime, setMainTime] = useState<number>(defaultPomodoroTime);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return <div>Olá mundo! {mainTime}</div>;
}
