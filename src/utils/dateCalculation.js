import dayjs from 'dayjs';

export function dateCalculation(props) {
  let resultDate = '';
  const date1 = dayjs(new Date(), 'YYYY-MM-DD HH:mm');
  const date2 = dayjs(props, 'YYYY-MM-DD HH:mm');

  const years = date1.diff(date2, 'y');
  const days = date1.diff(date2, 'd');
  const hours = date1.diff(date2, 'hours');
  const minute = date1.diff(date2, 'm');

  if (minute <= 60) {
    resultDate = `${minute}m ago`;
  } else if (minute > 60 && hours <= 24) {
    resultDate = `${hours}h ago`;
  } else if (hours > 24 && days <= 7) {
    resultDate = `${days}d ago`;
  } else if (days > 7 && years < 1) {
    resultDate = dayjs(date2).format('MMM. D');
  } else if (years >= 1) {
    resultDate = dayjs(date2).format('MMM. D YYYY');
  }
  return resultDate;
}
