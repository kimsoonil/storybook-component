import useDetectClose from 'hooks/useDetectClose';
import React, { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router';
import { getBoardGroupInit, renameBoardGroupInit } from 'redux/idistStore/admin/boardAdminSlice';
import { BVD } from 'views/Admin/Boards';
import AddButton from 'views/Admin/Boards/BoardSidebar/AddButton';
import MoreOptionButton from 'views/Admin/Boards/BoardSidebar/MoreOptionButton';
import BoardSidebarNameInput from './BoardSidebarNameInput';
/**
 * board sidebar 에 있는 boardGroup Item
 */
const BoardGroupItem2 = ({
  // contents,
  boardGroup

  // isSelected,
  // isDropDownActive,
  // isRenameActive
}) => {
  // const dispatch = useDispatch();
  // const outlet = useOutletContext();
  // const clubId = outlet.club.id || 22;

  // const isDefault = useMemo(() => boardGroup.type === 'DEFAULT', [boardGroup.type]);
  // const activeGroupClassName = useMemo(() => (boardGroup.is_active ? 'active' : 'inactive'), [boardGroup.is_active]);
  // const selectedGroupClassName = isSelected || isDropDownActive ? 'selected' : 'none';

  // const [isExpanded, setExpanded] = useState(false);

  // const dropDownButtonRef = useRef(null);
  // const [dropdownState, setDropdownState] = useDetectClose(dropDownButtonRef, false);

  // const selectedClassName = useMemo(
  //   () => (isSelected || dropdownState ? 'selected' : 'none'),
  //   [dropdownState, isSelected]
  // );
  // const dropdownSelectedClassName = useMemo(() => (dropdownState ? 'selected' : 'none'), [dropdownState]);
  // const activeClassName = useMemo(() => (boardGroup.is_active ? 'active' : 'inactive'), [boardGroup.is_active]);

  // const stopPropagation = (e) => e?.stopPropagation();

  // const onClickGroup = ({ id }) => {
  //   dispatch(getBoardGroupInit({ id }));
  // };

  // const expandImage = useMemo(
  //   () =>
  //     isExpanded
  //       ? require('images/admin/ic-select-arrow-close-on.svg').default
  //       : require('images/admin/ic-select-arrow-open-on.svg').default,
  //   [isExpanded]
  // );
  // const onClickExpand = (e) => {
  //   stopPropagation(e);
  //   setExpanded((prev) => !prev);
  // };

  // const [renameState, setRenameState] = useState(false);
  // const [name, setName] = useState(boardGroup.name);
  // const onRename = ({ id, value, clubId }) => {
  //   dispatch(renameBoardGroupInit({ id, data: { name: value }, clubId }));
  //   setRenameState(false);
  // };

  // const onClickAddBoard = (id) => {
  //   setExpanded(true);
  //   setAddState({ boardParent: id });
  // };

  const [boardName, setBoardName] = useState('');

  const selectedGroupClassName = '';
  const expandImage = '';
  const activeGroupClassName = '';
  return (
    <div>
      <div className={`gp-name text-h5 gp-name-${selectedGroupClassName} `} onClick={() => {}}>
        <img className="expand-image" src={expandImage} onClick={() => {}} />
        <div className={`gp-name-text gp-name-text-${activeGroupClassName}`}>{boardGroup.name}</div>
        {/* {!isDefault && ( */}
        <MoreOptionButton
          onClick={() => {}}
          onClickOutside={() => {}}
          menuList={[
            { label: BVD.dropdown.rename, onClick: () => {} },
            { label: BVD.dropdown.active(boardGroup.is_active), onClick: () => {} }
          ]}
        />
        {/* )} */}
        <AddButton selected={true} onClick={() => {}} />
      </div>
    </div>
  );
};

export default BoardGroupItem2;
