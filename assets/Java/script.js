var cityInput = document.getElementById('city');
var apiKey = 'f1820185a54de142b8e99d9732f66c85';
var searchForm = document.querySelector('.city-search');
var weatherInfo = document.getElementById('current-weather');
var forecastInfo = document.getElementById('forecast');
var historyList = document.getElementById('search-history');

var enteredCities = [];

function getWeather(city) {
    var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            // Extract and display current weather information
            var cityName = data.name;
            var date = new Date(data.dt * 1000);
            var icon = data.weather[0].icon;
            var temperature = data.main.temp;
            var humidity = data.main.humidity;
            var windSpeed = data.wind.speed;

            var currentWeatherHTML = `
                <h2>${cityName}</h2>
                <p>Date: ${date.toLocaleDateString()}</p>
                <p><img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon"></p>
                <p>Temperature: ${temperature} °C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            `;

            weatherInfo.innerHTML = currentWeatherHTML;
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            var forecastHTML = '<h3>5-Day Forecast</h3>';
            var dailyForecast = {};

            data.list.forEach(forecast => {
                var date = new Date(forecast.dt * 1000).toLocaleDateString();
                var time = new Date(forecast.dt * 1000).getHours();

                if (time === 12 && !dailyForecast[date]) {
                    var icon = forecast.weather[0].icon;
                    var temperature = forecast.main.temp;
                    var humidity = forecast.main.humidity;
                    var windSpeed = forecast.wind.speed;

                    dailyForecast[date] = {
                        icon,
                        temperature,
                        humidity,
                        windSpeed,
                    };
                }
            });

            Object.keys(dailyForecast).forEach(date => {
                var dayForecast = dailyForecast[date];

                forecastHTML += `
                    <div>
                        <p>Date: ${date}</p>
                        <p> <img src="https://openweathermap.org/img/w/${dayForecast.icon}.png" alt="Weather Icon"></p>
                        <p>Temperature: ${dayForecast.temperature} °C</p>
                        <p>Humidity: ${dayForecast.humidity}%</p>
                        <p>Wind Speed: ${dayForecast.windSpeed} m/s</p>
                    </div>
                `;
            });

            weatherInfo.innerHTML += forecastHTML;
        })
        .catch(error => {
            console.error('Error fetching 5-day forecast data:', error);
        });

    // Add city to search history
    if (!enteredCities.includes(city)) {
        enteredCities.push(city);
        updateHistory();
    }
}

function updateHistory() {
    historyList.innerHTML = '<h3>Search History</h3>';
    enteredCities.forEach(city => {
        historyList.innerHTML += `<p class="history-item" onclick="getWeather('${city}')">${city}</p>`;
    });
}

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var city = cityInput.value;

    getWeather(city);
});
updateHistory();
