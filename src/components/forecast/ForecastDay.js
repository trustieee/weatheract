import React from 'react';
import PropTypes from 'prop-types';
import './ForecastDay.css';
import * as tempUtils from '../../utils/temperature';

ForecastDay.propTypes = {
  day: PropTypes.shape({
    hours: PropTypes.arrayOf(
      PropTypes.shape({
        hour: PropTypes.shape({
          time: PropTypes.string.isRequired,
          condition: PropTypes.string.isRequired,
          temperature: PropTypes.number.isRequired
        })
      })
    ),
    sums: PropTypes.object.isRequired
  })
};

function ForecastDay(props) {
  const hours = props.day.hours;
  return (
    <div className="forecast-day">
      <table className="table table-hover table-bordered">
        <thead>
          <th>Time</th>
          <th>Temp</th>
        </thead>
        <tbody>
          {Object.values(hours)
            .slice(0, 10)
            .map((d, i) => {
              return (
                <tr key={i}>
                  <td>{d.hour.time}</td>
                  <td>
                    {tempUtils.convert({
                      toScale: tempUtils.FAHRENHEIT,
                      value: d.hour.temperature,
                      fromScale: tempUtils.KELVIN
                    })}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default ForecastDay;
