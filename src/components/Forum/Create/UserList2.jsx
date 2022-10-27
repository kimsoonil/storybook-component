import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import userThumb from 'html/img/com/user thumb.png';
const USER_LIST_STAFF = 'staffs';
// const USER_LIST_BAN = 'banned_users';

function BanUser({ userList, onSetList }) {
  return (
    <ul>
      {userList?.map((item) => (
        <li className="option">
          <dl className="search_list">
            <dt>
              <img
                src={item.profileImg}
                alt="test"
                onClick={() => onSetList(item.id)}
                aria-hidden
                style={{ width: '30px', height: '30px' }}
              />
            </dt>
            <dd>
              <span className="point">{item.id}</span>*princess_KY643L
            </dd>
          </dl>
        </li>
      ))}
    </ul>
  );
}

function AddStaff({ userList, onSetList, onDeleteList }) {
  return (
    <ul className="add_staff_list">
      {userList?.map((item) => (
        <li key={item.id}>
          <dl>
            <dt onClick={() => onSetList(item.id)} aria-hidden>
              <img
                src={item.profileImg}
                alt="test"
                onClick={() => onSetList(item.id)}
                aria-hidden
                style={{ width: '30px', height: '30px' }}
              />
            </dt>
            <dd>{item.id}</dd>
            <dd>
              <button type="button" className="delete" onClick={() => onDeleteList(item.id)}>
                <span className="a11y">삭제</span>
              </button>
            </dd>
          </dl>
        </li>
      ))}
    </ul>
  );
}

function UserList2({ forumInfo, setForumInfo, userType }) {
  const { user } = useSelector((state) => ({
    ...state.searchUser
  }));
  const [userList, setUserlist] = useState([]);
  const onSetList = (userId) => {
    if (forumInfo[userType]?.findIndex((item) => item.id === userId) === -1) {
      setForumInfo({ ...forumInfo, [userType]: [...forumInfo[userType], userId] });
    }
  };

  const onDeleteList = (userId) => {
    const arr = userList.filter((item) => item !== userId);
    setUserlist(arr);
  };

  useEffect(() => {
    setUserlist(user);
  }, [user]);
  return (
    <div>
      {userType === USER_LIST_STAFF ? (
        <AddStaff userList={userList} onSetList={onSetList} onDeleteList={onDeleteList} />
      ) : (
        <BanUser userList={forumInfo.banned_users} onSetList={onSetList} onDeleteList={onDeleteList} />
      )}
    </div>
  );
}

export default UserList2;
