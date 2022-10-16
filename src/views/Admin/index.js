import { Header } from 'components/idist/Header';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'assets/scss/admin/admin.scss';
import { Link, useNavigate, Routes, Route, Outlet } from 'react-router-dom';

import Tag from 'components/idist/admin/Tag';
import GoBack from 'components/idist/admin/GoBack';
import ImagePicker from 'components/idist/admin/ImagePicker';
import Menu from 'components/idist/admin/Menu';
import {
  getClubInit,
  patchClubBannerImageInit,
  patchClubProfileImageInit
} from 'redux/idistStore/admin/commonAdminSlice';

const Admin = ({ visibleMenu = false }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.commonAdmin.getClubLoading);
  const clubRedux = useSelector((state) => state.commonAdmin.club);

  useEffect(() => {
    // if (clubRedux?.id) {
    //   console.log(123);
    //   // dispatch(getClubInit({ id: clubCreated?.id || 22 }));
    // } else {
    dispatch(getClubInit({ id: 22 }));
    // }
  }, []);

  const [adminState, setAdminState] = useState({
    name: '',
    description: '',
    profileImage: {
      data: { file: '', base64: '' },
      url: ''
    },
    bannerImage: {
      data: { file: '', base64: '' },
      url: ''
    },
    tags: []
  });

  useEffect(() => {
    if (clubRedux?.id) {
      init();
    }
  }, [clubRedux]);

  const init = () => {
    setAdminState({
      name: clubRedux?.name,
      description: clubRedux?.description || '',

      profileImage: {
        data: { file: '', base64: '' },
        url: clubRedux?.profile_image_url
      },
      bannerImage: {
        data: { file: '', base64: '' },
        url: clubRedux?.banner_image_url
      },
      tags: clubRedux?.tags
    });
  };

  const updateBanner = ({ base64 }) => {
    dispatch(patchClubBannerImageInit({ id: clubRedux?.id, data: { banner_image: base64 } }));
  };
  const updateProfile = ({ base64 }) => {
    dispatch(patchClubProfileImageInit({ id: clubRedux?.id, data: { profile_image: base64 } }));
  };

  const bannerBackgroundStyle = useMemo(
    () =>
      adminState?.bannerImage?.data?.base64
        ? { backgroundImage: `url(${adminState?.bannerImage?.data?.base64})` }
        : {
            background: adminState?.bannerImage?.url
              ? `linear-gradient(to top, rgba(4, 4, 4, 0.7), transparent 160px), no-repeat center/cover url(${adminState?.bannerImage?.url})`
              : '#cdcdd1'
          },
    [adminState?.bannerImage?.url]
  );

  if (isLoading) {
    return null;
  }

  return (
    <div className="admin">
      <Header />
      {/* Banner */}
      <div className="layout-banner" style={bannerBackgroundStyle}>
        <ImagePicker imageSize={90} setImageFile={updateBanner} maxSize={{ value: 20, unit: 'mb' }} />
        <div className="banner-inner">
          <GoBack />
          <div className="banner-content-wrapper">
            <div className="banner-tags">
              {adminState?.tags?.map((item, index) => (
                <Tag key={index} value={item.name} />
              ))}
            </div>

            <div className="banner-profile">
              {adminState?.profileImage?.data?.base64 ? (
                <img src={adminState?.profileImage?.data?.base64} />
              ) : adminState?.profileImage?.url ? (
                <img src={adminState?.profileImage?.url} />
              ) : (
                <></>
              )}
              <ImagePicker imageSize={60} setImageFile={updateProfile} maxSize={{ value: 10, unit: 'mb' }} />
            </div>
          </div>
        </div>
      </div>
      {/* Title */}
      <div className="layout-title">
        <div className={`text-h1 ${adminState?.name && `writing`}`}>{adminState?.name || 'Club Name'}</div>
        <div className={`text-h6 ${adminState?.description && 'writing'}`}>
          {adminState?.description || 'Description'}
        </div>
      </div>
      <hr style={{ margin: 0, height: 0, borderBottom: 'none' }} />
      {visibleMenu && <Menu menuList={AVD.menu} />}
      {clubRedux?.id && <Outlet context={{ club: clubRedux, adminState, setAdminState }} />}
    </div>
  );
};

export default Admin;

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
    extraText: '/60 characters'
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
