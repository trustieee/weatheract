import React, { Component } from 'react';
import ForecastList from './ForecastList';

const condition = id => {
  if (id >= 200 && id < 300) return 'thunderstorm';
  if (id >= 300 && id < 400) return 'drizzle';
  if (id >= 500 && id < 600) return 'rain';
  if (id >= 600 && id < 700) return 'snow';
  if (id === 800) return 'clear';
  if (id > 800) return 'cloudy';

  return 'unknown';
};

class ForecastController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: {
        city: {},
        dates: {}
      },
      zip: 90210
    };
  }

  handleZipChange(zip) {
    console.log(zip);
  }

  formattedDate(time) {
    const date = new Date(time * 1000);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  formattedTime(time) {
    const date = new Date(time * 1000);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }

  componentDidMount() {
    const localState = localStorage.getItem(
      `weatheract-state-${this.state.zip}`
    );
    if (localState) {
      this.setState({ forecast: JSON.parse(localState) });
      return;
    }

    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?zip=${
        this.state.zip
      }&appid=06fac84e7834a80aa600d399404a3ffd`
    )
      .then(resp => resp.json())
      .then(json => {
        const forecast = {
          city: json.city,
          dates: json.list.reduce((map, obj) => {
            const key = this.formattedDate(obj.dt);
            const item = {
              hour: {
                time: this.formattedTime(obj.dt),
                temperature: obj.main.temp,
                condition: condition(obj.weather[0].id)
              }
            };
            if (Object.keys(map).indexOf(key) === -1) {
              map[key] = { hours: [], sums: {} };
              map[key].hours = new Array(item);
            } else {
              map[key].hours.push(item);
            }
            return map;
          }, {})
        };
        let groups = {};
        Object.keys(forecast.dates).forEach(date => {
          forecast.dates[date].hours.forEach(d => {
            if (Object.keys(groups).indexOf(d.hour.condition) === -1) {
              groups[d.hour.condition] = 1;
            } else {
              groups[d.hour.condition] += 1;
            }
          });
          forecast.dates[date].sums = { ...groups };
          groups = {};
        });

        localStorage.setItem(
          `weatheract-state-${this.state.zip}`,
          JSON.stringify(forecast)
        );
        this.setState({ forecast: forecast });
      });
  }

  render() {
    return (
      <ForecastList
        forecast={this.state.forecast}
        onZipChange={this.handleZipChange}
      />
    );
  }
}

export default ForecastController;
