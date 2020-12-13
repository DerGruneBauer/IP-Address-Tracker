let searchButton = document.querySelector('.search');
let ip = document.querySelector('.ipInfo');
let timezone = document.querySelector('.timezoneInfo');
let locationInfo = document.querySelector('.locationInfo');
let isp = document.querySelector('.ispInfo');
let myMap;
//@ts-ignore
let icon = L.icon({
  iconUrl: './images/icon-location.svg',
  iconSize: [46, 56],
})


//Initial fetch to get users current IP address and location
fetch('http://ip-api.com/json/?fields=query,timezone,isp,city,regionName,lat,lon')
  .then(function (response) {
    response.json().then(jsonData => {
      locationInfo.innerHTML = `${jsonData.city}, ${jsonData.regionName}`;
      ip.innerHTML = `${jsonData.query}`;
      timezone.innerHTML = `${jsonData.timezone}`;
      isp.innerHTML = `${jsonData.isp}`;
      //@ts-ignore
      myMap = L.map('map', { zoomControl: false }).setView([jsonData.lat, jsonData.lon], 12);
      //@ts-ignore
      L.tileLayer('http://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=V2AGrVgNxQIkpoPBnhWT', {
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1,
      }).addTo(myMap);
      //@ts-ignore
      let marker = L.marker([jsonData.lat, jsonData.lon], { icon: icon }).addTo(myMap)
    });
  })
  .catch(function (error) {
    console.log('initial map error');
  });


//Function to submit new IP address and find other location. Updates map and additional info
let ipSearch = function () {
  //@ts-ignore
  let ipQuery = document.querySelector('#ipInput').value;
  if (ipQuery.length == 0 || !ipQuery.match(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)){
    window.alert("Need to enter a valid IP address");
  } else {
  fetch(`http://ip-api.com/json/${ipQuery}?fields=query,timezone,isp,city,regionName,lat,lon`)
    .then(function (response) {
      response.json().then(jsonData => {
        myMap.remove();
        locationInfo.innerHTML = `${jsonData.city}, ${jsonData.regionName}`;
        ip.innerHTML = `${jsonData.query}`;
        timezone.innerHTML = `${jsonData.timezone}`;
        isp.innerHTML = `${jsonData.isp}`;
        //@ts-ignore
        myMap = L.map('map', { zoomControl: false }).setView([jsonData.lat, jsonData.lon], 12);
        //@ts-ignore
        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=V2AGrVgNxQIkpoPBnhWT', {
          attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a><a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
          maxZoom: 18,
          tileSize: 512,
          zoomOffset: -1,
        }).addTo(myMap);
        //@ts-ignore
        let marker = L.marker([jsonData.lat, jsonData.lon], { icon: icon }).addTo(myMap)
      });
    })
    .catch(function (error) {
      console.log('second map error');
    });
}}


