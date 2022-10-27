import { signUpSaga } from './common/signUpSaga';
import { authEmailSaga } from './common/authEmailSaga';
import { authPhoneNumberSaga } from './common/authPhoneNumberSaga';
import { authCodeSaga } from './common/authCodeSaga';
import { logInSaga } from './common/logInSaga';
import { nickNameSaga } from './common/nickNameSaga';
import { changeNicknameSaga } from './common/changeNicknameSaga';
import { checkNickNameSaga } from './common/checkNickNameSaga';
import { accountInfoSaga } from './common/accountInfoSaga';
import { changePasswordSaga } from './common/changePasswordSaga';
import { deleteSnsIdSaga } from './common/deleteSnsIdSaga';
import { popupSaga } from './common/popupSaga';
import { uploadFileSaga } from './common/uploadFileSaga';
import { searchUserSaga } from './common/searchUserSaga';
import { categorySaga } from './common/categorySaga';

const commonSaga = [
  ...signUpSaga,
  ...authEmailSaga,
  ...authCodeSaga,
  ...logInSaga,
  ...authPhoneNumberSaga,
  ...nickNameSaga,
  ...changeNicknameSaga,
  ...checkNickNameSaga,
  ...accountInfoSaga,
  ...changePasswordSaga,
  ...deleteSnsIdSaga,
  ...popupSaga,
  ...uploadFileSaga,
  ...searchUserSaga,
  ...categorySaga
];
export default commonSaga;
