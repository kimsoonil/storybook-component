import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import Pagination from 'rc-pagination';

import 'rc-pagination/assets/index.css';
import '../assets/css/components.css';

export function Pageination({ numPages }) {
  return (
    <div className="paginations">
      <div className="flex-center">
        <Pagination className="ant-pagination" defaultCurrent={3} total={numPages * 10} />
      </div>
    </div>
  );
}
Pageination.propTypes = {
  numPages: PropTypes.number
};

Pageination.defaultProps = {
  numPages: 5
};
