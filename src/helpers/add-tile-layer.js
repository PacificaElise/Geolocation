import L from 'leaflet';

export function addTileLayer(map) {
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: `Challenge by
    <a
      href="https://www.frontendmentor.io?ref=challenge"
      target="_blank"
      >Frontend Mentor</a
    >. Coded by <a href="#">Tatiana Ivanova</a>.`,
  }).addTo(map);
}
