import React from 'react';

function ForecastList() {
  const days = [];

  const renderDay = day => {
    <div>day</div>;
  };

  return <div>{days.map(day => renderDay(day))}</div>;
}

export default ForecastList;
