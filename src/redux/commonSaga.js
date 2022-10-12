import { signUpSaga } from './saga/signUpSaga';
import { authEmailSaga } from './saga/authEmailSaga';
import { authPhoneNumberSaga } from './saga/authPhoneNumberSaga';
import { authCodeSaga } from './saga/authCodeSaga';
import { logInSaga } from './saga/logInSaga';
import { nickNameSaga } from './saga/nickNameSaga';
import { checkNickNameSaga } from './saga/checkNickNameSaga';
import { accountInfoSaga } from './saga/accountInfoSaga';
import { changePasswordSaga } from './saga/changePasswordSaga';
import { deleteSnsIdSaga } from './saga/deleteSnsIdSaga';
import { popupSaga } from './saga/popupSaga';

const commonSaga = [
  ...signUpSaga,
  ...authEmailSaga,
  ...authCodeSaga,
  ...logInSaga,
  ...authPhoneNumberSaga,
  ...nickNameSaga,
  ...checkNickNameSaga,
  ...accountInfoSaga,
  ...changePasswordSaga,
  ...deleteSnsIdSaga,
  ...popupSaga
];
export default commonSaga;
