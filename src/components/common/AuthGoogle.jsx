import React, { useRef } from 'react';
import useScript from 'hook/useScript';

function AuthGoogle({ onSNSLogInSuccess, text = 'signin_with' }) {
  const googleSignInButton = useRef(null);

  useScript('https://accounts.google.com/gsi/client', () => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_API_KEY,
      callback: onSNSLogInSuccess
    });
    window.google.accounts.id.renderButton(
      googleSignInButton.current,
      { theme: 'outline', size: 'large', text, width: '250' } // customization attributes
    );
  });

  return <div ref={googleSignInButton} />;
}

export default AuthGoogle;
