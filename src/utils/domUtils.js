export const isDimmedClick = (e, className) => {
  const { target } = e;
  return target.classList.contains(className);
};
