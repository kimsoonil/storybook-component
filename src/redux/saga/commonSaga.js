import { signUpSaga } from './common/signUpSaga';
import { authEmailSaga } from './common/authEmailSaga';
import { authPhoneNumberSaga } from './common/authPhoneNumberSaga';
import { authCodeSaga } from './common/authCodeSaga';
import { logInSaga } from './common/logInSaga';
import { nickNameSaga } from './common/nickNameSaga';
import { checkNickNameSaga } from './common/checkNickNameSaga';
import { accountInfoSaga } from './common/accountInfoSaga';
import { changePasswordSaga } from './common/changePasswordSaga';
import { deleteSnsIdSaga } from './common/deleteSnsIdSaga';
import { popupSaga } from './common/popupSaga';

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
