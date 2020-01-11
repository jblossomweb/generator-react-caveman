import React from 'react';
import config from 'app/config';
import HomePage from './page';

const imgSrc: string = `${config.publicUrl}/logo512.png`;

/* do redux wireups here */
export default () => (
  <HomePage imgSrc={imgSrc} />
);
