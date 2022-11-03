import moment from 'moment';

export const protectFromXSS = (text) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const timestampToTime = (timestamp) => {
  const now = new Date().getTime();
  const nowDate = moment.unix(now.toString().length === 13 ? now / 1000 : now).format('MM/DD');
  let date = moment.unix(timestamp.toString().length === 13 ? timestamp / 1000 : timestamp).format('MM/DD');
  if (date === 'Invalid date') {
    date = '';
  }
  return nowDate === date
    ? moment.unix(timestamp.toString().length === 13 ? timestamp / 1000 : timestamp).format('HH:mm')
    : date;
};

export const changeToDate = (datetime) => {
  const now = moment(new Date());
  const duration = moment.duration(now.diff(datetime));
  const seconds = duration.asSeconds();
  const minute = duration.asMinutes();
  const hours = duration.asHours();

  if (minute < 1) return `${parseInt(seconds, 10)}s`;
  if (hours < 1) return `${parseInt(minute, 10)}m`;
  if (hours < 24) return `${parseInt(hours, 10)}h`;

  return timestampToTime(datetime);
};

export const handleEnterPress = (event, callback) => {
  if (event.key === 'Enter') {
    callback();
  }
};
