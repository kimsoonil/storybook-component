import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoBack = ({ label, ...props }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };

  return (
    <div style={{ zIndex: 10 }}>
      <button
        style={{
          display: 'flex',
          lineHeight: '22px',
          color: 'white',
          fontSize: '16px',
          fontFamily: 'Poppins',
          padding: '10px'
        }}
        onClick={onClick}
        {...props}
      >
        {label || `< Go Back`}
      </button>
    </div>
  );
};

export default GoBack;
