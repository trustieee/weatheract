import React, { Component } from 'react';
import Title from './Title';
import ForecastList from './ForecastList';

class ForecastController extends Component {
  render() {
    return (
      <div>
        <Title />
        <ForecastList />
      </div>
    );
  }
}

export default ForecastController;
