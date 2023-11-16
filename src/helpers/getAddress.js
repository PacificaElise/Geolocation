import { API_KEY } from '../../config';

export async function getAddress(ip = '8.8.8.8') {
  const response = await fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ip}`
  );

  return await response.json();
}
