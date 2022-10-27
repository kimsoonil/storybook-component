import React from 'react';
import PropTypes from 'prop-types';
import 'assets/scss/reset.scss';
import 'assets/scss/components.scss';

/**
 * Primary UI component for user interaction
 */
export function Loader() {
  return (
    <div className="loader">
      <div className="dots" />
      <div className="dots" />
      <div className="dots" />
      <div className="dots" />
      <div className="dots" />
      <div className="loader-text flex-center">Loading...</div>
    </div>
  );
}

Loader.propTypes = {};

Loader.defaultProps = {};
