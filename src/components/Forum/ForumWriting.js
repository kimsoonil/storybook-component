/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
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
    if (fourmPosts.data && id) {
      navigate(`/forum/${id}/post/${fourmPosts.data[0].id}`);
    }
  }, [fourmPosts.data]);

  useEffect(() => {
    if (fourmPosts.message === 'ok' && postId !== undefined) {
      setPostsData({
        title: fourmPosts.data.title,
        content: fourmPosts.data.content
      });
    }
  }, [fourmPosts]);

  useEffect(() => {
    if (post.message === 'ok' && postId !== undefined) {
      setPostsData({
        title: post.data.title,
        content: post.data.content
      });
    }
  }, [post]);

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
