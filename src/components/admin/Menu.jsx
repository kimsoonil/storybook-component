import React from 'react';
import { NavLink } from 'react-router-dom';
import 'assets/scss/component/menu.scss';

const Menu = ({ menuList }) => {
  return (
    <div>
      {/* <NavLink
        to={'asdf'}
        style={{ backgroundColor: 'black', width: '50px', height: '60px', border: '10px solid blue' }}
      >
        <div
          style={{
            backgroundColor: 'red',
            width: '50px',
            height: '60px',
            border: '10px solid blue',
            boxSizing: 'border-box'
          }}
        >
          asdf
        </div>
      </NavLink> */}
      <div className="jnav">
        {menuList.map((item, index) => (
          <MenuItem key={index} menuItem={item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;

const MenuItem = ({ menuItem }) => {
  // return <div className="jmenu-item">{menuItem}</div>;
  return (
    <NavLink className={({ isActive }) => `jnav-item ${isActive && `jnav-item-active`}`} to={menuItem}>
      <div>{menuItem.charAt(0).toUpperCase() + menuItem.slice(1)}</div>
    </NavLink>
  );
};
