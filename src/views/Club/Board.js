/* eslint-disable */

import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';

import ToggleBtn from 'components/ToggleBtn';
import 'assets/scss/club.scss';
import 'assets/scss/reset.scss';
import { Button } from 'components/Button';

function Board(props) {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [boardSelect, setBoardSelect] = useState('Please select a Board');
  const [openSelect, setOpenSelect] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [tagList, setTagList] = useState([]);

  const config = {
    readonly: false,
    height: 600,
    placeholder: 'Please leave a comment that you want to share.'
  };

  const closeSelect = (text) => {
    setBoardSelect(text);
    setOpenSelect(false);
  };

  const onCheckedElement = (checked, id) => {
    console.log(checked);
    console.log(checkedList);
    if (checked) {
      setCheckedList([...checkedList, id]);
    } else if (!checked) {
      setCheckedList(checkedList.filter((el) => el !== id));
    }
  };
  return (
    <div className="club-home container">
      <div className="item">
        <div className="board">
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
                <div className="board-actions-select-item" onClick={() => closeSelect('Overall Board')}>
                  Overall Board
                </div>
                <div className="board-actions-select-item" onClick={() => closeSelect('Twice')}>
                  Twice
                </div>
                <div className="board-actions-select-item" onClick={() => closeSelect('TWICE schedule')}>
                  TWICE schedule
                </div>
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
              <ToggleBtn id="Notice" onChange={onCheckedElement} />
            </div>
            <div>
              secret post
              <ToggleBtn id="secret" onChange={onCheckedElement} />
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
              <div className="board-actions-select-item" onClick={() => closeSelect('Overall Board')}>
                Overall Board
              </div>
              <div className="board-actions-select-item" onClick={() => closeSelect('Twice')}>
                Twice
              </div>
              <div className="board-actions-select-item" onClick={() => closeSelect('TWICE schedule')}>
                TWICE schedule
              </div>
            </div>
            <div className="board-actions-count flex-center">
              Save as draft <div>|</div> 0
            </div>
            <Button label={'Registration'} size="m" />
          </div>
        </div>
      </div>
      <div className="item">
        <img src={require('images/club/chat-long.png')} alt="" />
      </div>
    </div>
  );
}

export default Board;
