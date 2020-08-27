const executeMongoCommand = require("../../executeMongoCommand");

let garageUserData = [];

garageUserData.push(
	{
		path: '/login',
		callback: (req, res) =>
		{
			const { userData } = req.body;
			const { username, password } = userData;

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

garageUserData.push(
	{
		path: '/createAccount',
		callback: (req, res) =>
		{
			const { userData } = req.body;
			const { username } = userData;

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

module.exports = garageUserData;
