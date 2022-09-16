import { Header } from 'components/idist/Header';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'assets/scss/admin/admin.scss';
import { Link, useNavigate, Routes, Route, Outlet } from 'react-router-dom';

import Tag from 'components/idist/admin/Tag';
import GoBack from 'components/idist/admin/GoBack';
import ImagePicker from 'components/idist/admin/ImagePicker';
import Menu from 'components/idist/admin/Menu';
import { getIdClubInit, patchIdClubBannerImageInit, patchIdClubProfileImageInit } from 'redux/idistStore/clubSlice';
import { resetCreateClub } from 'redux/idistStore/admin/createClubSlice';

const Admin = ({ visibleMenu = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 임시 코드
  const clubCreated = useSelector((state) => state.createClub.club);
  useEffect(() => {
    dispatch(getIdClubInit(clubCreated?.id || 46));
    dispatch(resetCreateClub);
  }, [clubCreated]);

  const isLoading = useSelector((state) => state.club.isLoading);
  const club = useSelector((state) => state.club?.clubId?.data);
  // const [club, setClub] = useState({});
  // useEffect(() => {
  //   if (clubId?.data) {
  //     setClub(clubId?.data);
  //   }
  // }, [clubId?.data]);

  const updateBanner = ({ data }) => {
    // console.log(data);
    dispatch(patchIdClubBannerImageInit({ id: club?.id, data: { bannerImage: data } }));
  };
  const updateProfile = ({ data }) => {
    dispatch(patchIdClubProfileImageInit({ id: club?.id, data: { profileImage: data } }));
  };

  const bannerBackgroundStyle = useMemo(
    () => ({
      background: club?.bannerImageUrl
        ? `linear-gradient(to top, rgba(4, 4, 4, 0.7), transparent 160px), no-repeat center/cover url(${club?.bannerImageUrl})`
        : '#cdcdd1'
    }),
    [club?.bannerImageUrl]
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
              {club?.tags?.map((item, index) => (
                <Tag key={index} value={item.name} />
              ))}
            </div>

            <div className="banner-profile">
              {club?.profileImageUrl && <img src={club?.profileImageUrl} />}
              <ImagePicker imageSize={60} setImageFile={updateProfile} maxSize={{ value: 10, unit: 'mb' }} />
            </div>
          </div>
        </div>
      </div>
      {/* Title */}
      <div className="layout-title">
        <div className={`text-h1 ${club?.name && `writing`}`}>{club?.name || 'Club Name'}</div>
        <div className={`text-h6 ${club?.description && 'writing'}`}>{club?.description || 'Description'}</div>
      </div>
      <hr style={{ margin: 0, height: 0, borderBottom: 'none' }} />
      {visibleMenu && <Menu menuList={AVD.menu} />}
      {club?.id && <Outlet context={{ club }} />}
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
  popupText: {
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
  menu: ['dashboard', 'statistics', 'boards', 'posts', 'members', 'permissions', 'information', 'design', 'operation']
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
