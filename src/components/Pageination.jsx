import React, { useState } from "react";
import PropTypes from "prop-types";

import { Header } from "./Header";

import Pagination from "rc-pagination";

import "rc-pagination/assets/index.css";
import "../assets/css/components.css";

export const Pageination = ({ numPages }) => {
  return (
    <div className="paginations">
      <div className="flex-center">
        <Pagination
          className="ant-pagination"
          defaultCurrent={3}
          total={numPages * 10}
        />
      </div>
    </div>
  );
};
Pageination.propTypes = {
  numPages: PropTypes.number,
};

Pageination.defaultProps = {
  numPages: 5,
};
