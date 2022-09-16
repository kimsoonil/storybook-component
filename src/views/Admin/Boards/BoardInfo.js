import React, { useEffect, useMemo, useState } from 'react';
import 'assets/scss/admin/boards.scss';
import { useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getClubBoardGroupsInit } from 'redux/idistStore/clubSlice';
import { getIdBoardGroupInit, patchBoardGroupInit } from 'redux/idistStore/boardGroupSlice';

import { Loader } from 'components/idist/Loader';
import { getIdBoardInit } from 'redux/idistStore/boardSlice';
import _ from 'lodash';
import RadioButton from 'components/idist/admin/RadioButton';
import { BVD } from './index';
import JButton from 'components/idist/admin/JButton';
import Select from 'components/idist/admin/JSelect';

const BoardInfo = ({ id }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('board api 호출');
    if (id > 0) {
      dispatch(getIdBoardInit({ id }));
    }
  }, [id]);

  const boardState = useSelector((state) => state.board);
  const { isLoading, board } = boardState;

  // if (board?.data) {
  //   console.log('board : ', board?.data);
  //   console.log('board : ', board?.data);
  //   console.log('board : ', board?.data);
  //   console.log('board : ', board?.data);
  // }

  // useEffect(() => {}, []);
  // const dispatch = useDispatch();
  // // 이거 사용할 것
  // const outlet = useOutletContext();
  // /**
  //  * boards: Array {
  //  *   id: 101
  //  *   name: string
  //  *   order: Number
  //  * }
  //  * club: Number
  //  * id: Number
  //  * name: String
  //  * order: Number
  //  */
  // const clubState = useSelector((state) => state.club);
  // const { isLoading, boardGroups } = clubState;

  // const [extended, setExtended] = useState(
  //   boardGroups.data ? boardGroups.data.reduce((acc, cur) => ({ ...acc, [cur.id]: false }), {}) : {}
  // );

  // const boardState = useSelector((state) => state.board);
  // const { isLoading: boardLoading, board } = boardState;

  // const [type, setType] = useState(0); // 0: boardGroup, 1: board

  // useEffect(() => {
  //   const id = outlet.club.id || 42;
  //   dispatch(getClubBoardGroupsInit(id));
  // }, []);

  // const onClickBoardGroup = ({ id }) => {
  //   setType(0);
  //   if (false) {
  //     // 전에 호출된 적이 있는지?
  //     // 클럽 리덕스 업데이트
  //   } else {
  //     // 호출된 적이 없다면? 근데 지금 에러남
  //     dispatch(getIdBoardGroupInit({ id }));
  //   }
  // };

  // const extendGroup = ({ id }) => {
  //   setExtended((prev) => ({ ...prev, [id]: !prev[id] }));
  // };

  // const onClickBoard = ({ id }) => {
  //   dispatch(getIdBoardInit({ id }));
  //   // setGroupList((prev) =>
  //   //   prev.map((group) =>
  //   //     group.groupId === groupId
  //   //       ? {
  //   //           ...group,
  //   //           boardList: group.boardList.map((board) =>
  //   //             board.boardName === boardName ? { ...board, active: true } : { ...board, active: false }
  //   //           )
  //   //         }
  //   //       : group
  //   //   )
  //   // );
  // };

  // if (isLoading || boardGroups.message !== 'ok') {
  //   return (
  //     <div className="root-center">
  //       <Loader />
  //     </div>
  //   );
  // }

  const options = [];
  return (
    <div>
      <div className="boards-contents ">
        {/* Activation */}
        <div className="info-title">{BVD.activation.title}</div>
        <div className="info-desc">{BVD.activation.subtitle}</div>
        <div className="activation-radio-wrapper">activation radio</div>

        {/* Name */}
        <div className="name-wrapper">
          <div className="info-title">{BVD.name.title}</div>
          <div className="essential" />
        </div>
        <div className="name-input-wrapper">
          <input className="itxt-placeholder" type={'text'} placeholder={BVD.name.placeholder} maxLength={20} />
          <div className="name-count">
            <b>0</b>/20
          </div>
        </div>

        {/* Description */}
        <div className="info-title">{BVD.description.title}</div>
        <div className="desc-input-wrapper">
          <textarea className="itxt-placeholder" placeholder={BVD.description.placeholder} maxLength={160} />
          <div className="desc-count">
            <b>0</b>/160
          </div>
        </div>

        {/* Permission */}
        <div className="info-title">{BVD.permission.title}</div>
        <div className="info-desc">{BVD.permission.subtitle}</div>

        <div className="permission">
          <div className="permission-row-wrapper">
            <div className="select">
              <div className="select-label itxt-label">{BVD.permission.read}</div>
              <div className="select-width">
                <Select options={options} />
              </div>
            </div>

            <div className="select">
              <div className="select-label-grade itxt-label">{BVD.permission.readGrade}</div>
              <div className="select-width">
                <Select options={options} />
                <div className="itxt-green notice-text">{BVD.permission.readGradeUnder('bronze')}</div>
              </div>
            </div>
          </div>

          <div className="permission-row-wrapper">
            <div className="select">
              <div className="select-label itxt-label">{BVD.permission.write}</div>
              <div className="select-width">
                <Select options={options} />
              </div>
            </div>

            <div className="select">
              <div className="select-label-grade itxt-label">{BVD.permission.writeGrade}</div>
              <div className="select-width">
                <Select options={options} />
                <div className="itxt-green notice-text">{BVD.permission.writeGradeUnder('bronze')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ViewMode */}
        <div className="info-title">{BVD.viewMode.title}</div>
        <div className="info-desc">{BVD.viewMode.subtitle}</div>

        <div className="mode">
          <div className="mode-box">
            <div className="mode-box-title-wrapper">
              <img />
              <div className="mode-box-title">{BVD.viewMode.album.title}</div>
            </div>
            <div className="mode-box-desc">{BVD.viewMode.album.subtitle}</div>
          </div>
        </div>
      </div>
      <div>
        button wrapper
        <div>cancel</div>
        <div>save</div>
      </div>
    </div>
  );
};

export default BoardInfo;
