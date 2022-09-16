import checkClubNameSlice from 'redux/idistStore/admin/checkClubNameSlice';
import checkClubAddressSlice from 'redux/idistStore/admin/checkClubAddressSlice';
import createClubSlice from './createClubSlice';
import categoriesSlice from './categoriesSlice';

const rootAdminReducer = {
  checkClubName: checkClubNameSlice,
  checkClubAddress: checkClubAddressSlice,
  createClub: createClubSlice,
  categories: categoriesSlice
};
export default rootAdminReducer;
