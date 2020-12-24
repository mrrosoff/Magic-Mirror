import axios from "axios";

export const get = async (location, params) =>
{
	try
	{
		return await axios.get("/api/" + location, {params: params});
	}

	catch(err)
	{
		return null;
	}
}

export const post = async (location, payload) =>
{
	try
	{
		return await axios.post("/api/" + location, payload);
	}

	catch(err)
	{
		return null;
	}
}

export const getSurf = async () =>
{
	try
	{
		return await axios.get(`https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=5842041f4e65fad6a77088af&days=5&intervalHours=3&maxHeights=true`)
	}

	catch(err)
	{
		return null;
	}
}

export const getTidePrediction = async ({station = "9410230"}) =>
{
	try
	{
		return await axios.get(`https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=today&station=${station}&product=predictions&datum=MLLW&time_zone=lst&units=english&format=json`);
	}

	catch(err)
	{
		return null;
	}
}

export const getTideActual = async ({station = "9410230"}) =>
{
	try
	{
		return await axios.get(`https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=today&station=${station}&product=one_minute_water_level&datum=MLLW&time_zone=lst&units=english&format=json`);
	}

	catch(err)
	{
		return null;
	}
}

export const getWeather = async ({zip = "92130", key}) =>
{
	try
	{
		return await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${key}`)
	}

	catch(err)
	{
		return null;
	}
}
