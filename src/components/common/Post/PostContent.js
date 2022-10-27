/* eslint-disable */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { dateCalculation } from 'utils/dateCalculation';
import { useDispatch } from 'react-redux';
import Comment from '../Comment/Comment';
import { fourmReset } from 'redux/store/forum/fourmPostSlice';
import { Loader } from 'components/idist/Loader';

function PostContent(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postEdit = () => {
    if (props.type === 'club') {
      navigate(`/${props.type}/${props.post?.data?.club}/writing/${props.post?.data?.id}`);
    } else {
      dispatch(fourmReset());
      navigate(`/${props.type}/1/writing/${props.post?.data?.id}`);
    }
  };
  return (
    <div className="club-home-content " style={{ marginTop: '20px' }}>
      <div className="posts-container">
        <div className="posts-container-header">
          <div>
            <div className="posts-container-nav" onClick={() => props.postNavigate()}>
              {props.type === 'club' && `${props.post?.data?.board_group_title} > ${props.post?.data?.board_title}`}
            </div>
            <div className="posts-container-title">
              {props.post?.data?.title}{' '}
              {props.post?.data?.is_secret && <img src={require('images/club/ic-lock.png')} alt="" />}
            </div>
            <div className="posts-container-profile">
              <div>
                <img
                  src={
                    props.post?.data?.profile_image_url
                      ? props.post?.data?.profile_image_url
                      : require('images/main/temporary-profile.png')
                  }
                  alt=""
                />
              </div>
              <div className="posts-container-profile-info">
                <div className="posts-container-profile-info-tag">
                  <div>{props.post?.data?.profile?.user?.username}</div>

                  {props.post.data?.profile?.staff_title === null ? (
                    <>
                      <div className="profile-rating flex-center">{props.post.data?.profile?.grade_title}</div>
                      <div className="profile-level">LV {props.post.data?.profile?.level}</div>
                    </>
                  ) : (
                    <div className="profile-staff flex-center">{props.post?.data?.profile?.staff_title}</div>
                  )}
                </div>
                <div>
                  <div className="profile-age">{dateCalculation(props.post?.data?.created)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-center">
            <div>
              <div className="flex-center posts-header-btn">
                <div className="item flex-center" onClick={() => props.setOpenPopup(!props.openPopup)}>
                  <img src={require(`images/club/rank.png`)} alt="" />
                </div>
                <div className="item flex-center" onClick={() => props.handleClickPin(props.post?.data?.is_pined)}>
                  <img
                    src={require(props.post?.data?.is_pined
                      ? props.post?.data?.is_pined
                        ? `images/club/club-bookmark.png`
                        : `images/club/icon-bookmark-line.png`
                      : `images/club/icon-bookmark-line.png`)}
                    alt=""
                  />
                </div>
                <div className="item etc relative">
                  <div className="etc-img" onClick={() => props.setOpenETC(!props.openETC)} />
                  <div className="etc-box" style={{ display: props.openETC ? 'block' : 'none' }}>
                    {/* {props?.clubId?.data?.profile ? ( */}
                    <>
                      <div onClick={() => postEdit()}>Edit</div>
                      <div
                        onClick={() =>
                          props.deletePost(props.post?.data?.id, props.post?.data?.club, props.post?.data?.board)
                        }
                      >
                        Delete
                      </div>
                    </>
                    {/* ) : (
                      <div onClick={() => props.setReportOpen(!props.reportOpen)}>Report</div>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="posts-container-body">
          <div className="" dangerouslySetInnerHTML={{ __html: props.post?.data?.content }}></div>
        </div>
        <div className="posts-tag">
          {props.post?.data?.tags?.map((tagItem, index) => {
            return (
              <div
                className="posts-tag-item"
                key={index}
                onClick={() => navigate(`/clubs/search/posts?search=${tagItem.title}`)}
              >
                # {tagItem.title}
              </div>
            );
          })}
        </div>
        <div className="posts-container-footer">
          <div className="posts-container-like flex-between">
            {props.like?.message === 'ok' ? (
              props.like?.data?.length > 0 ? (
                props.like?.data?.length === 1 ? (
                  <div className="posts-container-avatar">
                    <img
                      src={
                        props.like?.data[0]?.profile_data?.user?.profile_image_url
                          ? props.like?.data[0]?.profile_data?.user?.profile_image_url
                          : require('images/main/temporary-profile.png')
                      }
                      alt=""
                    />
                    {props.like.data[0]?.profile_data.user?.username}
                  </div>
                ) : (
                  <div className="posts-container-avatar relative">
                    {props.like.data.map((likeItem, index) => {
                      if (index < 3)
                        return (
                          <div key={index} className="mul-img" style={{ left: index * 18 + 'px' }}>
                            <img
                              src={
                                likeItem.profile_data?.user?.profile_image_url
                                  ? likeItem.profile_data?.user?.profile_image_url
                                  : require('images/main/temporary-profile.png')
                              }
                              alt=""
                            />
                          </div>
                        );
                    })}
                    <div style={{ marginLeft: 15 * (props.like.data.length < 3 ? props.like.data.length : 3) }}>
                      {props.like.data[props.like.data.length - 1].profile_data?.user?.username} and{' '}
                      {props.like.data.length - 1} others like it
                    </div>
                  </div>
                )
              ) : (
                <div></div>
              )
            ) : (
              <div className="flex-center">
                <Loader />
              </div>
            )}

            <div className="flex-center icon-like-group">
              <div
                className={'btn-like flex-center ' + (props.listState && 'active')}
                onClick={() => props.handleClickLike()}
              >
                <img src={require('images/club/like.png')} alt="" />
                {props.likeCount}
                {/* {props.post.data.like_count} */}
              </div>
              <div
                className={'btn-unlike flex-center ' + (props.disListState && 'active')}
                onClick={() => props.handleClickDisLike()}
              >
                <img src={require('images/club/unlike.png')} alt="" />
                {/* {props.post.data.dislike_count} */}
                {props.disLikeCount}
              </div>
            </div>
          </div>
          <Comment />
        </div>
      </div>
    </div>
  );
}

export default PostContent;
