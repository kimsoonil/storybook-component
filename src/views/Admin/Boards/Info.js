/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
import React from 'react';
import 'assets/scss/admin/boards.scss';
import { useSelector } from 'react-redux';
import GroupInfo from 'components/idist/admin/boards/GroupInfo';
import BoardInfo from 'components/idist/admin/boards/BoardInfo';
import { BVD } from '.';

const rootClassName = 'admin-boards-info';

function Info({ title, setTitle, setAddState }) {
  const info = useSelector((state) => state.boardAdmin.info);

  return (
    <div className={`${rootClassName}-wrapper`}>
      {info?.isGroup ? (
        <GroupInfo title={title} setTitle={setTitle} setAddState={setAddState} />
      ) : info?.isBoard ? (
        <BoardInfo title={title} setTitle={setTitle} setAddState={setAddState} />
      ) : (
        <div className="boards-content-init">{BVD.initText}</div>
      )}
    </div>
  );
}

export default Info;
