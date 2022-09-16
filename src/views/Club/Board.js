/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
import JoditEditor, { Jodit } from 'jodit-pro-react';
import { useSelector, useDispatch } from 'react-redux';
import { getClubBoardGroupsInit } from 'redux/idistStore/clubSlice';

import ToggleBtn from 'components/idist/ToggleBtn';
import { useParams } from 'react-router';
import { Button } from 'components/idist/Button';
import { Loader } from 'components/idist/Loader';
import 'assets/scss/club.scss';
import 'assets/scss/jodit.scss';
import 'assets/scss/reset.scss';

function Board(props) {
  const editor = useRef(null);
  const dispatch = useDispatch();
  const clubState = useSelector((state) => state.club);
  const [content, setContent] = useState('');
  const [boardSelect, setBoardSelect] = useState('Please select a Board');
  const [openSelect, setOpenSelect] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getClubBoardGroupsInit(id));
  }, []);

  const { isLoading, boardGroups } = clubState;

  const config = {
    readonly: false,
    height: 600,
    padding: 20,
    placeholder: 'Please leave a comment that you want to share.',
    license: '63DFM-3/H53-ATPPJ-RGIRZ',
    uploader: {
      url: 'https://xdsoft.net/jodit/finder/?action=fileUpload'
    },
    buttons: [
      // 'emoji',
      // 'image',
      // 'video',
      // 'file',
      // '\n',
      'undo',
      'redo',
      '|',
      'brush',
      'bold',
      'italic',
      '|',
      'left',
      'center',
      'right',
      '|',
      'ol',
      'ul',
      '|',
      'table'
    ]
  };
  function preparePaste(jodit) {
    jodit.e.on(
      'emoji',
      (e) => {
        if (confirm('Change pasted content?')) {
          jodit.e.stopPropagation('paste');
          jodit.s.insertHTML(
            Jodit.modules.Helpers.getDataTransfer(e).getData(Jodit.constants.TEXT_HTML).replace(/a/g, 'b')
          );
          return false;
        }
      },
      { top: true }
    );
  }
  Jodit.plugins.add('preparePaste', preparePaste);
  const closeSelect = (text) => {
    setBoardSelect(text);
    setOpenSelect(false);
  };

  const onCheckedElement = (checked, id) => {
    if (checked) {
      setCheckedList([...checkedList, id]);
    } else if (!checked) {
      setCheckedList(checkedList.filter((el) => el !== id));
    }
  };
  if (boardGroups.message !== 'ok')
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  return (
    <div className="club-home ">
      <div className="board ">
        <div className="flex-between">
          <div className="board-title">Writing</div>
          <div className="board-actions relative">
            <div className="board-actions-select flex-center" onClick={() => setOpenSelect(!openSelect)}>
              {boardSelect}
              <img src={require('images/club/arrow-bottom.png')} alt="" />
            </div>
            <div className={'board-actions-select-box ' + (openSelect ? '' : 'none')}>
              <div className="board-actions-select-item" onClick={() => closeSelect('Please select a Board')}>
                Please select a Board
              </div>
              {boardGroups.data.map((boardGroups, index) => {
                return (
                  <div className="board-actions-select-item" key={index} onClick={() => closeSelect(boardGroups.name)}>
                    {boardGroups.name}
                  </div>
                );
              })}
            </div>
            <div className="board-actions-count flex-center">
              Save as draft <div>|</div> 0
            </div>
            <Button label={'Registration'} size="m" />
          </div>
        </div>
        <div className="board-input">
          <input placeholder="Please enter a title" />
        </div>
        <div className="jodit-tobar">
          <div className="editer-icon">
            <img src={require('images/editor/icon-emoticon.png')} alt="" />
          </div>
          <div className="editer-icon">
            <img src={require('images/editor/icon-image.png')} alt="" />
          </div>
          <div className="editer-icon">
            <img src={require('images/editor/icon-gif.png')} alt="" />
          </div>
          <div className="editer-icon">
            <img src={require('images/editor/icon-video.png')} alt="" />
          </div>
          <div className="editer-icon">
            <img src={require('images/editor/icon-file.png')} alt="" />
          </div>
        </div>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {}}
        />
        <div className="board-tag">
          <div className="board-tag-item flex-center">
            <input placeholder="#Tag" />
          </div>
        </div>
        <div className="board-allow">
          <div>
            Allow Comments
            <ToggleBtn id="Comments" onChange={onCheckedElement} />
          </div>
          <div>
            Allow Sharing
            <ToggleBtn id="Sharing" onChange={onCheckedElement} />
          </div>
          <div>
            Allow Search
            <ToggleBtn id="Search" onChange={onCheckedElement} />
          </div>
          <div>
            Register as a Notice
            <ToggleBtn id="Notice" onChange={onCheckedElement} disabled={checkedList.indexOf('secret') > -1} />
          </div>
          <div>
            secret post
            <ToggleBtn id="secret" onChange={onCheckedElement} disabled={checkedList.indexOf('Notice') > -1} />
          </div>
        </div>
        {checkedList.indexOf('secret') > -1 && (
          <div className="board-password">
            <div className="board-password-input">
              password <input /> <Button label="Duplication" size="s" style={{ width: '100px', height: '30px' }} />
            </div>
            <div className="remark">*You can view posts via links or by entering passwords.</div>
          </div>
        )}
      </div>
      <div className="board-bottom-actions">
        <div className="board-actions relative">
          <div className="board-actions-select flex-center" onClick={() => setOpenSelect(!openSelect)}>
            {boardSelect}
            <img src={require('images/club/arrow-bottom.png')} alt="" />
          </div>
          <div className={'board-actions-select-box ' + (openSelect ? '' : 'none')}>
            <div className="board-actions-select-item" onClick={() => closeSelect('Please select a Board')}>
              Please select a Board
            </div>
            {boardGroups.data.map((boardGroups, index) => {
              return (
                <div className="board-actions-select-item" key={index} onClick={() => closeSelect(boardGroups.name)}>
                  {boardGroups.name}
                </div>
              );
            })}
          </div>
          <div className="board-actions-count flex-center">
            Save as draft <div>|</div> 0
          </div>
          <Button label={'Registration'} size="m" />
        </div>
      </div>
    </div>
  );
}

export default Board;
