/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import classNames from 'classnames';

function ForumBadge() {
  return (
    <ul className="badge_list">
      <li>
        <dl>
          <dt className="new">New</dt>
          <dd>Welcome! It’s newly created, so please pay attention.</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt className="nice">Nice</dt>
          <dd>Active activities are expected. Please keep an eye on it.</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt className="good">Good</dt>
          <dd>Many people are interested. very good.</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt className="excellent">Excellent</dt>
          <dd>We are very active in communication. Everyone likes it.</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt className="great">Great</dt>
          <dd>It’s so great that everyone likes it and is active.</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt className="wonderful">Wonderful</dt>
          <dd>It is reliable, ecstatic, and very communicative.</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt className="fantastic">Fantastic</dt>
          <dd>It is reliable, ecstatic and very communicative.</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt className="amazing">Amazing</dt>
          <dd>I dare not compare. This is the best of all.</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt className="rising">Rising Forum</dt>
          <dd>Most recently, it has skyrocketed with outstanding topicality.</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt className="recommend">Recommend</dt>
          <dd>It’s good enough to be highly recommended by the moderators.</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt className="live">Live Best</dt>
          <dd>It was voted the Daily Best for its outstanding topicality.</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt className="weekly">Weekly Best</dt>
          <dd>It was voted the best of the week for its outstanding topicality.</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt className="monthly">Monthly Best</dt>
          <dd>It was selected as the Monthly Best for its outstanding topicality.</dd>
        </dl>
      </li>
    </ul>
  );
}

function PostBadge() {
  return (
    <ul className="badge_list">
      <li>
        <dl>
          <dt className="new post">New</dt>
          <dd>Welcome! It’s newly created, so please pay attention.</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt className="nice post">Nice</dt>
          <dd>Active activities are expected. Please keep an eye on it.</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt className="good post">Good</dt>
          <dd>Many people are interested. very good.</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt className="excellent post">Excellent</dt>
          <dd>We are very active in communication. Everyone likes it.</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt className="great post">Great</dt>
          <dd>It’s so great that everyone likes it and is active.</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt className="wonderful post">Wonderful</dt>
          <dd>It is reliable, ecstatic, and very communicative.</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt className="fantastic post">Fantastic</dt>
          <dd>It is reliable, ecstatic and very communicative.</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt className="amazing post">Amazing</dt>
          <dd>I dare not compare. This is the best of all.</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt className="live_best ribbon">Live Best</dt>
          <dd>It was voted the Daily Best for its outstanding topicality.</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt className="weekly_best ribbon">Weekly Best</dt>
          <dd>It was voted the best of the week for its outstanding topicality.</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt className="monthly_best ribbon">Monthly Best</dt>
          <dd>It was selected as the Monthly Best for its outstanding topicality.</dd>
        </dl>
      </li>
    </ul>
  );
}

function Badge({ onHide }) {
  const [select, setSelect] = useState(false);
  return (
    <div className="modal_popup modal_text" style={{ width: 960 }}>
      <div className="modal_con badge">
        <button type="button" className="close" onClick={onHide} />
        <h2 className="modal_title">Badge View</h2>
        <div className="bg_con">
          <div>
            <button
              type="button"
              className={classNames('tab_box', { active: !select })}
              onClick={() => setSelect(false)}
            >
              <span>Forum Badge</span>
            </button>
            <button type="button" className={classNames('tab_box', { active: select })} onClick={() => setSelect(true)}>
              <span>Post Badge</span>
            </button>
          </div>
          {select ? <PostBadge /> : <ForumBadge />}
        </div>
      </div>
    </div>
  );
}

export default Badge;
