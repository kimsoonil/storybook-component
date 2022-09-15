import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import 'assets/scss/admin/dashboard.scss';

const Dashboard = () => {
  const dispatch = useDispatch();
  // const _club = useSelector((state) => state.createClub.club);
  // const categ = useSelector((state) => state.categories.list);

  const statisticsList = useMemo(
    () => [
      { title: 'Visits', total: 11, today: 88 },
      { title: 'Posts', total: 11, today: 88 },
      { title: 'Comments', total: 11, today: 88 },
      { title: 'Members', total: 11, today: 8 }
    ],
    []
  );

  const menuList = useMemo(
    () => [
      { title: 'Statistics', desc: `Plan your club's future with statistics` },
      { title: 'Boards', desc: `Manage bulletin boards and bulletin board groups in the menu` },
      { title: 'Posts', desc: `Manage posts for a clean bulletin board` },
      { title: 'Member', desc: `Manage your staff and members` },
      { title: 'Permissions', desc: `Manage staff privileges for convenient operation` },
      { title: 'Information', desc: `Manage your club's information` },
      { title: 'Design', desc: `Design your club to attract attention` },
      { title: 'Operation', desc: `Make important decisions for your club` }
    ],
    []
  );

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
  return (
    <div className="dashboard-item">
      <div className="text-h4 menu-item-title">{data.title}</div>
      <div className="text-h5 menu-item-desc">{data.desc}</div>
    </div>
  );
};
