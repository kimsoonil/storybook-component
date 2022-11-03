import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClubBoardGroupsInit, deleteClubTemporaryInit } from 'redux/idistStore/clubSlice';
import { getPostsInit, deletePostTemporaryInit, getPostInit, patchPostInit } from 'redux/idistStore/postsSlice';
import { postBoardPostInit, boardReset } from 'redux/idistStore/boardSlice';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { Loader } from 'components/idist/Loader';
import Writing from 'components/common/Writing';
import 'assets/scss/club.scss';
import 'assets/scss/jodit.scss';

function PostWriting() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boardGroups } = useSelector((state) => state.club);
  const boardState = useSelector((state) => state.board);
  const { posts, post } = useSelector((state) => state.post);
  const { id, postId } = useParams();
  const [checkedList, setCheckedList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [tagVale, setTagVale] = useState('');
  const [tagEditId, setTagEditId] = useState('');
  const [tagEditValue, setTagEditValue] = useState('');
  const [pwdPopupOpen, setPwdPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState('');
  const [boardSelect, setBoardSelect] = useState('Please select a Board');
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
    dispatch(getClubBoardGroupsInit({ id }));
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
        tags: [...post.data.tags.map((item) => item.title)],
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

  const closeSelect = (text, boardId) => {
    setPostsData({ ...postsData, board: boardId });
    setBoardSelect(text);
  };

  const onCheckedElement = (checked, checkId) => {
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
      case 'Event':
        setPostsData({ ...postsData, is_event: true });
        break;
      case 'secret':
        setPostsData({ ...postsData, is_secret: true });
        break;
      default:
    }
    if (checked) {
      setCheckedList([...checkedList, checkId]);
    } else if (!checked) {
      setCheckedList(checkedList.filter((el) => el !== checkId));
    }
  };
  const onClickElement = (clickId) => {
    if (clickId === 'Notice') {
      if (checkedList.indexOf('secret') > -1) {
        setPwdPopupOpen(true);
        setPopupContent('Notice posts cannot be set as secret posts.');
      }
    }
    if (clickId === 'secret') {
      if (checkedList.indexOf('Notice') > -1) {
        setPwdPopupOpen(true);
        setPopupContent('You cannot set a notice for a secret message.');
      }
    }
    if (clickId === 'event') {
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
      title: tagVale
    };

    if (e.key === 'Enter') {
      setTagList([...tagList, tagitem]);
      setPostsData({ ...postsData, tags: [...postsData.tags, tagitem.title] });
      setTagVale('');
    }
  };

  // const tagKeyBlur = (e) => {
  //   setTagList([...tagList, e.target.value]);
  //   setTagVale('');
  // };

  const tagDelect = (item) => {
    setTagList(tagList.filter((element) => element.tag !== item));
  };
  const tagEditKeyUP = (e, tagId) => {
    if (e.key === 'Enter') {
      const findIndex = tagList.findIndex((element) => element.tag === tagId);
      const copyArray = [...tagList];
      if (findIndex !== -1) {
        copyArray[findIndex] = { ...copyArray[findIndex], title: e.target.value };
      }
      setTagList(copyArray);
      setTagEditId('');
      setTagEditValue('');
    }
  };
  const tagEditer = (item) => {
    setTagEditId(item.tag);
    setTagEditValue(item.title);
  };
  // 게시글 생성
  const postsCreate = (temp) => {
    console.log('postId', postId);
    if (postsData.title === '') {
      setPwdPopupOpen(true);
      setPopupContent('Please enter a title.');
      return false;
    }

    if (postsData.is_secret) {
      if (postsData.password.length < 4) {
        window.alert('비밀번호 4자를 입력해주세요');
        return false;
      }
    }
    if (temp !== 'temp')
      if (postsData.board === null) {
        setPwdPopupOpen(true);
        setPopupContent('Please select a bulletin board.');
        return false;
      }
    if (postId !== undefined) {
      dispatch(
        patchPostInit({
          id: postId,
          parameters: postsData,
          actionList: [{ type: getPostsInit.type, payload: { parameters: { is_temporary: true } } }]
        })
      );
      setTimeout(() => {
        navigate(`/club/${post.data.club}/post/${post.data.id}`);
      }, 500);
    } else {
      console.log();
      dispatch(
        postBoardPostInit({
          id,
          parameters: { ...postsData, is_temporary: temp === 'temp' },
          actionList: [{ type: getPostsInit.type, payload: { parameters: { is_temporary: true } } }]
        })
      );
    }
    return null;
  };
  // const onlyNumber = (e) => {
  //   const { value } = e.target;

  //   const onlyNumberRegular = value.replace(/[^0-9]/g, '');
  //   setPostsData({ ...postsData, password: onlyNumberRegular });
  // };

  // TODO 임시글 삭제
  const tempAllDetele = () => {
    dispatch(
      deleteClubTemporaryInit({
        id,
        actionList: [{ type: getPostsInit.type, payload: { parameters: { is_temporary: true } } }]
      })
    );
  };

  const tempSelectDetele = (selectId) => {
    dispatch(
      deletePostTemporaryInit({
        id: selectId,
        actionList: [{ type: getPostsInit.type, payload: { parameters: { is_temporary: true } } }]
      })
    );
  };
  console.log('boardState.post', boardState.post);
  if (boardGroups.message !== 'ok')
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  return (
    <Writing
      posts={posts}
      type="club"
      boardSelect={boardSelect}
      closeSelect={closeSelect}
      setBoardSelect={setBoardSelect}
      boardGroups={boardGroups}
      setPostsData={setPostsData}
      onCheckedElement={onCheckedElement}
      onClickElement={onClickElement}
      postsData={postsData}
      postsCreate={postsCreate}
      setTagVale={setTagVale}
      tagVale={tagVale}
      tagList={tagList}
      tagEditId={tagEditId}
      tagKeyUP={tagKeyUP}
      tagEditer={tagEditer}
      tagEditKeyUP={tagEditKeyUP}
      tagDelect={tagDelect}
      setTagEditValue={setTagEditValue}
      tagEditValue={tagEditValue}
      tempAllDetele={tempAllDetele}
      tempSelectDetele={tempSelectDetele}
      checkedList={checkedList}
      setPwdPopupOpen={setPwdPopupOpen}
      pwdPopupOpen={pwdPopupOpen}
      setPopupContent={setPopupContent}
      popupContent={popupContent}
      setCheckedList={setCheckedList}
    />
  );
}

export default PostWriting;
