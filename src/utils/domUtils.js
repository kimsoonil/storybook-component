import { MouseEvent } from 'react';

export const isDimmedClick = (e, className) => {
  //e: MouseEvent<Element>
  const { target } = e;
  return target.classList.contains(className);
};
