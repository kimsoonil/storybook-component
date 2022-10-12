import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import 'assets/scss/admin/dashboard.scss';
import { useNavigate, useOutletContext } from 'react-router';
import { numFM } from 'utils/formatter';
import idistApi from 'redux/idistApi';
import { getClubDashboardInit } from 'redux/idistStore/admin/dashboardAdminSlice';

const Dashboard = () => {
  const dispatch = useDispatch();

  const outlet = useOutletContext();
  const clubId = outlet.club.id || 22;

  const dashboard = useSelector((state) => state.dashboardAdmin.dashboard);
  const isLoading = useSelector((state) => state.dashboardAdmin.dashboardLoading);

  // commentCount: 0
  // memberCount: 1
  // postCount: 0
  // viewCount: 0
  // dailyCommentCount: 0
  // dailyMemberCount: 0
  // dailyPostCount: 0
  // dailyViewCount: 0

  useLayoutEffect(() => {
    if (clubId) {
      dispatch(getClubDashboardInit({ id: clubId }));
    }
  }, []);

  const statisticsList = useMemo(
    () => [
      { title: 'Visits', total: numFM(dashboard?.view_count), today: numFM(dashboard?.daily_view_count) },
      { title: 'Posts', total: numFM(dashboard?.post_count), today: numFM(dashboard?.daily_post_count) },
      { title: 'Comments', total: numFM(dashboard?.comment_count), today: numFM(dashboard?.daily_comment_count) },
      { title: 'Members', total: numFM(dashboard?.member_count), today: numFM(dashboard?.daily_member_count) }
    ],
    [dashboard]
  );

  const menuList = useMemo(
    () => [
      { title: 'Statistics', desc: `Plan your club's future with statistics`, path: '/manage/statistics' },
      { title: 'Boards', desc: `Manage bulletin boards and bulletin board groups in the menu`, path: '/manage/boards' },
      { title: 'Posts', desc: `Manage posts for a clean bulletin board`, path: '/manage/posts' },
      { title: 'Member', desc: `Manage your staff and members`, path: '/manage/member' },
      { title: 'Permissions', desc: `Manage staff privileges for convenient operation`, path: '/manage/permissions' },
      { title: 'Information', desc: `Manage your club's information`, path: '/manage/information' },
      { title: 'Design', desc: `Design your club to attract attention`, path: '/manage/design' },
      { title: 'Operation', desc: `Make important decisions for your club`, path: '/manage/operation' }
    ],
    []
  );

  if (isLoading) {
    return null;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-section">
        <div className="text-h3">Statistics</div>

        <div className="dashboard-item-wrapper">
          {statisticsList.map((item, index) => (
            <StatisticsItem key={index} data={item} />
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <div className="text-h3">Menu</div>

        <div className="dashboard-item-wrapper">
          {menuList.map((item, index) => (
            <MenuItem key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const StatisticsItem = ({ data }) => {
  return (
    <div className="dashboard-item">
      <div className="text-h4 statistic-item-title">{data.title}</div>
      <div className="statistic-item-value-wrapper">
        <div className="statistic-item-value">
          <div className="text-h2">{data.total}</div>
          <div className="text-h4">Total</div>
        </div>
        <div className="statistic-item-value">
          <div className="text-h2">{data.today}</div>
          <div className="text-h4">Today</div>
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-menu-item" onClick={() => navigate(data.path)}>
      <div className="text-h4 menu-item-title">{data.title}</div>
      <div className="text-h5 menu-item-desc">{data.desc}</div>
    </div>
  );
};
