import React, { useRef } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

function ReCapcha({ setIsCapcha }) {
  const captchaRef = useRef(null);
  const onChange = async (value) => {
    if (value) setIsCapcha(true);
    const token = captchaRef.current.getValue();

    await axios
      .post(`${process.env.REACT_APP_API_URL}/post`, { token })
      .then((res) => {
        console.log(res.data);
        if (res.data) setIsCapcha(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="form-group form-check">
      <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY_HIGH} ref={captchaRef} onChange={onChange} />
    </div>
  );
}

export default ReCapcha;
