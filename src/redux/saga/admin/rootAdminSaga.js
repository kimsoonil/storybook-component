import { checkClubAddressSaga } from './checkClubAddressSaga';
import { checkClubNameSaga } from './checkClubNameSaga';
import { createClubSaga } from './createClubSaga';
import { categoriesSaga } from './categoriesSaga';

const rootAdminSaga = [...checkClubNameSaga, ...checkClubAddressSaga, ...createClubSaga, ...categoriesSaga];
export default rootAdminSaga;
