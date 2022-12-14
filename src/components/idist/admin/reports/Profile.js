import React from 'react';

function Profile({ user }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4px', cursor: 'pointer' }}
        onClick={() => {
          // confirm('프로필 팝업 띄우기');
        }}
        onKeyDown={(e) => (e.key === 'Enter' ? {} : {})}
        tabIndex={0}
        role="button"
      >
        <img
          src={user.profileImage}
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '20px',
            border: '1px solid #8801FE',
            boxSizing: 'border-box'
          }}
          alt="profile"
        />
        <div style={{ marginTop: '4px', marginLeft: '10px', fontWeight: 600 }}>{user.name}</div>
      </div>
    </div>
  );
}

export default Profile;
