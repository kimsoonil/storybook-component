import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
// import { useSearchParams } from 'react-router-dom';

function Terms() {
  const { t } = useTranslation();
  const [privacy, setPrivacy] = useState(false);
  const [market, setMarket] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const code = searchParams.get('code');
  // const scope = searchParams.get('scope');

  useEffect(() => {
    setPrivacy(checkAll);
    setMarket(checkAll);
  }, [checkAll]);

  useEffect(() => {
    if (privacy === market) setCheckAll(privacy);
    else setCheckAll(false);
  }, [privacy, market]);

  return (
    <div>
      <ul>
        <li>
          <div>
            <label htmlFor="all">
              Everyone agrees.
              <input name="all" value type="checkbox" checked={checkAll} onChange={() => setCheckAll(!checkAll)} />
            </label>
          </div>
        </li>
        <li>
          <div>
            <label htmlFor="privacy">
              By creating on account you agree to Super club’s Privacy Policy and Terms of use.
              <input name="privacy" value type="checkbox" checked={privacy} onChange={() => setPrivacy(!privacy)} />
            </label>
          </div>
        </li>
        <li>
          <div>
            <label htmlFor="market">
              By creating on account you agree to Super club’s Marketing policies
              <input name="market" value type="checkbox" checked={market} onChange={() => setMarket(!market)} />
            </label>
          </div>
        </li>
      </ul>
      <div>
        <button onClick={() => navigate('/signup')}>{t('label.terms.disagree')}</button>
        <button disabled={!privacy || !market} onClick={() => navigate('/signup/complete')}>
          {t('label.terms.agree')}
        </button>
      </div>
    </div>
  );
}

export default Terms;
