/* eslint-disable */

import React from 'react';

import 'assets/scss/club.scss';
import 'assets/scss/reset.scss';

function ToggleBtn(props) {
  return (
    <>
      <input type="checkbox" id="toggle" hidden />
      <label htmlFor="toggle" className="toggleSwitch">
        <span className="toggleButton"></span>
      </label>
    </>
  );
}

export default ToggleBtn;
