import { Header } from 'components/Header';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'assets/scss/admin/admin.scss';
import { Link, useNavigate, Routes, Route, Outlet } from 'react-router-dom';
import { getMyClub, updateBannerImage, updateProfileImage } from 'redux/store/club/clubSlice';

import { TextInput } from 'components/admin/TextInput';
import Select from 'components/admin/Select';
import RadioButton from 'components/admin/RadioButton';
import FilePicker from 'components/admin/FilePicker';
import Tag from 'components/admin/Tag';
import JButton from 'components/admin/JButton';
import { openCreateClubPopup } from 'redux/store/popupSlice';
import { CreateClubPopup } from 'components/popup/CreateClubPopup';
import { admin as constants, loadState } from 'constants';
import GoBack from 'components/admin/GoBack';
import ImagePicker from 'components/admin/ImagePicker';
import Menu from 'components/admin/Menu';

const Admin = ({ visibleMenu = false }) => {
  console.log('Render Admin');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myClub = useSelector((state) => state.clubAdnim.myClub);

  useEffect(() => {
    dispatch(getMyClub());
    return () => {};
  }, []);

  // const [tmpName, setTmpName] = useState(myClub.name);
  // const [tmpAddress, setTmpAddress] = useState(myClub.address);
  // const [currentCategory, setCurrentCategory] = useState(myClub.category);
  // const [tmpProfile, setTmpProfile] = useState(myClub.profile.data || '');
  // const [tmpBanner, setTmpBanner] = useState(myClub.banner.data || '');
  // const [tmpDescription, setTmpDescription] = useState(myClub.description);
  // const [tags, setTags] = useState(myClub.tags);
  // const [currentTagText, setCurrentTagText] = useState('');
  // const [autoApproval, setAutoApproval] = useState(myClub.autoApproval);

  const updateBanner = (data) => {
    dispatch(updateBannerImage(data));
  };
  const updateProfile = (data) => {
    dispatch(updateProfileImage(data));
  };

  const tmpImageUrl =
    'https://store.nintendo.co.kr/media/catalog/product/cache/8e3c84988db1fdb90470f4d01453d879/f/1/f1715bebde9ecc2e1cecc33e35166cbf87233ae35cc4dd6649645acc3a036696.jpg';
  // const bannerBackgroundStyle = {
  //   background: `linear-gradient(to top, rgba(4, 4, 4, 0.7), transparent 160px), no-repeat center/cover url(${
  //     myClub.banner.data || tmpImageUrl
  //   })`
  // };

  return (
    <div className="admin">
      <Header />
      {/* Banner */}
      <div className="layout-banner">
        <ImagePicker imageSize={90} setImageFile={updateBanner} />
        <div className="banner-inner">
          <GoBack />
          <div className="flex">
            <div className="banner-tags">
              {myClub.tags.map((item, index) => (
                <Tag key={index} value={item} />
              ))}
            </div>

            <div style={{ position: 'relative', flex: 1 }}>
              <div className="banner-profile">
                <ImagePicker imageSize={60} setImageFile={updateProfile} />
                <div className="banner-profile-image">
                  <img src={myClub.profile.data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Title */}
      <div className="layout-title">
        <div className={`text-h1 ${myClub.name && `writing`}`}>{myClub.name || 'Club Name'}</div>
        <div className={`text-h6 ${myClub.description && 'writing'}`}>{myClub.description || 'Description'}</div>
      </div>
      <hr style={{ margin: 0, height: 0, borderBottom: 'none' }} />
      {visibleMenu && <Menu menuList={constants.menu} />}
      <Outlet />
    </div>
  );
};

export default Admin;
