import React, { useMemo } from 'react';
import 'assets/scss/admin/admin-header.scss';
import FilePicker from 'components/idist/admin/FilePicker';
import nonSelectedImage from 'images/admin/non-selected-image.svg';
import shareImage from 'images/admin/ic-share.svg';
import bookmarkedImage from 'images/admin/ic-bookmarked.svg';

function AdminHeader({ club, bannerImage, setBannerImage, profileImage, setProfileImage, title, description }) {
  const rootClassName = useMemo(() => 'admin-header', []);

  const bannerStyle = useMemo(
    () =>
      bannerImage?.base64
        ? {
            background: `linear-gradient(to top, rgba(4, 4, 4, 0.7), transparent 160px), no-repeat center/cover url(${bannerImage?.base64})`
          }
        : {},
    [bannerImage?.base64]
  );
  const profileStyle = useMemo(
    () => (profileImage?.base64 ? { background: `no-repeat center/cover url(${profileImage?.base64})` } : {}),
    [profileImage?.base64]
  );

  return (
    <div className={`${rootClassName}-root`}>
      <FilePicker setData={setBannerImage} maxSize={{ value: 20, unit: 'mb' }}>
        <div className={`${rootClassName}-banner-image`} style={bannerStyle}>
          <div className={`${rootClassName}-banner-image-covered`}>
            <img src={nonSelectedImage} alt="non-selected" />
          </div>
        </div>
      </FilePicker>

      <div className={`${rootClassName}-contents`}>
        <div className={`${rootClassName}-contents-left`}>
          <div>
            <div>{club?.memberCount || 0}</div>
            <div>Member</div>
          </div>

          <div>
            <div>{club?.postCount || 0}</div>
            <div>Post</div>
          </div>

          <div>
            <div>{club?.pinCount || 0}</div>
            <div>Book Mark</div>
          </div>
        </div>

        <div className={`${rootClassName}-contents-middle`}>
          <div style={title ? { color: '#121212' } : {}}>{title || 'CLUB NAME'}</div>
          <div style={description ? { color: '#121212' } : {}}>{description || 'Description'}</div>
        </div>

        <div className={`${rootClassName}-contents-right`}>
          <div>
            <img src={shareImage} alt="share" />
          </div>
          <div>
            <img src={bookmarkedImage} alt="bookmarked" />
          </div>
        </div>
      </div>

      <FilePicker setData={setProfileImage} maxSize={{ value: 10, unit: 'mb' }}>
        <div className={`${rootClassName}-profile-image-wrapper`}>
          <div className={`${rootClassName}-profile-image`} style={profileStyle}>
            <div className={`${rootClassName}-profile-image-covered`}>
              <img src={nonSelectedImage} alt="non-selected" />
            </div>
          </div>
        </div>
      </FilePicker>
    </div>
  );
}

export default AdminHeader;
