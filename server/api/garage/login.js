const executeMongoCommand = require("../../executeMongoCommand");

let login = [];

login.push(
	{
		path: '/login',
		callback: (req, res) =>
		{
			const { username, password } = req.body;

			executeMongoCommand('Rosoff-Club', 'Login-Data', 'findOne', {username: username})
			.then((r) =>
			{
				if (!r)
				{
					res.send({success: false, userData: r, message: "No Account Found"});
				}

				else if(!r.admin && !r.approved)
				{
					res.send({success: false, userData: r, message: "Your Account Has Not Been Approved By An Admin"});
				}

				else if (r.password === password)
				{
					res.send({success: true, userData: r, message: "Login Successful"});
				}

				else
				{
					res.send({success: false, userData: r, message: "Invalid Password"});
				}
			});
		}
	}
);

login.push(
	{
		path: '/createAccount',
		callback: (req, res) =>
		{
			const { username } = req.body;

			executeMongoCommand('Rosoff-Club', 'Login-Data', 'findOne', {username: username})
			.then((r) =>
			{
				if(!r)
				{
					executeMongoCommand('Rosoff-Club', 'Login-Data', 'insertOne', req.body)
					.then(r => res.send({success: true, message: "Account Created Successfully"}));
				}

				else res.send({success: false, message: "Account With Username Already Exists!"})
			});
		}
	}
);

login.push(
	{
		path: '/getPendingAccounts',
		callback: (req, res) =>
		{
			executeMongoCommand('Rosoff-Club', 'Login-Data', 'find', {approved: false})
			.then((r) =>
			{
				if (r)
				{
					let users = [];
					r.forEach(item => users.push(item));
					res.send({success: true, userData: users, message: "Found Unapproved Accounts"})
				}
			});
		}
	}
);


module.exports = login;
