import checkClubNameSlice from 'redux/idistStore/admin/checkClubNameSlice';
import checkClubAddressSlice from 'redux/idistStore/admin/checkClubAddressSlice';
import categoriesSlice from './categoriesSlice';
import modalSlice from './modalSlice';
import dialogSlice from './dialogSlice';
import commonAdminSlice from './commonAdminSlice';
import dashboardAdminSlice from './dashboardAdminSlice';
import boardAdminSlice from './boardAdminSlice';
import postAdminSlice from './postAdminSlice';

const rootAdminReducer = {
  checkClubName: checkClubNameSlice,
  checkClubAddress: checkClubAddressSlice,
  categories: categoriesSlice,
  adminModal: modalSlice,
  adminDialog: dialogSlice,
  commonAdmin: commonAdminSlice,
  dashboardAdmin: dashboardAdminSlice,
  boardAdmin: boardAdminSlice,
  postAdmin: postAdminSlice
};
export default rootAdminReducer;
