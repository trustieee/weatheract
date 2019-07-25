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
  }),
  onZipChange: PropTypes.func.isRequired
};

function ForecastList(props) {
  const [toScale, setToScale] = useState(tempUtils.FAHRENHEIT);
  const [fromScale, setFromScale] = useState(tempUtils.KELVIN);
  const [isEditing, setIsEditing] = useState(false);

  const handleScaleClick = function() {
    const previousScale = toScale;
    const nextScale =
      tempUtils.scales.indexOf(previousScale) === tempUtils.scales.length - 1
        ? tempUtils.scales[0]
        : tempUtils.scales[tempUtils.scales.indexOf(previousScale) + 1];
    setToScale(nextScale);
    setFromScale(previousScale);
  };

  const handleLocClick = function() {
    setIsEditing(!isEditing);
  };

  const handleZipSubmit = function(event) {
    debugger;
    event.preventDefault();
    setIsEditing(!isEditing);
    props.onZipChange(event.target.zip.value);
  };

  const forecast = props.forecast;
  if (!forecast || !forecast.city || !forecast.city.name || !forecast.dates) {
    return <div>Loading weather data...</div>;
  }
  return (
    <div className="forecast-list-container">
      <div className="forecast-list-header-container">
        <h3 className="forecast-list-header">
          {isEditing ? (
            <form onSubmit={handleZipSubmit}>
              <input
                type="text"
                className="form-control-sm"
                name="zip"
                placeholder="enter zip..."
              />
            </form>
          ) : (
            forecast.city.name
          )}
        </h3>
        <span className="header-clickable" onClick={handleScaleClick}>
          <sup>({toScale})</sup>
        </span>
        <span className="header-clickable" onClick={handleLocClick}>
          <sup>(loc)</sup>
        </span>
      </div>
      <div className="forecast-list">
        {Object.keys(forecast.dates).map(day => (
          <div key={day} className="forecast-list-day-container">
            <ForecastDay
              day={forecast.dates[day]}
              toScale={toScale}
              fromScale={fromScale}
              date={day}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastList;
