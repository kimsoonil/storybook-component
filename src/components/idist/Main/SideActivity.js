/* eslint-disable */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivitiesInit } from 'redux/idistStore/activitiesSlice';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'components/idist/Loader';
import 'assets/scss/reset.scss';
import 'assets/scss/main.scss';
import { dateCalculation } from 'utils/dateCalculation';

function SideActivity() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activities } = useSelector((state) => state.activity);

  useEffect(() => {
    dispatch(getActivitiesInit());
  }, [dispatch]);

  if (activities.message !== 'ok')
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  return (
    <div className="side-box activity">
      <div className="flex-between">
        <div className="side-box-title">Activity</div>
        <div className="see-all" onClick={() => navigate(`/clubs/activity`)}>
          See all
        </div>
      </div>
      <div className="side-box-meun">
        <div className="side-activity">
          {activities.data.length > 0 ? (
            activities.data.map((activityItem, index) => {
              if (index < 7)
                return (
                  <div className="side-activity-item" key={index}>
                    <div className="side-activity-item-img">
                      <img src={require('images/main/icon-activity1.png')} />
                    </div>
                    <div className="side-activity-item-content">
                      <div className="side-activity-item-title">{activityItem.title}</div>
                      <div
                        className="side-activity-item-name"
                        dangerouslySetInnerHTML={{ __html: activityItem.content }}
                      ></div>
                      <div className="side-activity-item-greetings">{dateCalculation(activityItem.created)}</div>
                    </div>
                    <div className="side-activity-item-profile">
                      <img src={require('images/main/profile-dummy-img.png')} />
                    </div>
                  </div>
                );
            })
          ) : (
            <div className="no-data flex-center">
              <div>
                <img src={require('images/Error/img_error_page.png')} alt="" />
              </div>
              <div className="no-data-title">No search results found</div>
              <div className="no-data-content">Try searching with a different keyword.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideActivity;
