import logInReducer from 'redux/store/common/logInSlice';
import SignUpReducer from 'redux/store/common/signUpSlice';
import AuthEmailReducer from 'redux/store/common/authEmailSlice';
import AuthPhoneNumberReducer from 'redux/store/common/authPhoneNumberSlice';
import AuthCodeReducer from 'redux/store/common/authCodeSlice';
import NickNameReducer from 'redux/store/common/nickNameSlice';
import checkNickNameReducer from 'redux/store/common/checkNickNameSlice';
import accountInfoReducer from 'redux/store/common/accountInfoSlice';
import changePasswordReducer from 'redux/store/common/changePasswordSlice';
import deleteSnsIdReducer from 'redux/store/common/deleteSnsIdSlice';
import forumHistoryReducer from 'redux/store/forum/forumHistorySlice';
import popupReducer from './common/popupSlice';

const commonReducer = {
  logIn: logInReducer,
  signUp: SignUpReducer,
  authEmail: AuthEmailReducer,
  authCode: AuthCodeReducer,
  authPhone: AuthPhoneNumberReducer,
  nickName: NickNameReducer,
  checkNickName: checkNickNameReducer,
  accountInfo: accountInfoReducer,
  changePassword: changePasswordReducer,
  deleteSnsId: deleteSnsIdReducer,
  forumHistory: forumHistoryReducer,
  popup: popupReducer
};
export default commonReducer;
