const apiKey = '38fa889185c6fc2f1707e0113edd3773'; 
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiUrl2 = 'https://api.openweathermap.org/data/2.5/forecast';
// Function to fetch current weather data from OpenWeatherMap API
async function getWeatherData(city) {
    const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=imperial`);
    if (!response.ok) {
        throw new Error('Unable to fetch weather data');
    }
    const weatherData=await response.json();
    displayWeather(weatherData)
    const {lat,lon}=weatherData.coord
    const responseforecast = await fetch(`${apiUrl2}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);
    if (!responseforecast.ok) {
        throw new Error('Unable to fetch weather data');
    }
    const forecastdata=await responseforecast.json();
    displayforecast(forecastdata)

}
function displayforecast(forecastdata){
    console.log (forecastdata)
    
}
// Function to display weather information
function displayWeather(weatherData) {
    // Implement code to display current weather data on the webpage
    console.log(weatherData);
    const weatherSection=document.querySelector(".weather-section")
    const h2el=document.createElement("h2")
    h2el.textContent=weatherData.name
    const h3el=document.createElement("h3")
    h3el.textContent=dayjs.unix(weatherData.dt).format("MM/DD/YYYY")
    const icon=document.createElement("img")
    icon.src=`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`
    const tempel=document.createElement("p")
    const humel=document.createElement("p")
    const windpel=document.createElement("p")
    tempel.textContent="Tempature "+weatherData.main.temp+"F"
    humel.textContent="Percentage "+weatherData.main.humidity+"%"
    windpel.textContent="Windspeed "+weatherData.wind.speed+"MPH"
    weatherSection.append(h2el,h3el,icon,tempel,humel,windpel)
}
function handlesearch (evt) {
    evt.preventDefault()
   let city= document.getElementById("city-input").value
getWeatherData(city)
}
// Example coordinates (latitude and longitude) for a location
const latitude = 40.7128; // Replace with the desired latitude
const longitude = -74.0060; // Replace with the desired longitude

// Fetch and display weather data


document.getElementById("search-form").addEventListener("submit",handlesearch)