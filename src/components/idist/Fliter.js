import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import { DateRangePicker, LocalizationProvider, DateRangeDelimiter } from '@material-ui/pickers';
import 'assets/scss/reset.scss';
import 'assets/scss/components.scss';
import { useTranslation } from 'react-i18next';

export function Fliter({ doneFuc }) {
  const [sort, setSort] = useState('new');
  const [date, setDate] = useState('All');
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState('');

  const [selectedDate, handleDateChange] = React.useState([null, null]);

  return (
    <div className="filter relative">
      <div className="filter-conent">
        <div className="flex-between filter-hr">
          <div className="filter-title">{t(`정렬`)}</div>
          <div className="flex-center sort-box">
            <div
              className={`box-left filter-box flex-center ${sort === 'new' && 'active'}`}
              onClick={() => setSort('new')}
            >
              등록순
            </div>
            <div
              className={`box-right filter-box flex-center ${sort === 'popularity' && 'active'}`}
              onClick={() => setSort('popularity')}
            >
              인기순
            </div>
          </div>
        </div>
        <div className="filter-hr">
          <div className="flex-between ">
            <div className="filter-title">기간</div>
            <div className="flex-center date-box">
              <div
                className={'box-left filter-box flex-center ' + (date === 'All' && 'active')}
                onClick={() => setDate('All')}
              >
                일주일
              </div>
              <div
                className={`filter-box flex-center ${date === '3month' && 'active'}`}
                onClick={() => setDate('3month')}
              >
                3개월
              </div>
              <div
                className={`box-right filter-box flex-center ${date === 'select' && 'active'}`}
                onClick={() => setDate('select')}
              >
                직접선택
              </div>
            </div>
          </div>
          <div className={date !== 'select' ? 'none' : 'calendar '}>
            <LocalizationProvider dateAdapter={DateFnsUtils}>
              <DateRangePicker
                className="date-rangepicker"
                inputFormat="yyyy-mm-dd"
                displayStaticWrapperAs="mobile"
                calendars={1}
                startText=""
                endText=""
                value={selectedDate}
                onChange={(date) => handleDateChange(date)}
                renderInput={(startProps, endProps) => (
                  <>
                    <div className="relative">
                      <TextField {...startProps} placeholder="start" />
                      <div className="ic_calendar" />
                    </div>
                    <DateRangeDelimiter> </DateRangeDelimiter>
                    <div className="relative">
                      <TextField {...endProps} placeholder="end" />
                      <div className="ic_calendar" />
                    </div>
                  </>
                )}
              />
            </LocalizationProvider>
          </div>
        </div>

        <div className="flex-between keyword">
          <div className="filter-title">검색어</div>
          <div className="flex-center relative">
            <input
              className="keyword-input"
              placeholder="search..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="seachIc">
              <img src={require('images/components/ic_search_wh.svg').default} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-between filter-actions">
        <div className="filter-cancle">초기화</div>
        <div className="filter-done flex-center" onClick={doneFuc}>
          적용
        </div>
      </div>
    </div>
  );
}
Fliter.propTypes = {};

Fliter.defaultProps = {};
