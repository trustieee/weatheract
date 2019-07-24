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
  }),
  toScale: PropTypes.string.isRequired,
  fromScale: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

function ForecastDay(props) {
  const hours = props.day.hours;
  return (
    <>
      <h6 className="forecast-day-date-header">{props.date}</h6>
      <div className="forecast-day">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Time</th>
              <th>
                Temp <sup>({props.toScale})</sup>
              </th>
            </tr>
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
                        toScale: props.toScale,
                        value: d.hour.temperature,
                        fromScale: props.fromScale
                      })}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ForecastDay;
