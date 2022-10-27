import React from 'react';

function SecurityGuide() {
  return (
    <div className="security_guide">
      <button type="button" className="open_tip">
        <span>Security Guide</span>
      </button>
      <div className="tooltip password">
        <h4>Strong Password</h4>
        <span>
          Enter a password that contains 8 - 16 characters from at least three of the following categories:
          uppercase/lowercase letters, numbers, and special characters.
        </span>
        <span>
          Repeated or sequence characters and letters, birthday, contact number, and other passwords that are easy to
          predict or are related to personal information are vulnerable due to weak security strength.
        </span>
        <span>Using a password that you use in other websites can also endanger the account security.</span>
      </div>
    </div>
  );
}

export default SecurityGuide;
