import { checkClubAddressSaga } from './checkClubAddressSaga';
import { checkClubNameSaga } from './checkClubNameSaga';
import { categoriesSaga } from './categoriesSaga';
import { commonAdminSaga } from './commonAdminSaga';
import { dashboardAdminSaga } from './dashboardAdminSaga';
import { boardAdminSaga } from './boardAdminSaga';
import { reportsSettingAdminSaga } from './reportsSettingAdminSaga';

const rootAdminSaga = [
  ...checkClubNameSaga,
  ...checkClubAddressSaga,
  ...categoriesSaga,
  ...commonAdminSaga,
  ...dashboardAdminSaga,
  ...boardAdminSaga,
  ...reportsSettingAdminSaga
];
export default rootAdminSaga;
