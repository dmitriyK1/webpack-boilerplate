import "./globalStyles.scss";
import React from 'react';
import { render } from 'react-dom';
import { date } from './app';
import { time } from './globalStyles.scss';

const Time = () => <div className={time}>{date}</div>;

render(<Time />, document.getElementById('root'));
