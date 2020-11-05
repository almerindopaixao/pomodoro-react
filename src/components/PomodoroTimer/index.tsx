import React, { useEffect, useState } from 'react';
import useInterval from '../../hooks/user-interval';
import Button from '../Button';
import Timer from '../Timer';

import bellStart from '../../assets/sounds/bell-start.mp3';
// import bellFinish from '../../assets/sounds/bell-finish.mp3';

import './styles.css';

const audioStartWorking = new Audio(bellStart);
// const audioStopWorking = new Audio(bellFinish);

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export default function PomodoroTimer({
  pomodoroTime,
  shortRestTime,
  longRestTime,
}: Props): JSX.Element {
  const [mainTime, setMainTime] = useState<number>(pomodoroTime);
  const [timeCounting, setTimeCounting] = useState<boolean>(false);
  const [working, setWorking] = useState<boolean>(false);
  const [resting, setResting] = useState<boolean>(false);

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
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
    setResting(false);
    setMainTime(pomodoroTime);
    audioStartWorking.play();
  };

  const configureRest = (long: boolean) => {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);

    if (long) {
      setMainTime(longRestTime);
    } else {
      setMainTime(shortRestTime);
    }

    audioStartWorking.play();
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
          text="Rest"
          onClick={() => configureRest(false)}
        />

        <Button
          className={`pomodoro-button ${!working && !resting ? 'hidden' : ''}`}
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={() => setTimeCounting(!timeCounting)}
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
