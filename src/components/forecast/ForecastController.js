import React, { Component } from 'react';
import Title from './ForecastTitle';
import ForecastList from './ForecastList';
import './ForecastController.css';

class ForecastController extends Component {
  render() {
    return (
      <div className="forecast-controller">
        <div>forecasts</div>
        <Title />
        <ForecastList />
      </div>
    );
  }
}

export default ForecastController;
