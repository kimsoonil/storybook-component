// http status code
export const SUCCESS = 200;
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const NOT_FOUND = 404;
export const API_TIMEOUT_INTERVAL = 6000;

// Auth

export const REFRESH_TOKEN = 'refresh_token';
export const REFRESH_TOKEN_MAX_AGE = 60;

// Common
export const POPUP_TYPE_ALERT = 'alert';
export const POPUP_TYPE_CONFIRM = 'confirm';
export const BUTTON_NAME_CONFIRM = 'Confirm';

// Account Status
export const ACCOUNT_STATUS_ACTIVE = 1;
export const ACCOUNT_STATUS_LEAVE = 2;
export const ACCOUNT_STATUS_LOCKED = 3;
export const ACCOUNT_STATUS_INACTIVE = 4;
export const ACCOUNT_STATUS_PASSWORD_EXPIRED = 5;
export const ACCOUNT_STATUS_SCHEDULED_TO_LEAVE = 6;

// SignUp
export const USER_INFO_EMAIL = 'email';
export const USER_INFO_PHONE = 'phone';
export const USER_INFO_PASSWORD = 'password';
export const USER_INFO_SIGNUP = 'signup';
export const USER_INFO_EDIT = 'edit';
export const PHONE_NUMBER_LENGTH = 10;
export const PHONE_NUMBER_INCLUDE_HYPHEN_LENGTH = 13;
export const AUTH_CODE_LENGTH = 6;
export const AUTH_SEND_EMAIL_INTERVAL = 10000;
export const SEND_AUTH_CODE_TIME_LIMIT = 1000 * 60 * 5;
