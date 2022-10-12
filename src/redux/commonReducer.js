import SignUpReducer from 'redux/store/signUpSlice';
import AuthEmailReducer from 'redux/store/authEmailSlice';
import AuthPhoneNumberReducer from 'redux/store/authPhoneNumberSlice';
import AuthCodeReducer from 'redux/store/authCodeSlice';
import NickNameReducer from 'redux/store/nickNameSlice';
import checkNickNameReducer from 'redux/store/checkNickNameSlice';
import accountInfoReducer from 'redux/store/accountInfoSlice';
import changePasswordReducer from 'redux/store/changePasswordSlice';
import deleteSnsIdReducer from 'redux/store/deleteSnsIdSlice';
import popupReducer from './store/popupSlice';

const commonReducer = {
  signUp: SignUpReducer,
  authEmail: AuthEmailReducer,
  authCode: AuthCodeReducer,
  authPhone: AuthPhoneNumberReducer,
  nickName: NickNameReducer,
  checkNickName: checkNickNameReducer,
  accountInfo: accountInfoReducer,
  changePassword: changePasswordReducer,
  deleteSnsId: deleteSnsIdReducer,
  popup: popupReducer
};
export default commonReducer;
