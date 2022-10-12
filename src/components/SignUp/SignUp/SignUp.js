import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { reqAuthSns } from 'redux/store/logInSlice';

function SignUp() {
  const snsArr = [
    { id: 0, text: 'Continue with Google', type: 'google' },
    { id: 1, text: 'Continue with Twitter', type: 'twitter' },
    { id: 2, text: 'Continue with Facebook', type: 'facebook' },
    { id: 3, text: 'Continue with Apple', type: 'apple' }
  ];

  const dispatch = useDispatch();
  const snsLogin = (snsType) => {
    dispatch(reqAuthSns(snsType));
  };

  return (
    <div>
      <ul>
        <li>
          <Link to="/signup/email">Continue with Email</Link>
        </li>
        <li>
          <Link to="/signup/phone">Continue with Cell Phone</Link>
        </li>
        <li>
          <div>or</div>
        </li>
        {snsArr.map((item) => (
          <li key={item.id}>
            <Link to="/" onClick={() => snsLogin(item.type)}>
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SignUp;
