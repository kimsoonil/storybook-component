import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import classNames from 'classnames';

function MenuIcon({ name, path }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [menu, setSelectMenu] = useState('');

  const onClickIcon = useCallback(() => {
    setSelectMenu(name);
    navigate(path);
  }, [menu]);

  useEffect(() => {
    // const arrCurMenu = leftMenuArr?.filter((item) => item.path === location.pathname);
    // const curMenu = arrCurMenu.length === 0 ? 'HOME' : arrCurMenu[0].name;

    const pathName = location.pathname.split('/')[1].toUpperCase();
    const curMenu = pathName || 'HOME';
    setSelectMenu(curMenu);
  }, [menu]);

  return (
    <li className={name.toLowerCase()}>
      <button
        type="button"
        className={classNames('gnb', name.toLowerCase(), 'open_tip', { active: name === menu })}
        onClick={() => onClickIcon(name)}
      >
        <span className="a11y">{name.toLowerCase()}</span>
      </button>
      <div className="tooltip bottom">
        <span>{name}</span>
      </div>
    </li>
  );
}

export default MenuIcon;
