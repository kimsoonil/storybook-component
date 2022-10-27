import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import 'assets/scss/admin/components/menu.scss';

const Menu = ({ menuList }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoverState, setHoverState] = useState({});

  const onMouseEnter = (path) => {
    setHoverState({ [path]: true });
  };
  const onMouseLeave = () => setHoverState({});

  return (
    <div>
      <div className="jnav">
        {menuList.map((menuItem, index) => (
          <MenuItem key={index} menuItem={menuItem} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
        ))}
      </div>

      {menuList.map(
        (menuItem, index) =>
          location.pathname.includes(menuItem.path) &&
          menuItem?.submenu && (
            <div key={'temp'} className="jnav">
              {menuItem?.submenu.map((item, index) => (
                <MenuItem key={index} menuItem={item} end={true} />
              ))}
            </div>
          )
      )}
    </div>
  );
};

export default Menu;

const MenuItem = ({ menuItem, end, onMouseEnter = () => {}, onMouseLeave = () => {}, ...props }) => {
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
};
