import React, { useEffect, useState, useCallback } from 'react';
import useInterval from '../../hooks/user-interval';
import Button from '../Button';
import Timer from '../Timer';

import bellStart from '../../assets/sounds/bell-start.mp3';
import bellFinish from '../../assets/sounds/bell-finish.mp3';

import './styles.css';

import SecondsToHours from '../../utils/seconds-to-hours';

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

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
  cycles,
}: Props): JSX.Element {
  const [mainTime, setMainTime] = useState<number>(pomodoroTime);
  const [timeCounting, setTimeCounting] = useState<boolean>(false);
  const [working, setWorking] = useState<boolean>(false);
  const [resting, setResting] = useState<boolean>(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState<boolean[]>(
    new Array(cycles - 1).fill(true),
  );

  const [completedCycles, setCompletedCycles] = useState<number>(0);
  const [fullWorkingTime, setFullWorkingTime] = useState<number>(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState<number>(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(pomodoroTime);
    audioStartWorking.play();
  }, [setTimeCounting, setWorking, setResting, setMainTime, pomodoroTime]);

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true);

      if (long) {
        setMainTime(longRestTime);
      } else {
        setMainTime(shortRestTime);
      }

      audioStopWorking.play();
    },
    [
      setTimeCounting,
      setWorking,
      setResting,
      setMainTime,
      longRestTime,
      shortRestTime,
    ],
  );

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWork();
  }, [
    working,
    resting,
    mainTime,
    cyclesQtdManager,
    numberOfPomodoros,
    completedCycles,
    configureRest,
    setCyclesQtdManager,
    configureWork,
    cycles,
  ]);

  return (
    <div className="pomodoro">
      <h2>Você está: {working ? 'Trabalhando' : 'Descansando'}</h2>
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
        <p>Ciclos concluídos: {completedCycles}</p>
        <p>Horas trabalhadas: {SecondsToHours(fullWorkingTime)}</p>
        <p>Pomodoros concluídos: {numberOfPomodoros}</p>
      </div>
    </div>
  );
}
