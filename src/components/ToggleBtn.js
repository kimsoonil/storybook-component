/* eslint-disable */

import React from 'react';

import 'assets/scss/club.scss';
import 'assets/scss/reset.scss';

function ToggleBtn(props) {
  return (
    <>
      <input
        type="checkbox"
        id={props.id}
        className="toggleBtn"
        hidden
        onChange={(event) => props.onChange(event.target.checked, props.id)}
        disabled={props.disabled}
      />
      <label htmlFor={props.id} className="toggleSwitch">
        <span className="toggleButton"></span>
      </label>
    </>
  );
}

export default ToggleBtn;
