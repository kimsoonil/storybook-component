/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import 'assets/scss/admin/components/menu.scss';

function MenuItem({ menuItem, end, onMouseEnter = () => {}, onMouseLeave = () => {}, ...props }) {
  return (
    <NavLink
      onMouseEnter={() => onMouseEnter(menuItem.path)}
      onMouseLeave={onMouseLeave}
      end={end}
      className={({ isActive }) => `jnav-menu ${isActive && `jnav-menu-active`}`}
      to={menuItem.path}
      {...props}
    >
      <div>{menuItem.title}</div>
    </NavLink>
  );
}

function Menu({ menuList }) {
  const location = useLocation();

  return (
    <div>
      <div className="jnav">
        {menuList.map((menuItem, index) => {
          const key = `menu${index}`;
          return <MenuItem key={key} menuItem={menuItem} />;
        })}
      </div>

      {menuList.map(
        (menuItem) =>
          location.pathname.includes(menuItem.path) &&
          menuItem?.submenu && (
            <div key="temp" className="jnav">
              {menuItem?.submenu.map((item, index) => {
                const key = `submenu${index}`;
                return <MenuItem key={key} menuItem={item} end />;
              })}
            </div>
          )
      )}
    </div>
  );
}

export default Menu;
