import 'babel-polyfill';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { addTileLayer, addOffset, getAddress, validateIp } from './helpers';
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');
btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

const mapArea = document.querySelector('#map');

let map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: 13,
});

addTileLayer(map);

const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
  shadowSize: [50, 64],
  shadowAnchor: [4, 62],
});

L.marker([51.5, -0.09], { icon: markerIcon }).addTo(map);

function getData() {
  if (validateIp(ipInput.value)) {
    getAddress(ipInput.value).then((data) => setInfo(data)); //или просто написать then.setInfo (автоматически передастся data)
  }
}

function handleKey(e) {
  if (e.key === 'Enter') {
    getData();
  }
}

function setInfo(mapData) {
  const {
    ip,
    country_name,
    continent_name,
    state_prov,
    city,
    latitude,
    longitude,
    time_zone,
    isp,
  } = mapData;

  let timezone = `${time_zone.offset}`.includes('-')
    ? `${time_zone.offset}.00`
    : `+${time_zone.offset}.00`;

  ipInfo.innerText = ip;
  locationInfo.innerText = `${city} ${state_prov} ${country_name} ${continent_name}`;

  timezoneInfo.innerText = timezone;
  ispInfo.innerText = isp;

  map.setView([latitude, longitude]);
  L.marker([latitude, longitude], { icon: markerIcon }).addTo(map);
  if (matchMedia('max-width: 1023').matches) {
    addOffset(map);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getAddress('102.22.22.1').then(setInfo);
});
