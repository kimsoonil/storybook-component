import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import { DateRangePicker, LocalizationProvider, DateRangeDelimiter } from '@material-ui/pickers';
import 'assets/scss/reset.scss';
import 'assets/scss/components.scss';
import { useTranslation } from 'react-i18next';

export function Fliter({ doneFuc }) {
  const [date, setDate] = useState('day');
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState('');
  const [selectedDate, handleDateChange] = useState([null, null]);
  const [selectOption, setSelectOption] = useState('OR');
  const [openSelectOption, setOpenSelectOption] = useState(false);
  const [arrFilterAnd, setArrFilterAnd] = useState([]);
  const [arrFilterOR, setArrFilterOR] = useState([]);
  const [arrFilterExcept, setArrFilterExcept] = useState([]);

  const clickSelectOption = (name) => {
    setSelectOption(name);
    setOpenSelectOption(!selectOption);
  };
  const clickPlusOption = (fliter, search) => {
    if (fliter === 'AND') {
      setArrFilterAnd([...arrFilterAnd, search]);
    } else if (fliter === 'OR') {
      setArrFilterOR([...arrFilterOR, search]);
    } else {
      setArrFilterExcept([...arrFilterExcept, search]);
    }
  };
  return (
    <div className="filter relative">
      <div className="filter-conent">
        <div className="filter-hr">
          <div className="flex-between ">
            <div className="filter-title">기간</div>
            <div className="flex-center date-box">
              <div
                className={'box-left filter-box flex-center ' + (date === 'day' && 'active')}
                onClick={() => setDate('day')}
              >
                Day
              </div>
              <div className={`filter-box flex-center ${date === 'week' && 'active'}`} onClick={() => setDate('week')}>
                Week
              </div>
              <div
                className={`filter-box flex-center ${date === 'month' && 'active'}`}
                onClick={() => setDate('month')}
              >
                Month
              </div>
              <div
                className={`box-right filter-box flex-center ${date === 'select' && 'active'}`}
                onClick={() => setDate('select')}
              >
                Select
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
            <div className="keyword-select relative" onClick={() => setOpenSelectOption(!openSelectOption)}>
              <div>{selectOption}</div>
              <div>
                <img src={require('images/club/arrow-bottom.png')} alt="" />
              </div>
              <div className="select-option" style={{ display: openSelectOption ? 'block' : 'none' }}>
                <div className="select-option-item flex-center" onClick={() => clickSelectOption('AND')}>
                  AND
                </div>
                <div className="select-option-item flex-center" onClick={() => clickSelectOption('OR')}>
                  OR
                </div>
                <div className="select-option-item flex-center" onClick={() => clickSelectOption('Except')}>
                  Except
                </div>
              </div>
            </div>
          </div>
          <div className="flex-center relative">
            <input
              type="text"
              className="keyword-input"
              placeholder="search..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="seachPlus" onClick={() => clickPlusOption(selectOption, keyword)}>
              <img src={require('images/components/plus.png')} />
            </div>
          </div>
        </div>
      </div>
      <div className="filter-tag">
        <div className="filter-tag-list">
          <div className="filter-tag-title">And</div>
          {arrFilterAnd.map((item, index) => {
            return (
              <div className="filter-tag-item" key={index}>
                {item}
              </div>
            );
          })}
        </div>
        <div className="filter-tag-list">
          <div className="filter-tag-title">Or</div>

          {arrFilterOR.map((item, index) => {
            return (
              <div className="filter-tag-item" key={index}>
                {item}
              </div>
            );
          })}
        </div>
        <div className="filter-tag-list">
          <div className="filter-tag-title">Except</div>
          {arrFilterExcept.map((item, index) => {
            return (
              <div className="filter-tag-item" key={index}>
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div className="filter-actions">
        <div className="filter-done flex-center" onClick={doneFuc}>
          적용
        </div>
      </div>
    </div>
  );
}
Fliter.propTypes = {};

Fliter.defaultProps = {};
