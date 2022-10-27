/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
import JoditEditor, { Jodit } from 'jodit-pro-react';
import { useSelector, useDispatch } from 'react-redux';
import { getPostInit, patchPostInit } from 'redux/idistStore/postsSlice';
import { getFourmPostsInit, postFourmPostInit, fourmReset } from 'redux/store/forum/fourmPostSlice';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import Writing from 'components/common/Writing';
import 'assets/scss/club.scss';
import 'assets/scss/jodit.scss';

function ForumWriting(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const { boardGroups } = useSelector((state) => state.club);
  const { fourmPosts } = useSelector((state) => state.forumPost);
  const { posts, post } = useSelector((state) => state.post);
  const { id, postId } = useParams();
  const [checkedList, setCheckedList] = useState([]);
  const [pwdPopupOpen, setPwdPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState('');
  const [postsData, setPostsData] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    dispatch(fourmReset());
  }, []);

  useEffect(() => {
    if (postId !== undefined) {
      dispatch(getPostInit({ id: postId }));
    }
  }, [postId]);

  useEffect(() => {
    console.log('fourmPosts', fourmPosts);
    if (fourmPosts.data) {
      navigate(`/forum/${id}/post/${fourmPosts.data[0].id}`);
    }
  }, [fourmPosts.data]);

  useEffect(() => {
    if (post.message === 'ok' && postId !== undefined) {
      setPostsData({
        title: post.data.title,
        content: post.data.content
      });
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
    jodit.e.on('emoji', (e) => {
      if (confirm('Change pasted content?')) {
        jodit.e.stopPropagation('paste');
        jodit.s.insertHTML(
          Jodit.modules.Helpers.getDataTransfer(e).getData(Jodit.constants.TEXT_HTML).replace(/a/g, 'b')
        );
        return false;
      }
    });
  }
  Jodit.plugins.add('preparePaste', preparePaste);

  // 게시글 생성
  const postsCreate = (temp) => {
    console.log('postId', postId);

    if (postsData.title === '') {
      setPwdPopupOpen(true);
      setPopupContent('Please enter a title.');
      return false;
    }

    if (postId !== undefined) {
      dispatch(
        patchPostInit({
          id: postId,
          parameters: postsData
          // actionList: [{ type: getPostsInit.type, payload: { parameters: { is_temporary: true } } }]
        })
      );
      setTimeout(() => {
        navigate(`/forum/1/post/${post.data.id}`);
      }, 500);
    } else {
      dispatch(
        postFourmPostInit({
          id: id,
          parameters: postsData,
          actionList: [{ type: getFourmPostsInit.type, payload: { id: id } }]
        })
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="main">
        <Writing
          posts={posts}
          type={'forum'}
          setPostsData={setPostsData}
          postsData={postsData}
          postsCreate={postsCreate}
          checkedList={checkedList}
          setPwdPopupOpen={setPwdPopupOpen}
          pwdPopupOpen={pwdPopupOpen}
          setPopupContent={setPopupContent}
          popupContent={popupContent}
          setCheckedList={setCheckedList}
        />
      </div>
      <Footer />
    </div>
  );
}

export default ForumWriting;
