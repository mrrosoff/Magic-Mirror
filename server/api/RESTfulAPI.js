
const garageUserData = require("./garage/userData");
const garageGarageData = require("./garage/garage");
const garageWeatherData = require("./garage/weather");

const recipeasy = require("./recipeasy/recipeasyAPI");

module.exports =
	{
		garage: [...garageUserData, ...garageGarageData, ...garageWeatherData],
		recipeasy: [...recipeasy]
	}
