import React from 'react';
import PropTypes from 'prop-types';
import './ForecastDay.css';

Day.propTypes = {
  day: PropTypes.shape({
    date: PropTypes.string.isRequired
  })
};

const getRandomColor = () =>
  ['red', 'blue', 'green', 'yellow', 'black', 'grey', 'orange', 'purple'][
    Math.floor(Math.random() * 8)
  ];

function Day(props) {
  const day = props.day;
  return (
    <div className="forecast-day" style={{ backgroundColor: getRandomColor() }}>
      {day.date}
    </div>
  );
}

export default Day;
