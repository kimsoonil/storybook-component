/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
import JoditEditor, { Jodit } from 'jodit-pro-react';
import { useSelector, useDispatch } from 'react-redux';
import { getClubBoardGroupsInit, deleteClubTemporaryInit } from 'redux/idistStore/clubSlice';
import { getPostsInit, deletePostTemporaryInit, getPostInit, patchPostInit } from 'redux/idistStore/postsSlice';
import { postBoardPostInit, boardReset } from 'redux/idistStore/boardSlice';
import { useNavigate } from 'react-router-dom';
import ToggleBtn from 'components/idist/ToggleBtn';
import { useParams } from 'react-router';
import { Button } from 'components/idist/Button';
import { Loader } from 'components/idist/Loader';
import AlertPopup from 'components/idist/popup/AlertPopup';
import TempPopup from 'components/idist/popup/tempPopup';
import ConfirmPopup from 'components/idist/popup/ConfirmPopup';
import 'assets/scss/club.scss';
import 'assets/scss/jodit.scss';

function Writing(props) {
  const editor = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boardGroups } = useSelector((state) => state.club);
  const boardState = useSelector((state) => state.board);
  const { posts, post } = useSelector((state) => state.post);
  const { id, postId } = useParams();
  const [boardSelect, setBoardSelect] = useState('Please select a Board');
  const [openSelect, setOpenSelect] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [tagVale, setTagVale] = useState('');
  const [tagEditId, setTagEditId] = useState('');
  const [tagEditValue, setTagEditValue] = useState('');
  const [tempPopupOpen, setTempPopupOpen] = useState(false);
  const [pwdPopupOpen, setPwdPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState('');
  const [postsData, setPostsData] = useState({
    board: null,
    title: '',
    content: '',
    tags: [],
    is_temporary: false,
    is_secret: false,
    password: null,
    is_notice: false,
    is_event: false,
    is_search: false,
    is_share: false,
    is_comment: false
  });

  useEffect(() => {
    dispatch(boardReset());
    dispatch(getClubBoardGroupsInit({ id: id }));
    dispatch(getPostsInit({ parameters: { is_temporary: true } }));
  }, []);

  useEffect(() => {
    if (postId !== undefined) {
      dispatch(getPostInit({ id: postId }));
    }
  }, [postId]);

  useEffect(() => {
    if (boardState.post.data) {
      if (!boardState.post.data.is_temporary)
        navigate(`/club/${boardState.post.data.club}/post/${boardState.post.data.id}`);
    }
  }, [boardState.post]);

  useEffect(() => {
    if (post.message === 'ok' && postId !== undefined) {
      setTagList([...post.data.tags.map((item) => item)]);

      setPostsData({
        board: post.data.board,
        title: post.data.title,
        content: post.data.content,
        tags: tagList,
        is_temporary: post.data.is_temporary,
        is_secret: post.data.is_secret,
        password: post.data.password,
        is_notice: post.data.is_notice,
        is_event: post.data.is_event,
        is_search: post.data.is_search,
        is_share: post.data.is_share,
        is_comment: post.data.is_comment
      });
      setBoardSelect(post.data.board_title);
    }
  }, [post]);

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

  const closeSelect = (text, id) => {
    // setBoardId(id);
    setPostsData({ ...postsData, board: id });
    setBoardSelect(text);
    setOpenSelect(false);
  };

  const onCheckedElement = (checked, id) => {
    switch (id) {
      case 'Comments':
        setPostsData({ ...postsData, is_comment: true });
        break;
      case 'Sharing':
        setPostsData({ ...postsData, is_share: true });
        break;
      case 'Notice':
        setPostsData({ ...postsData, is_notice: true });
        break;
      case 'Search':
        setPostsData({ ...postsData, is_search: true });
        break;
      case 'Search':
        setPostsData({ ...postsData, is_event: true });
        break;
      case 'secret':
        setPostsData({ ...postsData, is_secret: true });
        break;
      default:
    }
    if (checked) {
      setCheckedList([...checkedList, id]);
    } else if (!checked) {
      setCheckedList(checkedList.filter((el) => el !== id));
    }
  };
  const onClickElement = (id) => {
    if (id === 'Notice') {
      if (checkedList.indexOf('secret') > -1) {
        setPwdPopupOpen(true);
        setPopupContent('Notice posts cannot be set as secret posts.');
      }
    }
    if (id === 'secret') {
      if (checkedList.indexOf('Notice') > -1) {
        setPwdPopupOpen(true);
        setPopupContent('You cannot set a notice for a secret message.');
      }
    }
    if (id === 'event') {
      if (checkedList.indexOf('Notice') > -1) {
        setPwdPopupOpen(true);
        setPopupContent('Event posts cannot be set as Notice posts.');
      } else if (checkedList.indexOf('secret') > -1) {
        setPwdPopupOpen(true);
        setPopupContent('Event posts cannot be set as secret posts');
      }
    }
  };

  const tagKeyUP = (e) => {
    const tagitem = {
      tag: tagList.length + 1,
      name: e.target.value
    };

    if (e.key === 'Enter') {
      setTagList([...tagList, tagitem]);
      setTagVale('');
    }
  };
  const tagKeyBlur = (e) => {
    setTagList([...tagList, e.target.value]);
    setTagVale('');
  };
  const tagDelect = (item) => {
    setTagList(tagList.filter((element) => element.tag !== item));
  };
  const tagEditKeyUP = (e, id) => {
    if (e.key === 'Enter') {
      const findIndex = tagList.findIndex((element) => element.tag == id);
      let copyArray = [...tagList];
      if (findIndex != -1) {
        copyArray[findIndex] = { ...copyArray[findIndex], value: e.target.value };
      }
      setTagList(copyArray);
      setTagEditId('');
      setTagEditValue('');
    }
  };
  const tagEditer = (item) => {
    setTagEditId(item.id);
    setTagEditValue(item.value);
  };

  const postsCreate = (temp) => {
    // const tagsdata = tagList.map((item) => item.title);
    console.log(
      'tagsdata',
      tagList.map((item) => item.title)
    );
    setPostsData({ ...postsData, tags: [...tagList.map((item) => item.title)] });

    if (temp === 'temp') {
      setPostsData({ ...postsData, is_temporary: true });
    } else {
      if (postsData.title === '') {
        setPwdPopupOpen(true);
        setPopupContent('Please enter a title.');
        return false;
      }
    }

    if (postsData.is_secret) {
      if (postsData.password.length < 4) {
        alert('비밀번호 4자를 입력해주세요');
        return false;
      }
    }
    if (postsData.board === null) {
      setPwdPopupOpen(true);
      setPopupContent('Please select a bulletin board.');
      return false;
    }
    if (postId !== undefined) {
      console.log('postsData', postsData);
      console.log('tags', postsData.tags);
      dispatch(
        patchPostInit({
          id: postId,
          parameters: postsData
          // actionList: [{ type: getPostsInit.type, payload: { parameters: { is_temporary: true } } }]
        })
      );
      navigate(`/club/${post.data.club}/post/${post.data.id}`);
    } else {
      dispatch(
        postBoardPostInit({
          id: id,
          parameters: postsData,
          actionList: [{ type: getPostsInit.type, payload: { parameters: { is_temporary: true } } }]
        })
      );
    }
  };
  const onlyNumber = (e) => {
    const { value } = e.target;

    const onlyNumberRegular = value.replace(/[^0-9]/g, '');
    setPostsData({ ...postsData, password: onlyNumberRegular });
  };
  const postCancel = (e) => {
    setPwdPopupOpen(true);
    setPopupContent(
      'When you load a temporary text, the writing\nyou are creating disappears. Are you sure\nyou want to load the selected text?'
    );
    navigate(-1);
  };

  const tempAllDetele = () => {
    dispatch(
      deleteClubTemporaryInit({
        id: id,
        actionList: [{ type: getPostsInit.type, payload: { parameters: 'is_temporary=true' } }]
      })
    );
  };

  const tempSelectDetele = (selectId) => {
    dispatch(
      deletePostTemporaryInit({
        id: selectId,
        actionList: [{ type: getPostsInit.type, payload: { parameters: 'is_temporary=true' } }]
      })
    );
  };

  if (boardGroups.message !== 'ok')
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  return (
    <div className="club-home ">
      <div>
        <div className="flex-between board-actions ">
          <Button label={'Cancel'} size={'m'} onClick={() => postCancel()} />
          <div className="flex-center board-actions-right relative">
            <div className="board-actions-select " onClick={() => setOpenSelect(!openSelect)}>
              {boardSelect}
              <img src={require('images/club/arrow-bottom.png')} alt="" />
            </div>
            <div className={'board-actions-select-box ' + (openSelect ? '' : 'none')}>
              <div className="board-actions-select-item" onClick={() => closeSelect('Please select a Board', '')}>
                Please select a Board
              </div>
              {boardGroups.data.map((boardGroupsItem, index) => {
                return (
                  <div key={index}>
                    <div className="board-actions-select-boardGroup">{boardGroupsItem.title}</div>
                    {boardGroupsItem.boards.map((boardItem, index) => {
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
              <div onClick={() => postsCreate('temp')}>Save as draft</div> <div className="bar">|</div>
              <div onClick={() => setTempPopupOpen(!tempPopupOpen)}>{posts?.data?.length || 0}</div>
            </div>
            <TempPopup
              open={tempPopupOpen}
              setOpen={() => setTempPopupOpen()}
              tempAllDetele={tempAllDetele}
              tempSelectDetele={tempSelectDetele}
              posts={posts}
            />
            <Button label={'Registration'} size="m" onClick={() => postsCreate()} />
          </div>
        </div>
        <div className="board">
          <div className="board-input">
            <input
              placeholder="Please enter a title"
              value={postsData.title || ''}
              onChange={(e) => setPostsData({ ...postsData, title: e.target.value })}
            />
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
            value={postsData.content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setPostsData({ ...postsData, content: newContent })} // preferred to use only this option to update the content for performance reasons
          />
          <div className="board-tag">
            <div className="board-tag-item flex-center">
              {tagList.map((item, index) => {
                return (
                  <div key={index}>
                    <div
                      style={{ display: tagEditId === item.id ? 'none' : 'inline' }}
                      className="board-tag-item-list flex-center"
                      onClick={() => tagEditer(item)}
                    >
                      # {item.title}
                      <img
                        className="board-tag-close"
                        src={require('images/club/btn-close.png')}
                        onClick={() => tagDelect(item.tag)}
                      />
                    </div>
                    <input
                      className="tag-edit"
                      style={{ display: tagEditId === item.id ? 'flex' : 'none' }}
                      placeholder="#Tag"
                      maxLength={20}
                      onKeyPress={(e) => tagEditKeyUP(e, item.id)}
                      // onBlur={(e) => tagKeyBlur(e)}
                      value={tagEditValue}
                      onChange={(e) => setTagEditValue(e.target.value)}
                    />
                  </div>
                );
              })}
              {tagList.length < 10 && (
                <input
                  maxLength={20}
                  className="tag-input"
                  placeholder="#Tag"
                  onKeyPress={(e) => tagKeyUP(e)}
                  // onBlur={(e) => tagKeyBlur(e)}
                  value={tagVale}
                  onChange={(e) => setTagVale(e.target.value)}
                />
              )}
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
            <div onClick={() => onClickElement('Notice')}>
              Register as a Notice
              <ToggleBtn id="Notice" onChange={onCheckedElement} disabled={checkedList.indexOf('secret') > -1} />
            </div>
            <div onClick={() => onClickElement('event')}>
              Event Notice
              <ToggleBtn id="event" onChange={onCheckedElement} disabled={checkedList.indexOf('Notice') > -1} />
            </div>
            <div onClick={() => onClickElement('secret')}>
              secret post
              <ToggleBtn id="secret" onChange={onCheckedElement} disabled={checkedList.indexOf('Notice') > -1} />
            </div>
          </div>
          {checkedList.indexOf('secret') > -1 && (
            <div className="board-password">
              <div className="board-password-input">
                password
                <input value={postsData.password || ''} maxLength="4" type="password" onChange={(e) => onlyNumber(e)} />
              </div>
              <div className="remark">*You can view posts via links or by entering passwords.</div>
            </div>
          )}
        </div>
      </div>
      <AlertPopup content={popupContent} open={pwdPopupOpen} setOpen={() => setPwdPopupOpen(false)} />
    </div>
  );
}

export default Writing;
