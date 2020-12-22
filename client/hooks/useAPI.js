import axios from "axios";

export const get = async(location, params) =>
{
	try
	{
		return await axios.get("/api/" + location, {params: params});
	}

	catch(err)
	{
		return null
	}
}

export const post = async(location, payload) =>
{
	try
	{
		return await axios.post("/api/" + location, payload);
	}

	catch(err)
	{
		return null
	}
}

export default {get, post};
