import "./globalStyles.scss";
import React from 'react';
import { render } from 'react-dom';
import { date } from './app';
import './globalStyles.scss';

const Time = () => <div>{date.toString()}</div>;

render(<Time />, document.getElementById('root'));