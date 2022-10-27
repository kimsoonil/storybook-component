/* eslint-disable */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'assets/scss/admin/boards.scss';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import _ from 'lodash';
import JButton from 'components/idist/admin/JButton';
import BoardGroupList from 'components/idist/admin/boards/BoardGroupList';
import {
  getBoardGroupsInit,
  postBoardGroupInit,
  setBoardAdminBoardGroups,
  setBoardGroups,
  setInfo
} from 'redux/idistStore/admin/boardAdminSlice';
import { TextInput } from 'components/idist/admin/TextInput';
import { IVD } from '..';

const rootClassName = 'admin-boards';

const Sidebar = ({
  addState,
  setAddState,

  renameTitle,
  setRenameTitle,
  renameState,
  setRenameState,

  title,
  setTitle
}) => {
  const dispatch = useDispatch();
  const [titleInputState, setTitleInputState] = useState(IVD.blur);

  const onClickAdd = useCallback(() => {
    if (addState?.group) {
      return;
    }
    if (addState) {
      confirm('다른 작업 중입니다.');
      return;
    }
    setTitle('');
    setAddState({ group: true });
    dispatch(setInfo({ isActive: true, title: '', isGroup: true }));
  }, [addState]);

  return (
    <div className={`${rootClassName}-sidebar`}>
      <div className={`${rootClassName}-sidebar-add-group-button-wrapper`}>
        <JButton label={'+ ADD GROUP'} style={{ flex: 1 }} onClick={() => onClickAdd()} />
      </div>

      <div style={{ overflow: 'scroll', paddingBottom: '50px' }}>
        <BoardGroupList
          addState={addState}
          setAddState={setAddState}
          renameTitle={renameTitle}
          setRenameTitle={setRenameTitle}
          renameState={renameState}
          setRenameState={setRenameState}
          title={title}
          setTitle={setTitle}
          titleInputState={titleInputState}
          setTitleInputState={setTitleInputState}
        />

        {addState?.group && (
          <TextInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            maxLength={20}
            state={titleInputState}
            onFocus={() => setTitleInputState(IVD.focus)}
            onBlur={() => setTitleInputState(IVD.blur)}
            // onBlur={() => {
            //   dispatch(postBoardGroupInit({ id: clubRedux.id, data: { title: text, is_active: true } }));
            //   setAddState(null);
            // }}
            containerProps={{ style: { margin: '8px 6px 8px 54px', minHeight: '44px', maxHeight: '44px' } }}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
