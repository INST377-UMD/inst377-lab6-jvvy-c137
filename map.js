const map = L.map('map').setView([37.5, -96], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

const coordinates = [
  { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) },
  { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) },
  { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) }
];

async function fetchLocality(lat, lon, markerIndex) {
  try {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
    const data = await response.json();
    const locality = data.locality || 'Locality not found';

    document.getElementById(`marker${markerIndex}-lat`).innerText = `Latitude: ${lat}`;
    document.getElementById(`marker${markerIndex}-lon`).innerText = `Longitude: ${lon}`;
    document.getElementById(`marker${markerIndex}-locality`).innerText = `Locality: ${locality}`;
  } catch (error) {
    console.error("Error fetching locality:", error);
    document.getElementById(`marker${markerIndex}-locality`).innerText = "Error fetching locality";
  }
}

coordinates.forEach((coord, index) => {
  const marker = L.marker([coord.lat, coord.lon]).addTo(map);
  marker.bindPopup(`Marker ${index + 1}`).openPopup();

  fetchLocality(coord.lat, coord.lon, index + 1);
});
