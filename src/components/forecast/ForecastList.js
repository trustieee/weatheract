import React from 'react';
import PropTypes from 'prop-types';
import Day from './ForecastDay';
import './ForecastList.css';

ForecastList.propTypes = {
  days: PropTypes.array.isRequired
};

function ForecastList(props) {
  const days = props.days;
  return (
    <div className="forecast-list">
      {days.map(day => (
        <Day key={day.date} day={day} />
      ))}
    </div>
  );
}

export default ForecastList;
