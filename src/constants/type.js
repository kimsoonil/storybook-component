// http status code
export const SUCCESS = 200;
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const NOT_FOUND = 404;
export const API_TIMEOUT_INTERVAL = 6000;

// Auth
export const REFRESH_TOKEN = 'refresh_token';
export const REFRESH_TOKEN_MAX_AGE = 60;

// LogIn
export const LOGIN_FAIL_COUNT = 5;

// Common
export const POPUP_TYPE_ALERT = 'Alert';
export const POPUP_TYPE_LOGIN_ALERT = 'LogInAlert';
export const POPUP_TYPE_CONFIRM = 'Confirm';
export const POPUP_TYPE_ALERT_WITH_TITLE = 'AlertWithTitle';
export const POPUP_TYPE_CONFIRM_WITH_TITLE = 'ConfirmWithTitle';
export const POPUP_TYPE_NAVIGATE = 'Navigate';
export const POPUP_TYPE_SUCCESS_SMALL = 'SuccessSmall';
export const POPUP_TYPE_SUCCESS_BIG = 'SuccessBig';
export const POPUP_TYPE_OOPS_SMALL = 'OopsSmall';
export const POPUP_TYPE_OOPS_BIG = 'OopsBig';
export const POPUP_TYPE_PRIVACY_POLICY = 'PrivacyPolicy';
export const POPUP_TYPE_MARKET_POLICY = 'MarketPolicy';

export const DATE_FORMAT_SHORT_FORM = 1;
export const DATE_FORMAT_NORMAL_FORM = 2;
export const DATE_FORMAT_LONG_FORM = 3;

export const DATE_FORMAT_WITHIN_HOUR = 1;
export const DATE_FORMAT_HOUR_TO_DAY = 2;
export const DATE_FORMAT_DAY_TO_WEEK = 3;
export const DATE_FORMAT_WEEK_TO_YEAR = 4;
export const DATE_FORMAT_BEFORE_YEAR = 5;

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
export const NICKNAME_STATUS_INIT = 1;
export const NICKNAME_STATUS_CHANGE = 2;
export const NICKNAME_STATUS_SAVED = 3;

// Forum
export const MAX_LOCAL_HISTORY_SAVE = 5;
export const MAX_LIST_COUNT = 20;

export const FORUM_CATEGORY_GAME = 1;
export const FORUM_CATEGORY_CELEBRITY = 2;
export const FORUM_CATEGORY_SPORTS = 3;
