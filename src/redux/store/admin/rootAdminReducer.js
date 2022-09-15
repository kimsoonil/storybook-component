import checkClubNameSlice from 'redux/store/admin/checkClubNameSlice';
import checkClubAddressSlice from 'redux/store/admin/checkClubAddressSlice';
import createClubSlice from './createClubSlice';
import categoriesSlice from './categoriesSlice';

const rootAdminReducer = {
  checkClubName: checkClubNameSlice,
  checkClubAddress: checkClubAddressSlice,
  createClub: createClubSlice,
  categories: categoriesSlice
};
export default rootAdminReducer;
