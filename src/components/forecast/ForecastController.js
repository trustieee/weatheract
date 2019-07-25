import React, { useState, useEffect } from 'react';
import ForecastList from './ForecastList';
import Loading from '../common/Loading';

const condition = id => {
  if (id >= 200 && id < 300) return 'thunderstorm';
  if (id >= 300 && id < 400) return 'drizzle';
  if (id >= 500 && id < 600) return 'rain';
  if (id >= 600 && id < 700) return 'snow';
  if (id === 800) return 'clear';
  if (id > 800) return 'cloudy';

  return 'unknown';
};

const ForecastController = () => {
  const [forecast, setForecast] = useState({
    forecast: {
      city: {},
      dates: {}
    },
    zip: 90210
  });
  const [zip, setZip] = useState(90210);
  const [isLoading, setIsLoading] = useState(true);

  const formattedDate = time => {
    const date = new Date(time * 1000);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const formattedTime = time => {
    const date = new Date(time * 1000);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
    }

    // TODO: setup caching

    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=06fac84e7834a80aa600d399404a3ffd`
    )
      .then(resp => resp.json())
      .then(json => {
        const tempForecast = {
          city: json.city,
          dates: json.list.reduce((map, obj) => {
            const key = formattedDate(obj.dt);
            const item = {
              hour: {
                time: formattedTime(obj.dt),
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
        Object.keys(tempForecast.dates).forEach(date => {
          tempForecast.dates[date].hours.forEach(d => {
            if (Object.keys(groups).indexOf(d.hour.condition) === -1) {
              groups[d.hour.condition] = 1;
            } else {
              groups[d.hour.condition] += 1;
            }
          });
          tempForecast.dates[date].sums = { ...groups };
          groups = {};
        });

        setForecast(tempForecast);
        setIsLoading(false);
      });
  }, [zip]);

  const handleZipChange = zip => {
    setZip(zip);
  };

  return (
    <>
      {isLoading === true ? <Loading /> : <></>}
      <ForecastList
        forecast={forecast}
        onZipChange={handleZipChange}
        zip={zip || 12345}
      />
    </>
  );
};

export default ForecastController;
