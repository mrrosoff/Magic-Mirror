
let garageWeatherData = [];

garageWeatherData.push(
	{
		path: '/getLatLngWeatherStats',
		callback: (req, res) =>
		{
			let { lat, lng } = req.body;
			const params = [
				'airTemperature', 'cloudCover', 'currentDirection', 'currentSpeed',
				'gust', 'humidity', 'swellDirection', 'swellHeight', 'swellPeriod',
				'secondarySwellPeriod', 'secondarySwellDirection', 'secondarySwellHeight',
				'waterTemperature', 'waveDirection', 'waveHeight', 'wavePeriod', 'windDirection', 'windSpeed',
			].join(',');

			let url = `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`;

			try
			{
				const axios = require('axios');

				axios.get(url, { headers: { Authorization: '39ddd11e-c628-11ea-954a-0242ac130002-39ddd1d2-c628-11ea-954a-0242ac130002' }})
				.then(weatherData => res.send(weatherData.data))
				.catch(err => console.error(err));
			}
			catch(error) {}
		}
	}
);

module.exports = garageWeatherData;
