import React, { useState } from 'react';
import { getStorage, setStorage } from 'util/storage';

function Cookie() {
  const [isAllow, setIsAllow] = useState(getStorage('acceptCookie') === 'true');
  const onAllowCookie = () => {
    setStorage('acceptCookie', 'true');
    setIsAllow(true);
  };
  return (
    <div className="cookie" style={{ display: isAllow ? 'none' : 'inline-block' }}>
      <div className="cookie_con">
        <button type="button" className="btn_close" onClick={() => setIsAllow(true)}>
          <span className="a11y">닫기</span>
        </button>
        <dl>
          <dt>Cookie Policy</dt>
          <dd>
            Our website uses cookies to improve your browsing experience.
            <br />
            By using our site you agree to the use of cookies.
            <button type="button" onClick={() => console.log('test')}>
              Learn More
            </button>
          </dd>
        </dl>
        <button type="button" className="btn_accept" onClick={onAllowCookie}>
          <span>ACCEPT</span>
        </button>
      </div>
    </div>
  );
}
function Footer() {
  const onNavigate = () => {
    // console.log('navigate');
  };
  return (
    <div id="footer_wrap">
      <div className="footer">
        <Cookie />
        <div className="copyright">© 2023 Creta. All rights reserved.</div>
        <div className="footer_menu">
          <button className="policy" onClick={() => onNavigate()} aria-hidden="true">
            <span>Terms of Service</span>
          </button>
          <button className="policy" onClick={() => onNavigate()} aria-hidden="true">
            <span>Privacy Policy</span>
          </button>
          <button className="support" onClick={() => onNavigate()} aria-hidden="true">
            Support
          </button>
          <div className="flag_wrap">
            <div className="flag_language">
              <span className="language">English</span>
              <button type="button" className="arrow">
                <span className="a11y">선택</span>
              </button>
            </div>
            <ul className="flag_list">
              <li className="change">
                <button type="button" className="language">
                  <span>Change Language</span>
                </button>
              </li>
              <li>
                <button type="button" className="language us">
                  <span>English</span>
                </button>
              </li>
              <li>
                <button type="button" className="language kr">
                  <span>Korean</span>
                </button>
              </li>
              <li>
                <button type="button" className="language jp">
                  <span>Japanese</span>
                </button>
              </li>
              <li>
                <button type="button" className="language cn">
                  <span>Chinese</span>
                </button>
              </li>
              <li>
                <button type="button" className="language de">
                  <span>Deutsh</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
