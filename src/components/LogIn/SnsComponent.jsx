import React from 'react';

function SnsComponent() {
  const arrSns = [
    { id: 'google', name: 'Google' },
    { id: 'apple', name: 'Apple' },
    { id: 'facebook', name: 'Meta' },
    { id: 'twitter', name: 'Twitter' }
  ];

  const onAuth = (type) => {
    window.open(`http://localhost:5000/auth/${type}`, '_self');
  };
  return (
    <div className="sns_login">
      {arrSns.map((item) => (
        <button
          type="button"
          className={`sns btn_${item.id}`}
          onClick={() => onAuth(item.id)}
          key={item.id}
          aria-hidden="true"
        >
          <span className="a11y">{item.name}</span>
        </button>
      ))}
    </div>
  );
}

export default SnsComponent;
