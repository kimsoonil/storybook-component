import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'assets/scss/admin/admin.scss';
import { Outlet, useParams } from 'react-router-dom';

import Menu from 'components/idist/admin/Menu';
import {
  getClubByAddressInit,
  patchClubBannerImageInit,
  patchClubProfileImageInit,
  resetCommonAdmin
} from 'redux/idistStore/admin/commonAdminSlice';
import AdminHeader from './AdminHeader';

export const AVD = {
  errorText: {
    name: {
      duplicate: 'Already in use. Please enter a different name. ',
      empty: 'Please enter your club name.'
    },
    address: {
      duplicate: 'Already in use. Please enter a different address.',
      empty: 'Please enter your club address..'
    },
    category: {
      duplicate: 'Already in use. Please select a category',
      empty: 'Please select a category'
    }
  },
  headline: {
    title: 'Create Super Club and leads clubs and clans',
    description: 'Recruit members with the same interests as you, run and grow your club.'
  },
  name: {
    title: 'Club Name',
    description: 'The club name can be modified 3 months after the last change date.',
    placeholder: 'Please name your club',
    extraText: '/30 characters'
  },
  address: {
    title: 'Club Address',
    description: 'The club address cannot be changed later.',
    url: 'https://creata.com/clubs/',
    placeholder: 'Please enter the club address',
    extraText: '/20 characters'
  },
  category: {
    title: 'Category',
    description: 'The category can be modified 3 months after the last change date.',
    placeholder: 'Select categoty'
  },
  profileImages: {
    title: 'Profile Image',
    description: 'The profile image is a representative image of the club.',
    extraText: ' / 10mb'
  },
  bannerImage: {
    title: 'Banner Image',
    description: 'The banner image is the background image for the top of the club.',
    extraText: ' / 20mb'
  },
  description: {
    title: 'Description',
    description: 'The entered information is reflected in the club list such as the club main and search results.',
    placeholder: 'Please describe your club',
    extraText: '/300 characters'
  },
  tags: {
    title: 'Tags',
    description: 'Cafe search terms are reflected in Naver searches.',
    placeholder: '# input tag',
    extraText: `/8 tags`
  },
  autoApproval: {
    title: 'Auto Approval',
    yesText: 'Sign up immediately without approval',
    noText: 'Staff must approve to join'
  },
  modalText: {
    create: 'Are you sure to create a club?',
    cancel: 'Are you sure to cancel creating a club?',
    modifySave: 'Are you sure to edit the information?',
    modifyCancel: 'Are you sure to cancel modifying a club?'
  },
  categories: [
    { id: 0, type: 0, text: 'Game' },
    { id: 1, type: 1, text: 'Manga / Anime' },
    { id: 2, type: 2, text: 'Broadcasting / Entertainment' },
    { id: 3, type: 3, text: 'Culture / Arts' },
    { id: 4, type: 4, text: 'Movie' },
    { id: 5, type: 5, text: 'Music' },
    { id: 6, type: 6, text: 'Fan cafe' },
    { id: 7, type: 7, text: 'Travel' },
    { id: 8, type: 8, text: 'Sports / Leisure' },
    { id: 9, type: 9, text: 'Pets / Animals' },
    { id: 10, type: 10, text: 'Hobby' },
    { id: 11, type: 11, text: 'Life' },
    { id: 12, type: 12, text: 'Fashion / Beauty' },
    { id: 13, type: 13, text: 'Health / Diet' },
    { id: 14, type: 14, text: 'family / parenting' },
    { id: 15, type: 15, text: 'Computer / Communication' },
    { id: 16, type: 16, text: 'Education' },
    { id: 17, type: 17, text: 'Foreign Language' },
    { id: 18, type: 18, text: 'Humanities / Science' },
    { id: 19, type: 19, text: 'Economy / Finance' },
    { id: 20, type: 20, text: 'Politics / Social' },
    { id: 21, type: 21, text: 'Literature / Creation' },
    { id: 22, type: 22, text: 'Fellowship / Gathering' },
    { id: 23, type: 23, text: 'Religion / Service' }
  ],
  menu: [
    { path: 'dashboard', title: 'Dashboard' },
    { path: 'statistics', title: 'Statistics' },
    { path: 'boards', title: 'Boards' },
    {
      path: 'reports',
      title: 'Reports',
      submenu: [
        { path: 'reports', title: 'Reports' },
        { path: 'reports/settings', title: 'Settings' }
      ]
    },
    { path: 'members', title: 'Members' },
    { path: 'permissions', title: 'Permissions' },
    { path: 'information', title: 'Information' },
    { path: 'design', title: 'Design' },
    {
      path: 'operation',
      title: 'Operation'
    }
  ]
};

export const IVD = {
  none: 'none',
  blur: 'blur',
  focus: 'focus',
  success: 'success',
  error: 'error'
};

export const loadState = {
  LOADING: 0,
  SUCCESS: 1,
  ERROR: 2
};

function Admin({ visibleMenu = false }) {
  const dispatch = useDispatch();
  const { clubAddress } = useParams();

  const isLoading = useSelector((state) => state.commonAdmin.getClubLoading);
  const clubRedux = useSelector((state) => state.commonAdmin.club);

  useEffect(() => {
    dispatch(getClubByAddressInit({ address: clubAddress }));
    return () => {
      dispatch(resetCommonAdmin());
    };
  }, []);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState({ file: {}, base64: '' });
  const [bannerImage, setBannerImage] = useState({ file: {}, base64: '' });
  const adminHeaderProps = useMemo(
    () => ({
      title,
      setTitle,
      description,
      setDescription,
      profileImage,
      setProfileImage,
      bannerImage,
      setBannerImage
    }),
    [title, setTitle, description, setDescription, profileImage, setProfileImage, bannerImage, setBannerImage]
  );

  const init = (club) => {
    setTitle(club.title);
    setDescription(club.description);
    setProfileImage({ file: {}, base64: club.profileImageUrl });
    setBannerImage({ file: {}, base64: club.bannerImageUrl });
  };

  useEffect(() => {
    init(clubRedux);
  }, [clubRedux]);

  const updateBannerImage = ({ base64 }) => {
    // setBannerImage({ file, base64 });
    dispatch(patchClubBannerImageInit({ id: clubRedux?.id, data: { banner_image: base64 } }));
  };
  const updateProfileImage = ({ base64 }) => {
    // setProfileImage({ file, base64 });
    dispatch(patchClubProfileImageInit({ id: clubRedux?.id, data: { profile_image: base64 } }));
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div>
        {/* <Header /> */}
        <div className="admin-root">
          <div className="admin-inner">
            <div className="admin-header-wrapper">
              <AdminHeader
                club={clubRedux}
                editable
                profileImage={profileImage}
                setProfileImage={updateProfileImage}
                bannerImage={bannerImage}
                setBannerImage={updateBannerImage}
                title={title}
                description={description}
              />
            </div>

            {visibleMenu && <Menu menuList={AVD.menu} />}
            {clubRedux?.id && <Outlet context={{ adminHeaderProps }} />}
          </div>
        </div>
      </div>

      <div className="admin" />
    </>
  );
}

export default Admin;
