/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import JoditEditor from 'jodit-react';
import { useNavigate } from 'react-router-dom';
import ToggleBtn from 'components/idist/ToggleBtn';
import { Button } from 'components/idist/Button';
import AlertPopup from 'components/idist/popup/AlertPopup';
import TempPopup from 'components/idist/popup/tempPopup';
import ConfirmPopup from 'components/idist/popup/ConfirmPopup';
import 'assets/scss/club.scss';
import 'assets/scss/jodit.scss';

function Writing(props) {
  const editor = useRef(null);
  const navigate = useNavigate();
  const [isHidePassword, setIsHidePassword] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [tempPopupOpen, setTempPopupOpen] = useState(false);
  const [joditConfig] = useState({
    toolbarStyle: 'top',
    minHeight: '615px',
  });

  const closeSelect = (text, id) => {
    props.setPostsData({ ...props.postsData, board: id });
    props.setBoardSelect(text);
    setOpenSelect(false);
  };

  const onlyNumber = (e) => {
    const { value } = e.target;

    const onlyNumberRegular = value.replace(/[^0-9]/g, '');
    props.setPostsData({ ...props.postsData, password: onlyNumberRegular });
  };

  const postCancel = (e) => {
    // props.setPwdPopupOpen(true);
    // props.setPopupContent(
    //   'When you load a temporary text, the writing\nyou are creating disappears. Are you sure\nyou want to load the selected text?'
    // );
    if (
      confirm(
        'When you load a temporary text, the writing\nyou are creating disappears. Are you sure\nyou want to load the selected text?'
      )
    ) {
      navigate(-1);
    }
  };

  return (
    <div className="club-home writing ">
      <div>
        <div className="flex-between board-actions ">
          <Button label={'Cancel'} size={'m'} onClick={() => postCancel()} />
          <div className="flex-center board-actions-right relative">
            {props.type === 'club' && (
              <>
                <div className="board-actions-select " onClick={() => setOpenSelect(!openSelect)}>
                  {props?.boardSelect}
                  <img src={require('images/club/arrow-bottom.png')} alt="" />
                </div>

                <div className={'board-actions-select-box ' + (openSelect ? '' : 'none')}>
                  <div
                    className="board-actions-select-item flex-between"
                    onClick={() => props.closeSelect(props?.boardSelect, props?.postsData?.board)}
                  >
                    {props?.boardSelect}
                    <img src={require('images/club/arrow-bottom.png')} alt="" />
                  </div>
                  {props?.boardGroups?.data.map((boardGroupsItem, index) => {
                    return (
                      <div key={index}>
                        <div className="board-actions-select-boardGroup">{boardGroupsItem?.title}</div>
                        {boardGroupsItem?.boards.map((boardItem, index) => {
                          return (
                            <div
                              className="board-actions-select-item"
                              key={index}
                              onClick={() => closeSelect(boardItem.title, boardItem.id)}
                            >
                              {boardItem.title}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
                <div className="board-actions-count flex-center">
                  <div onClick={() => props.postsCreate('temp')}>Save as draft</div> <div className="bar"></div>
                  <div onClick={() => setTempPopupOpen(!tempPopupOpen)}>{props.posts?.data?.length || 0}</div>
                </div>
                <TempPopup
                  open={tempPopupOpen}
                  setOpen={() => setTempPopupOpen()}
                  tempAllDetele={props?.tempAllDetele}
                  tempSelectDetele={props?.tempSelectDetele}
                  posts={props?.posts}
                />
              </>
            )}
            <Button label={'Post'} size="m" onClick={() => props.postsCreate()} />
          </div>
        </div>
        <div className="board">
          <div className="board-input">
            <input
              placeholder="Please enter a title"
              value={props.postsData.title || ''}
              onChange={(e) => props.setPostsData({ ...props.postsData, title: e.target.value })}
            />
          </div>
          <JoditEditor
            ref={editor}
            config={joditConfig}
            value={props.postsData.content}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => props.setPostsData({ ...props.postsData, content: newContent })} // preferred to use only this option to update the content for performance reasons
          />
          {props.type === 'club' && (
            <>
              <div className="board-tag">
                <div className="board-tag-item flex-center">
                  {props.tagList.map((tagItem, index) => {
                    return (
                      <div key={index}>
                        <div
                          style={{ display: props.tagEditId === tagItem.tag ? 'none' : 'inline' }}
                          className="board-tag-item-list flex-center"
                          onClick={() => props.tagEditer(tagItem)}
                        >
                          # {tagItem.title}
                          <img
                            className="board-tag-close"
                            src={require('images/club/btn-close.png')}
                            onClick={() => props.tagDelect(tagItem.tag)}
                          />
                        </div>
                        <input
                          className="tag-edit"
                          style={{ display: props.tagEditId === tagItem.tag ? 'flex' : 'none' }}
                          placeholder="#Tag"
                          maxLength={20}
                          onKeyPress={(e) => props.tagEditKeyUP(e, tagItem.tag)}
                          // onBlur={(e) => tagKeyBlur(e)}
                          value={props.tagEditValue}
                          onChange={(e) => props.setTagEditValue(e.target.value)}
                        />
                      </div>
                    );
                  })}
                  {props.tagList.length < 10 && (
                    <input
                      maxLength={20}
                      className="tag-input"
                      placeholder="#Tag"
                      onKeyPress={(e) => props.tagKeyUP(e)}
                      // onBlur={(e) => tagKeyBlur(e)}
                      value={props.tagVale}
                      onChange={(e) => props.setTagVale(e.target.value)}
                    />
                  )}
                </div>
              </div>
              <div className="board-allow">
                <div>
                  Allow Comments
                  <ToggleBtn id="Comments" onChange={props.onCheckedElement} />
                </div>
                <div>
                  Allow Sharing
                  <ToggleBtn id="Sharing" onChange={props.onCheckedElement} />
                </div>
                <div>
                  Allow Search
                  <ToggleBtn id="Search" onChange={props.onCheckedElement} />
                </div>
                <div onClick={() => props.onClickElement('Notice')}>
                  Register as a Notice
                  <ToggleBtn
                    id="Notice"
                    onChange={props.onCheckedElement}
                    disabled={props.checkedList.indexOf('secret') > -1}
                  />
                </div>
                <div onClick={() => props.onClickElement('event')}>
                  Event Notice
                  <ToggleBtn
                    id="event"
                    onChange={props.onCheckedElement}
                    disabled={props.checkedList.indexOf('Notice') > -1}
                  />
                </div>
              </div>
              <div className="board-allow">
                <div onClick={() => props.onClickElement('secret')}>
                  secret post
                  <ToggleBtn
                    id="secret"
                    onChange={props.onCheckedElement}
                    disabled={props.checkedList.indexOf('Notice') > -1}
                  />
                </div>
                {props.checkedList.indexOf('secret') > -1 && (
                  <div className="board-password ">
                    <div className="board-password-input relative">
                      password
                      <input
                        value={props.postsData.password || ''}
                        maxLength="4"
                        type={isHidePassword ? 'text' : 'password'}
                        onChange={(e) => onlyNumber(e)}
                      />
                      {isHidePassword ? (
                        <div className="password-btn" onClick={() => setIsHidePassword(!isHidePassword)}>
                          <img src={require('images/club/ic-show-gr.png')} />
                        </div>
                      ) : (
                        <div className="password-btn" onClick={() => setIsHidePassword(!isHidePassword)}>
                          <img src={require('images/club/ic-hide-gr.png')} />
                        </div>
                      )}
                    </div>
                    {props.postsData.password.length === 4 || props.postsData.password.length === 0 ? (
                      <div className="remark">*You can view posts by entering your password.</div>
                    ) : (
                      <div className="password-error">*Please enter a four-digit password.</div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <AlertPopup content={props.popupContent} open={props.pwdPopupOpen} setOpen={() => props.setPwdPopupOpen(false)} />
    </div>
  );
}

export default Writing;
