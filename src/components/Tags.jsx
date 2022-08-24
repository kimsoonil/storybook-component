import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../assets/scss/components.scss';

/**
 * Primary UI component for user interaction
 */
export function Tags({ label, ...props }) {
  const [active, setActive] = useState(false);
  return (
    <button
      type="button"
      className={['tags-component', active ? 'active' : ''].join(' ')}
      {...props}
      onClick={() => {
        setActive(!active);
      }}
    >
      {label}
    </button>
  );
}

Tags.propTypes = {
  label: PropTypes.string
};

Tags.defaultProps = {
  label: 'Tag'
};
