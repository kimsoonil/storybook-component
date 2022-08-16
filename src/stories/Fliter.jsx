import React, { useState } from "react";
import PropTypes from "prop-types";

import "./Fliter.css";

export const Fliter = ({
  Placeholder,
  Disabled,
  Readonly,
  state,
  value,
  helpText,
}) => {
  return (
    <div className="text-field">
      <div className="title">TEXT FIELD</div>
      <div className="cgp-input-field">
        <input
          className={state + " cgp-input"}
          Placeholder={Placeholder}
          Disabled={Disabled}
          Readonly={Readonly}
          value={value}
        />
        <span className={state + " help-text"}>{helpText}</span>
      </div>
    </div>
  );
};
Fliter.propTypes = {
  Placeholder: PropTypes.string,
  Disabled: PropTypes.bool,
  Readonly: PropTypes.bool,
  state: PropTypes.oneOf(["", "success", "error"]),
  value: PropTypes.string,
  helpText: PropTypes.string,
};

Fliter.defaultProps = {
  Placeholder: "Placeholder text",
  Disabled: false,
  Readonly: false,
  state: "",
  value: PropTypes.string,
  helpText: PropTypes.string,
};
