import React from 'react';
import userThumb from 'html/img/com/user thumb.png';

function AddedList({ userList, onDeleteList, userType }) {
  return (
    <ul className="add_staff_list">
      {userList?.map((item) => (
        <li key={item}>
          <dl>
            <dt>
              <img src={userThumb} alt="test" aria-hidden style={{ width: '30px', height: '30px' }} />
            </dt>
            <dd>{item}</dd>
            <dd>
              <button type="button" className="delete" onClick={() => onDeleteList(item, userType)}>
                <span className="a11y">삭제</span>
              </button>
            </dd>
          </dl>
        </li>
      ))}
    </ul>
  );
}

export default AddedList;
