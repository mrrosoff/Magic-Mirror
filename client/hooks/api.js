import axios from 'axios';

export const sendGarageUserDataRequest = async (requestType, userData) =>
{
  return await sendGaragePostRequest(requestType, {userData: userData});
}

export const sendGarageGarageDataRequest = async (requestType, garageData) =>
{
  return await sendGaragePostRequest(requestType, {garageData: garageData});
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
          garageData: requestBody.garageData
        }

    return await axios.post(serverPort + '/api' + requestPath, jsonRequest)
  }
  catch(error) { return null; }
}

export const getOriginalServerPort = () =>
{
  return `${location.protocol}\/\/${location.hostname}:${location.port}`;
}
