
let garage = [];

garage.push(
	{
		path: '/garageSwitch',
		callback: (req, res) =>
		{
			let gpio = require('onoff').Gpio;
			let doorPin = new gpio(4, 'out');
			doorPin.writeSync(1);

			const flipSwitch = () =>
			{
				doorPin.writeSync(0);
				setTimeout(() => doorPin.writeSync(1), 500);
			};

			flipSwitch();
		}
	}
);

module.exports = garage;
