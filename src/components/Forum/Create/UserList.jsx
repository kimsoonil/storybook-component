import React from 'react';
import { useSelector } from 'react-redux';

function UserList({ info, setInfo, type }) {
  const { user } = useSelector((state) => ({
    ...state.searchUser
  }));
  const onSetList = (userId) => {
    if (info[type]?.map((item) => item.id === userId)) return;
    const arrNew = [...info[type], { id: userId }];
    setInfo({ ...info, [type]: arrNew });
  };
  return (
    <ul>
      {user?.map((item) => (
        <div key={item.id}>
          <li key={item.id} onClick={() => onSetList(item.id)} aria-hidden>
            {item.id}
          </li>
          <span>
            <button
              type="button"
              onClick={() => setInfo({ ...info, [type]: [...[type].filter((userList) => userList.id !== item.id)] })}
            >
              X
            </button>
          </span>
        </div>
      ))}
    </ul>
  );
}

export default UserList;
