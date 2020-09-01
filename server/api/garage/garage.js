
let garageGarageData = [];

garageGarageData.push(
	{
		path: '/garageSwitch',
		callback: (req, res) =>
		{
			console.error("Hello!");
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

module.exports = garageGarageData;
