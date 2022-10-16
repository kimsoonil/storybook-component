import React from 'react';
import { useTranslation } from 'react-i18next';
import ForumSummary from './ForumSummary';
import PostSummary from './PostSummary';
import ForumSummarySlide from './ForumSummarySlide';

function Summary({ setIsShow }) {
  const { t } = useTranslation();

  return (
    <div style={{ height: '50px' }}>
      <ForumSummarySlide>
        <PostSummary />
        <ForumSummary />
      </ForumSummarySlide>
      <button type="button" onClick={() => setIsShow(true)}>
        {t('label.forum.viewallforum')}
      </button>
    </div>
  );
}

export default Summary;
