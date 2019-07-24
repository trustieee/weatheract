import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ForecastDay from './ForecastDay';
import './ForecastList.css';
import * as tempUtils from '../../utils/temperature';

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
  const [toScale, setToScale] = useState(tempUtils.FAHRENHEIT);
  const [fromScale, setFromScale] = useState(tempUtils.KELVIN);

  const handleScaleClick = function() {
    const previousScale = toScale;
    const nextScale =
      tempUtils.scales.indexOf(previousScale) === tempUtils.scales.length - 1
        ? tempUtils.scales[0]
        : tempUtils.scales[tempUtils.scales.indexOf(previousScale) + 1];
    setToScale(nextScale);
    setFromScale(previousScale);
  };

  const forecast = props.forecast;
  if (!forecast || !forecast.city || !forecast.city.name || !forecast.dates) {
    return <div>No weather data</div>;
  }
  return (
    <div className="forecast-list-container">
      <h3 className="forecast-list-header">
        {forecast.city.name}
        <span className="scale" onClick={handleScaleClick}>
          <sup>({toScale})</sup>
        </span>
      </h3>
      <div className="forecast-list">
        {Object.keys(forecast.dates).map(day => (
          <div key={day} className="forecast-list-day-container">
            <ForecastDay
              day={forecast.dates[day]}
              toScale={toScale}
              fromScale={fromScale}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastList;
