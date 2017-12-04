import React from 'react';
import { time } from './globalStyles.scss';
import image from './image.jpeg';
import bigImage from './bigImage.jpeg';

const Time = () => (
  <div className={time}>
    {new Date().toString()}
    <img src={image} alt="something" />
    <img src={bigImage} alt="tadam" />
  </div>
);

export default Time;
