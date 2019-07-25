import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ForecastDay from './ForecastDay';
import './ForecastList.css';
import * as tempUtils from '../../utils/temperature';

const ForecastList = props => {
  const [toScale, setToScale] = useState(tempUtils.FAHRENHEIT);
  const [fromScale, setFromScale] = useState(tempUtils.KELVIN);
  const [isEditing, setIsEditing] = useState(false);
  const [editingZipValue, setEditingZipValue] = useState(12345);

  useEffect(() => {
    setEditingZipValue(props.zip);
  }, [props.zip]);

  const handleScaleClick = () => {
    const previousScale = toScale;
    const nextScale =
      tempUtils.scales.indexOf(previousScale) === tempUtils.scales.length - 1
        ? tempUtils.scales[0]
        : tempUtils.scales[tempUtils.scales.indexOf(previousScale) + 1];
    setToScale(nextScale);
    setFromScale(previousScale);
  };

  const handleLocClick = () => {
    setIsEditing(!isEditing);
  };

  const handleZipSubmit = event => {
    event.preventDefault();
    setIsEditing(!isEditing);
    setEditingZipValue(event.target.zip.value);
    props.onZipChange(parseInt(event.target.zip.value));
  };

  const handleOnZipType = event => {
    const re = /^[0-9\b]+$/;
    if (
      (!event.target.value && event.target.value !== '') ||
      (event.target.value.length <= 5 && re.test(event.target.value))
    ) {
      setEditingZipValue(event.target.value);
    }
  };

  const forecast = props.forecast;
  if (!forecast || !forecast.city || !forecast.city.name || !forecast.dates) {
    return <div />;
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
                value={editingZipValue}
                onChange={handleOnZipType}
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
};

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
  onZipChange: PropTypes.func.isRequired,
  zip: PropTypes.number.isRequired
};

export default ForecastList;
