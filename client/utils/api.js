import axios from 'axios';

export async function sendServerRequest(requestBody, serverPort=getOriginalServerPort())
{
  try { return await axios.post(`${serverPort}/api/${requestBody.requestType}`, requestBody) }
  catch(error) { return null; }
}

export function getOriginalServerPort()
{
  return `${location.protocol}\/\/${location.hostname}:${location.port}`;
}
