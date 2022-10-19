import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoBack = ({ label, ...props }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <button
        style={{
          display: 'flex',
          lineHeight: '22px',
          color: 'white',
          fontSize: '16px',
          fontFamily: 'Poppins',
          padding: '10px',
          zIndex: 30
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
