import React from 'react';
import { useNavigate } from 'react-router';
import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div id="wrap">
      <Header />
      <div id="main">
        <div id="container">
          <div className="common_wrap">
            <div className="ooops_img" />
            <div className="system_msg">
              <h3 className="h3Type eng">PAGE NOT FOUND</h3>
              <span>
                We looked everywhere for this page. Are you sure the website URL is correct?
                <br />
                Get in touch with the site owner.
              </span>
            </div>
            <div className="page_btn_wrap between">
              <button type="button" className="btn primary_line button_xl back" onClick={() => navigate(-1)}>
                <span>Go Back</span>
              </button>
              <button type="button" className="btn primary button_xl" onClick={() => navigate('/home')}>
                <span>Homepage</span>
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default PageNotFound;
