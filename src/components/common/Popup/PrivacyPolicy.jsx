/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-irregular-whitespace */
import React from 'react';

function PrivacyPolicy({ onHide }) {
  return (
    <div className="modal_popup modal_text privacy" style={{ width: 720, height: 760 }}>
      <div className="modal_con">
        <button className="close" onClick={() => onHide()} />
        <h2 className="modal_title">Privacy policy</h2>
        <div className="date_select">
          <span className="date">Effective Date : May 06, 2022</span>
          <div className="select_wrap">
            <div className="select privacy">
              <div className="selected">
                <div className="selected-value">Previous terms</div>
                <button type="button" className="arrow">
                  <span className="a11y">선택</span>
                </button>
              </div>
              <ul>
                <li className="option">Option 1</li>
                <li className="option">Selected Option</li>
                <li className="option">Option 3</li>
                <li className="option">option 3</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="con scroll">
          <p>
            Creta Co., Ltd. (hereinafter referred to as the &#39;Company&#39;) values ​​the personal information of
            customers and complies with the personal information protection regulations in the relevant laws and
            regulations that the company must comply with, such as the &#39;Personal Information Protection Act&#39;.
          </p>
          <p>
            Through the personal information processing policy, the company informs you about the purpose and method of
            using the personal information you provide, and what measures are being taken to protect your personal
            information, and contains the following contents.
          </p>
          <p>
            1. Items of personal information to be collected and methods of collection
            <br />
            2. Processing of unique identification information
            <br />
            3. Purpose of collection and use of personal information
            <br />
            4. Retention and use period of personal information
            <br />
            5. Procedure and method of destruction of personal information
            <br />
            6. Separate storage and management of personal information for long-term unused accounts
            <br />
            7. Provision of personal information
            <br />
            8. Rights of users and their legal representatives and how to exercise them
            <br />
            9. Matters concerning the installation and operation of the automatic personal information collection device
            and its rejection
            <br />
            10. Matters concerning measures to ensure the safety of personal information
            <br />
            11. Changes to the Privacy Policy
            <br />
            12. Personal Information Protection Officer
          </p>
          <p>
            <span>1. Items of personal information to be collected and methods of collection</span>
            <br />
            (1) Items of personal information to be collected
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
