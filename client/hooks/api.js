import axios from 'axios';

export async function sendGetRequest(requestType, serverPort=getOriginalServerPort())
{
  try { return await axios.get(`${serverPort}/api/garage/${requestType}`); }
  catch(error) { return null; }
}

export async function sendPostRequest(requestType, requestBody, serverPort=getOriginalServerPort())
{
  try { return await axios.post(`${serverPort}/api/garage/${requestType}`, requestBody) }
  catch(error) { return null; }
}

export function getOriginalServerPort()
{
  return `${location.protocol}\/\/${location.hostname}:${location.port}`;
}
