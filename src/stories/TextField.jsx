import React, { useState } from "react";
import PropTypes from "prop-types";

import "./TextField.css";

export const TextField = ({ Placeholder, Disabled, Readonly }) => {
  return (
    <div className="text-field">
      <div className="title">TEXT FIELD</div>
      <div className="">
        <input className="cgp-input" Placeholder="Placeholder text" />
      </div>
    </div>
  );
};
TextField.propTypes = {
  numPages: PropTypes.number,
};

TextField.defaultProps = {
  numPages: 5,
};
