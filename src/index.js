import "./globalStyles.scss";
import React from 'react';
import { render } from 'react-dom';
import { date } from './app';
import { time } from './globalStyles.scss';
import  image  from './image.jpeg';
import bigImage from './bigImage.jpeg';

console.log(image);

const Time = () => <div className={time}>
  {date}
  <img src={image} alt="something"/>
  <img src={bigImage} alt="tadam"/>
  </div>;
render(<Time />, document.getElementById('root'));
