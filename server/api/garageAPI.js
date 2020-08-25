let executeMongoCommand = require("../executeMongoCommand");

let garageAPI = [];

garageAPI.push(
	{
		path: '/login',
		callback: (req, res) =>
		{
			let { username, password } = req.body;
			executeMongoCommand('Rosoff-Club', 'Login-Data', 'findOne', {username: username})
			.then((r) =>
			{
				if (!r)
				{
					res.send({loginSuccess: false, message: "No Account Found"});
				}

				else if(!r.admin && !r.approved)
				{
					res.send({loginSuccess: false, message: "Your Account Has Not Been Approved By An Admin"});
				}

				else if (r.password === password)
				{
					res.send({loginSuccess: true, message: "Login Successful", admin: r.admin});
				}

				else
				{
					res.send({loginSuccess: false, message: "Invalid Password"});
				}
			});
		}
	}
);

garageAPI.push(
	{
		path: '/createAccount',
		callback: (req, res) =>
		{
			let { username } = req.body;

			executeMongoCommand('Rosoff-Club', 'Login-Data', 'findOne', {username: username})
			.then((r) =>
			{
				if(!r)
				{
					executeMongoCommand('Rosoff-Club', 'Login-Data', 'insertOne', req.body)
					.then(r => res.send({accountCreationSuccess: true, message: "Account Created Successfully"}));
				}

				else res.send({accountCreationSuccess: false, message: "Account With Username Already Exists!"})
			});
		}
	}
);

garageAPI.push(
	{
		path: '/garageSwitch',
		callback: (req, res) =>
		{
			let {percentClosed} = req.body;

			let gpio = require('onoff').Gpio;
			let doorPin = new gpio(4, 'out');
			doorPin.writeSync(1);

			const flipSwitch = () =>
			{
				doorPin.writeSync(0);
				setTimeout(() => doorPin.writeSync(1), 500);
			};

			flipSwitch();

			if(percentClosed !== 100)
			{
				setTimeout(() =>
				{
					flipSwitch();
					setTimeout(() =>
					{
						flipSwitch();
					}, 2000 + 1000 * (90 - percentClosed) / 10)
				}, 9000);
			}
		}
	}
);

garageAPI.push(
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

module.exports = garageAPI;
