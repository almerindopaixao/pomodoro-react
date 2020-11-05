import React from 'react';
import SecondsToMinutes from '../../utils/seconds-to-minutes';

import './styles.css';

interface Props {
  mainTime: number;
}

export default function Timer(props: Props): JSX.Element {
  return <div className="timer">{SecondsToMinutes(props.mainTime)}</div>;
}
