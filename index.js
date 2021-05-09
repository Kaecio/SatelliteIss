const stopBtn = document.querySelector(".stop");
const startBtn = document.querySelector(".start");

let map = L.map("mapid").setView([0, 0], 5);

const satelliteIcon = L.icon({
  iconUrl: "img/sat.png",
  iconSize: [80, 80],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});
const marker = L.marker([0, 0], { icon: satelliteIcon }).addTo(map);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tilesUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tilesUrl, { attribution });
tiles.addTo(map);

const api = "https://api.wheretheiss.at/v1/satellites/25544";

async function getSatellite() {
  const response = await fetch(api);
  const data = await response.json();
  console.log(data);
  let { latitude, longitude, altitude } = data;

  //L.marker([latitude, longitude]).addTo(map);
  marker.setLatLng([latitude, longitude]);
  map.setView([latitude, longitude]);
  const latitude1 = document.querySelector(".latitude");
  const longitude2 = document.querySelector(".longitude");
  const altitude1 = document.querySelector(".altitude");

  latitude1.innerHTML = latitude.toFixed(2);
  longitude2.innerHTML = longitude.toFixed(2);
  altitude1.innerHTML = altitude;
}
let travar = false;
function b() {
  travar = true;
  setInterval(() => {
    getSatellite();
  }, 1000);
}

stopBtn.addEventListener("click", () => {
  clearInterval(b);
  console.log("funcionou stop");
});

startBtn.addEventListener("click", () => {
  console.log("funcionou start");
  if (travar == false) {
    b();
  } else {
    return;
  }
});
//teste
