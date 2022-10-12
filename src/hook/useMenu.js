/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import classNames from 'classnames';

export default function useMenu({ buttons, activeColor, setActive, hoveredColor, setHovered, onClickCallback }) {
  return (
    <>
      {buttons.map((name) => (
        <button
          key={name}
          onMouseOver={() => setHovered(name)}
          onFocus={() => setHovered(name)}
          onClick={() => {
            setActive(name);
            onClickCallback(name);
          }}
          className={classNames({
            active: activeColor === name,
            hovered: hoveredColor === name
          })}
        >
          {name}
        </button>
      ))}
    </>
  );
}
