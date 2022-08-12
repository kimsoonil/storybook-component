import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Header } from './Header';

import Pagination from 'rc-pagination';

import 'rc-pagination/assets/index.css';
import './Pageination.css';

export const Pageination = ({ numPages }) => {
  const itemRender = (current, type, element) => {
    if (type === 'page') {
      return <a href={`#${current}`}>{current}</a>;
    }
    return element;
  };
  return (
    <div>
      <div className="title">Paginations</div>
      <div className="flex-center">
        {/* <button className="prev list flex-center" onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </button>

        {[...Array(numPages)].map((n, index) => {
          const isActive = page === index + 1;
          return (

            <button
              className={isActive ? 'active list flex-center' : 'list flex-center'}
              onClick={() => setPage(index + 1)}
              key={index}
            >
              {index + 1}
            </button>
          );
        })}
        <button className="next list flex-center" onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </button> */}
        <Pagination className="ant-pagination" defaultCurrent={3} total={numPages * 10} />
      </div>
    </div>
  );
};
Pageination.propTypes = {
  numPages: PropTypes.number
};

Pageination.defaultProps = {
  numPages: 5
};
