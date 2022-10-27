/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

function MarketPolicy({ onHide }) {
  return (
    <div className="modal_popup modal_text marketing" style={{ width: 720, height: 436 }}>
      <div className="modal_con">
        <button className="close" onClick={() => onHide()} />
        <h2 className="modal_title">Marketing policies</h2>
        <div className="con scroll">
          <p className="subtitle">Consent to use of marketing information</p>
          <p>
            You can refuse to receive marketing information and collect and use personal information for
            <br />
            marketing,
            <br />
            and even if you refuse, you can use the super club service.
          </p>
          <p>
            <span>Personal information collection items</span>
            <br />- Name, mobile phone number, email
          </p>
          <p>
            <span>Purpose of collection and use of personal information</span>
            <br />- Event operation and advertising information transmission
            <br />- Transmission of service-related information
          </p>
          <p>
            <span>Retention and use period</span>
            <br />- Retention and use until the user withdraws consent or withdraws
          </p>
        </div>
      </div>
    </div>
  );
}

export default MarketPolicy;
