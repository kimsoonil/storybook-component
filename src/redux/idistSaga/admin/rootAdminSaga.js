import { checkClubAddressSaga } from './checkClubAddressSaga';
import { checkClubNameSaga } from './checkClubNameSaga';
import { categoriesSaga } from './categoriesSaga';
import { commonAdminSaga } from './commonAdminSaga';
import { dashboardAdminSaga } from './dashboardAdminSaga';
import { boardAdminSaga } from './boardAdminSaga';
import { postAdminSaga } from './postAdminSaga';

const rootAdminSaga = [
  ...checkClubNameSaga,
  ...checkClubAddressSaga,
  ...categoriesSaga,
  ...commonAdminSaga,
  ...dashboardAdminSaga,
  ...boardAdminSaga,
  ...postAdminSaga
];
export default rootAdminSaga;
