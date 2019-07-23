import React from 'react';
import PropTypes from 'prop-types';
import './ForecastDay.css';

ForecastDay.propTypes = {
  day: PropTypes.arrayOf(
    PropTypes.shape({
      hour: PropTypes.shape({
        condition: PropTypes.string.isRequired,
        temperature: PropTypes.number.isRequired,
        time: PropTypes.string.isRequired
      })
    })
  )
};

const getRandomColor = () =>
  ['red', 'blue', 'green', 'yellow', 'black', 'grey', 'orange', 'purple'][
    Math.floor(Math.random() * 8)
  ];

function ForecastDay(props) {
  const day = props.day;
  if (day) console.log(day);
  return (
    <div className="forecast-day" style={{ backgroundColor: getRandomColor() }}>
      {Object.values(day).map((d, i) => {
        return <div key={i}>{d.hour.time}</div>;
      })}
    </div>
  );
}

export default ForecastDay;
