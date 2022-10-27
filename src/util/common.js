/* eslint-disable consistent-return */
import dayjs from 'dayjs';
import JSEncrypt from 'jsencrypt';
import {
  DATE_FORMAT_SHORT_FORM,
  DATE_FORMAT_LONG_FORM,
  DATE_FORMAT_WITHIN_HOUR,
  DATE_FORMAT_HOUR_TO_DAY,
  DATE_FORMAT_DAY_TO_WEEK,
  DATE_FORMAT_WEEK_TO_YEAR,
  DATE_FORMAT_BEFORE_YEAR
} from 'constants/type';
import { getStorage } from 'util/storage';

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

export const getPostDateFormat = (date, formType) => {
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
 *  expression number format
 *
 * @export
 * @param {*} val
 * @returns
 */
export function addComma(val) {
  if (!val) return 0;
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 *  get filename for url
 *
 * @export
 * @param {*} val
 * @returns
 */
export function findFileNameInUrl(url) {
  if (!url) return;

  const arrUrl = url.split('/');
  if (arrUrl.length === 0) return;

  return arrUrl[arrUrl.length - 1];
}

export function encryptCode(msg) {
  const keyData =
    '-----BEGIN PUBLIC KEY-----\n' +
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDRZNk+kO+CcXfKoGyCUQQC+NEk\n' +
    'BSz43y3ACIrTk4XdfK3uD2Ww2n5EQW5TcpKTEmdghpo4/C0/naq/0bAX0uyFVmtS\n' +
    '7dzvdRcjOwYFoDXaNOXiPygKWOP9dYjy63j2fEi/KVI1OGyD50oEmKT2ewfxnLZ9\n' +
    'uja07Ar1URKVwY20awIDAQAB\n' +
    '-----END PUBLIC KEY-----';
  const encryptStr = new JSEncrypt();
  encryptStr.setPublicKey(keyData);

  return encryptStr.encrypt(msg);
}

export function checkLogin() {
  return !!getStorage('accessToken');
}
