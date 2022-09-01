/* eslint-disable */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { Header } from 'components/Header';

import 'assets/scss/error.scss';
import 'assets/scss/reset.scss';

function NotFound() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clubState = useSelector((state) => state.club);
  const { id } = useParams();

  return (
    <div id="root">
      <Header />
      <div className="error flex-center">
        <img src={require('images/Error/img_error_page.png')} alt="" />
        <div className="error-title">PAGE NOT FOUND</div>
        <div className="error-content">
          We looked everywhere for this page. Are you sure the website URL is correct?
          <br /> Get in touch with the site owner.
        </div>
        <div className="actions">
          <div className="back flex-center" onClick={() => navigate(-1)}>
            Go Back
          </div>
          <div className="home flex-center" onClick={() => navigate('/')}>
            Homepage
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
