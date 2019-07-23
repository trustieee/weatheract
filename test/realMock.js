const fs = require('fs');

const json = fs.readFileSync('./realData.json');
const raw = JSON.parse(json);

const condition = id => {
  if (id >= 200 && id < 300) return 'thunderstorm';
  if (id >= 300 && id < 400) return 'drizzle';
  if (id >= 500 && id < 600) return 'rain';
  if (id >= 600 && id < 700) return 'snow';
  if (id === 800) return 'clear';
  if (id > 800) return 'cloudy';

  return 'unknown';
};

const formatted = raw.list.map(i => {
  return {
    date: new Date(i.dt * 1000),
    temperature: i.main.temp,
    humidity: i.main.humidity,
    cloud: i.clouds.all,
    weatherCondition: condition(i.weather.id),
    updatedAt: i.dt_txt
  };
});

formatted.city = raw.city;

export default formatted;
