"use strict";
//on page load user sees own IP information but is able to search for any
//Need to set interactive states
// //@ts-ignore
// let myMap = L.map('map').setView([jsonData.lon, jsonData.lat], 1);
// //@ts-ignore
// L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=V2AGrVgNxQIkpoPBnhWT', {
//     attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
//     maxZoom: 18,
//     tileSize: 512,
//     zoomOffset: -1,
// }).addTo(myMap);
// //@ts-ignore
// let marker = L.marker([0, 0]).addTo(myMap)
//need x and y coord, isp, timezone, IP address, Location (city, state)
let ip = document.querySelector('.ipInfo');
let timezone = document.querySelector('.timezoneInfo');
let locationInfo = document.querySelector('.locationInfo');
let isp = document.querySelector('.ispInfo');
//@ts-ignore
let icon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [46, 56],
});
fetch('http://ip-api.com/json/?fields=query,timezone,isp,city,regionName,lat,lon')
    .then(function (response) {
    response.json().then(jsonData => {
        //@ts-ignore
        locationInfo.innerHTML = `${jsonData.city}, ${jsonData.regionName}`;
        //@ts-ignore
        ip.innerHTML = `${jsonData.query}`;
        //@ts-ignore
        timezone.innerHTML = `${jsonData.timezone}`;
        //@ts-ignore
        isp.innerHTML = `${jsonData.isp}`;
        //@ts-ignore
        let myMap = L.map('map').setView([jsonData.lat, jsonData.lon], 12);
        //@ts-ignore
        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=V2AGrVgNxQIkpoPBnhWT', {
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
            maxZoom: 18,
            tileSize: 512,
            zoomOffset: -1,
        }).addTo(myMap);
        //@ts-ignore
        let marker = L.marker([jsonData.lat, jsonData.lon], { icon: icon }).addTo(myMap);
    });
})
    .catch(function (error) {
    console.log(error);
});
