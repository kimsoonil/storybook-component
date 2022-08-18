import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../assets/css/components.css';
import * as dayjs from 'dayjs';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import { DateRangePicker, LocalizationProvider, DateRangeDelimiter } from '@material-ui/pickers';

export const Fliter = ({}) => {
  const [sort, setSort] = useState('new'); //popularity
  const [date, setDate] = useState('All'); // All 3month Select

  const [keyword, setKeyword] = useState('');

  const [selectedDate, handleDateChange] = React.useState([null, null]);

  const startDateChange = (value) => {
    setStartDate(value);
    setStartDateShow(false);
  };
  const endDateChange = (value) => {
    setEndDate(value);
    setEndDateShow(false);
  };
  const startDateFouce = () => {
    setStartDateShow(true);
    setEndDateShow(false);
  };
  const endDateFouce = () => {
    setStartDateShow(false);
    setEndDateShow(true);
  };
  return (
    <div className="filter relative">
      <div className="filter-conent">
        <div className="flex-between filter-hr">
          <div className="filter-title">Sort by</div>
          <div className="flex-center sort-box">
            <div
              className={'box-left filter-box flex-center ' + (sort === 'new' && 'active')}
              onClick={() => setSort('new')}
            >
              최신순
            </div>
            <div
              className={'box-right filter-box flex-center ' + (sort === 'popularity' && 'active')}
              onClick={() => setSort('popularity')}
            >
              인기순
            </div>
          </div>
        </div>
        <div className="filter-hr">
          <div className="flex-between ">
            <div className="filter-title">Date</div>
            <div className="flex-center date-box">
              <div
                className={'box-left filter-box flex-center ' + (date === 'All' && 'active')}
                onClick={() => setDate('All')}
              >
                A week
              </div>
              <div
                className={'filter-box flex-center ' + (date === '3month' && 'active')}
                onClick={() => setDate('3month')}
              >
                3 month
              </div>
              <div
                className={'box-right filter-box flex-center ' + (date === 'select' && 'active')}
                onClick={() => setDate('select')}
              >
                Select a Date
              </div>
            </div>
          </div>
          <div className={date !== 'select' ? 'none' : 'calendar flex-center'}>
            <LocalizationProvider dateAdapter={DateFnsUtils}>
              <DateRangePicker
                startText="Check-in"
                endText="Check-out"
                value={selectedDate}
                onChange={(date) => handleDateChange(date)}
                renderInput={(startProps, endProps) => (
                  <>
                    <TextField {...startProps} />
                    <DateRangeDelimiter> to </DateRangeDelimiter>
                    <TextField {...endProps} />
                  </>
                )}
              />
            </LocalizationProvider>
          </div>
        </div>

        <div className="flex-between keyword">
          <div className="filter-title">Keyword</div>
          <div className="flex-center relative">
            <input
              className="keyword-input"
              placeholder="search..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="seachIc">
              <img src={require('../assets/components/ic_search_wh.svg').default} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-between filter-acctions">
        <div className="filter-cancle">Cancle</div>
        <div className="filter-done flex-center">Done</div>
      </div>
    </div>
  );
};
Fliter.propTypes = {};

Fliter.defaultProps = {};
