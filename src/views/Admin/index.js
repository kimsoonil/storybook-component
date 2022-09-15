import { Header } from 'components/Header';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'assets/scss/admin/admin.scss';
import { Link, useNavigate, Routes, Route, Outlet } from 'react-router-dom';

import Tag from 'components/admin/Tag';
import { admin as constants } from 'constants';
import GoBack from 'components/admin/GoBack';
import ImagePicker from 'components/admin/ImagePicker';
import Menu from 'components/admin/Menu';
import { getIdClubInit, patchIdClubBannerImageInit, patchIdClubProfileImageInit } from 'redux/store/clubSlice';
import { resetCreateClub } from 'redux/store/admin/createClubSlice';

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
      {visibleMenu && <Menu menuList={constants.menu} />}
      <Outlet context={{ club }} />
    </div>
  );
};

export default Admin;
