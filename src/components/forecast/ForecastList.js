import React from 'react';
import PropTypes from 'prop-types';
import ForecastDay from './ForecastDay';
import './ForecastList.css';

ForecastList.propTypes = {
  forecast: PropTypes.shape({
    city: PropTypes.shape({
      coord: PropTypes.shape({
        lat: PropTypes.number,
        lon: PropTypes.number
      }),
      country: PropTypes.string,
      id: PropTypes.number,
      name: PropTypes.string
    }),
    dates: PropTypes.object
  })
};

function ForecastList(props) {
  const forecast = props.forecast;
  if (!forecast || !forecast.city || !forecast.city.name || !forecast.dates) {
    return <div>No weather data</div>;
  }

  return (
    <div className="forecast-list-container">
      <div className="forecast-list-header">{forecast.city.name}</div>
      <div className="forecast-list">
        {Object.keys(forecast.dates).map(day => (
          <div key={day} className="forecast-list-day-container">
            <ForecastDay day={forecast.dates[day]} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastList;
