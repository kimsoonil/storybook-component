import React from 'react';
import 'assets/scss/component/radio-button.scss';

// Todo radio button 분리 하기
function RadioButton({ value, onChange }) {
  return (
    // <div className="radio-button-container">
    <div className="radio-button-container">
      {/*  */}

      <div className="radio-button-wrapper">
        <label className="radio-button-label">
          <input
            className="default-input"
            type="radio"
            name="radio-button-input"
            checked={value === 'yes'}
            value="yes"
            onChange={onChange}
          />
          <div className="checkmark" tabIndex={0} role="button" aria-label="yes" />
          Yes
        </label>
        <div className="radio-button-explain">Sign up immediately without approval</div>
      </div>

      <div className="radio-button-wrapper">
        <label className="radio-button-label">
          <input
            className="default-input"
            type="radio"
            name="radio-button-input"
            checked={value === 'no'}
            value="no"
            onChange={onChange}
          />
          <div className="checkmark" tabIndex={0} role="button" aria-label="no" />
          No
        </label>
        <div className="radio-button-explain">Staff must approve to join</div>
      </div>
    </div>
  );
}

export default RadioButton;
