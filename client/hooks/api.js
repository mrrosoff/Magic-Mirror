import axios from 'axios';

export const sendUserDataRequest = (requestType, data) =>
{
    return sendGaragePostRequest(requestType, {userData: data});
}

export const sendGarageDataRequest = (requestType, data) =>
{
    return sendGaragePostRequest(requestType, {garageData: data});
}

export const sendWeatherDataRequest = (requestType, data) =>
{
    return sendGaragePostRequest(requestType, {weatherData: data});
}

export const sendGaragePostRequest = async (requestType, requestBody, serverPort=getOriginalServerPort()) =>
{
    try
    {
        let requestPath = '/garage/' + requestType

        const jsonRequest =
            {
                requestType: 'garage',
                apiPath: requestPath,
                userData: requestBody.userData,
                garageData: requestBody.garageData,
                weatherData: requestBody.weatherData
            };

        return await axios.post(serverPort + '/api' + requestPath, jsonRequest)
    }
    catch(error) { return null; }
}

export const getOriginalServerPort = () =>
{
    return `${location.protocol}\/\/${location.hostname}:${location.port}`;
}
