import dayjs from 'dayjs';
import {
  DATE_FORMAT_SHORT_FORM,
  DATE_FORMAT_LONG_FORM,
  DATE_FORMAT_WITHIN_HOUR,
  DATE_FORMAT_HOUR_TO_DAY,
  DATE_FORMAT_DAY_TO_WEEK,
  DATE_FORMAT_WEEK_TO_YEAR,
  DATE_FORMAT_BEFORE_YEAR
} from 'constants/type';

const localizedFormat = require('dayjs/plugin/localizedFormat');

/**
 * get PostDateFomat
 *
 * @export
 * @param {*} date
 * @returns
 */

export const getDiffTimeRange = (minutes) => {
  let dateType = 0;
  const hour = 60;
  const day = 60 * 24;

  if (minutes < hour) dateType = DATE_FORMAT_WITHIN_HOUR;
  if (minutes >= hour && minutes < day) dateType = DATE_FORMAT_HOUR_TO_DAY;
  if (minutes >= day && minutes < day * 7) dateType = DATE_FORMAT_DAY_TO_WEEK;
  if (minutes >= day * 7 && minutes < day * 365) dateType = DATE_FORMAT_WEEK_TO_YEAR;
  if (minutes > day * 365) dateType = DATE_FORMAT_BEFORE_YEAR;

  return dateType;
};

/**
 * get PostDateFomat
 *
 * @export
 * @param {*} date
 * @returns
 */

export const getPostDateFomat = (date, formType) => {
  const now = dayjs();
  let dateFormat = '';

  const savedDate = dayjs(date);

  let minutes = now.diff(savedDate, 'minute');
  const dateType = getDiffTimeRange(minutes);

  let hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  hours -= days * 24;
  minutes -= hours * 60;

  const strAgo = formType !== DATE_FORMAT_SHORT_FORM ? 'ago' : '';
  let strPlural = '';
  switch (dateType) {
    case DATE_FORMAT_WITHIN_HOUR: {
      strPlural = minutes > 1 && formType === DATE_FORMAT_LONG_FORM ? 's' : '';
      dateFormat = formType === DATE_FORMAT_LONG_FORM ? `${minutes}min${strPlural} ${strAgo}` : `${minutes}m ${strAgo}`;
      break;
    }
    case DATE_FORMAT_HOUR_TO_DAY: {
      strPlural = hours > 1 && formType === DATE_FORMAT_LONG_FORM ? 's' : '';
      dateFormat = formType === DATE_FORMAT_SHORT_FORM ? `${hours}h ${strAgo}` : `${hours}hour${strPlural} ${strAgo}`;
      break;
    }
    case DATE_FORMAT_DAY_TO_WEEK: {
      strPlural = days > 1 && formType === DATE_FORMAT_LONG_FORM ? 's' : '';
      dateFormat = formType === DATE_FORMAT_LONG_FORM ? `${days}day${strPlural} ${strAgo}` : `${days}d ${strAgo}`;
      break;
    }
    case DATE_FORMAT_WEEK_TO_YEAR: {
      dateFormat = formType === DATE_FORMAT_SHORT_FORM ? `${weeks}w ${strAgo}` : dayjs(savedDate).format('MMM. D');
      break;
    }
    case DATE_FORMAT_BEFORE_YEAR: {
      dayjs.extend(localizedFormat);
      dateFormat = formType === DATE_FORMAT_SHORT_FORM ? `${weeks}w` : dayjs(savedDate).format('MMM. D, YYYY');
      break;
    }
    default: {
      dateFormat = date;
      break;
    }
  }

  return dateFormat;
};

/**
 *  expression number to taiwan dollar
 *
 * @export
 * @param {*} val
 * @returns
 */
export function addComma(val) {
  if (!val) return 0;
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
