/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useLayoutEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import 'assets/scss/admin/dashboard.scss';
import { useLocation, useNavigate } from 'react-router';
import { numFM } from 'utils/formatter';
import { getClubDashboardInit, resetDashboardAdmin } from 'redux/idistStore/admin/dashboardAdminSlice';

const rootClassName = 'admin-dashboard';

function Dashboard() {
  const dispatch = useDispatch();

  // const outlet = useOutletContext();
  // const clubId = outlet.club.id || 22;

  const { id: clubId = -1 } = useSelector((state) => state.commonAdmin.club);

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

    return () => {
      dispatch(resetDashboardAdmin());
    };
  }, [clubId]);

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
      { title: 'Statistics', desc: `Plan your club's future with statistics`, path: 'statistics' },
      { title: 'Boards', desc: `Manage bulletin boards and bulletin board groups in the menu`, path: 'boards' },
      { title: 'Reports', desc: `신고 설명 필요`, path: 'reports' },
      { title: 'Member', desc: `Manage your staff and members`, path: 'member' },
      { title: 'Permissions', desc: `Manage staff privileges for convenient operation`, path: 'permissions' },
      { title: 'Information', desc: `Manage your club's information`, path: 'information' },
      { title: 'Design', desc: `Design your club to attract attention`, path: 'design' },
      { title: 'Operation', desc: `Make important decisions for your club`, path: 'operation' }
    ],
    []
  );

  if (isLoading) {
    return null;
  }

  return (
    <div className={`${rootClassName}`}>
      <div className={`${rootClassName}-section`}>
        <div className={`${rootClassName}-title`}>Statistics</div>

        <div className={`${rootClassName}-item-wrapper`}>
          {statisticsList.map((item) => (
            <StatisticsItem key={item.title} data={item} />
          ))}
        </div>
      </div>

      <div className={`${rootClassName}-section`}>
        <div className={`${rootClassName}-title`}>Menu</div>

        <div className={`${rootClassName}-item-wrapper`}>
          {menuList.map((item) => (
            <MenuItem key={item.path} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

function StatisticsItem({ data }) {
  return (
    <div className={`${rootClassName}-item`}>
      <div className={`${rootClassName}-item-title`}>{data.title}</div>

      <div className={`${rootClassName}-statistic-value-container`}>
        <div>
          <div className={`${rootClassName}-statistic-value`}>{data.total}</div>
          <div className={`${rootClassName}-statistic-value-label`}>Total</div>
        </div>

        <div>
          <div className={`${rootClassName}-statistic-value`}>{data.today}</div>
          <div className={`${rootClassName}-statistic-value-label`}>Today</div>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ data }) {
  const navigate = useNavigate();
  const location = useLocation();

  const onClick = () => {
    navigate(`${location.pathname.split('/').slice(0, -1).join('/')}/${data.path}`);
  };

  return (
    <div className={`${rootClassName}-menu-item`} onClick={onClick}>
      <div className={`${rootClassName}-menu-item-title`}>{data.title}</div>
      <div className={`${rootClassName}-menu-item-desc`}>{data.desc}</div>
    </div>
  );
}
