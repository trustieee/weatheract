import React, { Component } from 'react';
import ForecastList from './ForecastList';
import days from '../../../test/mock';

class ForecastController extends Component {
  render() {
    return (
      <>
        <ForecastList days={days} />
      </>
    );
  }
}

export default ForecastController;
