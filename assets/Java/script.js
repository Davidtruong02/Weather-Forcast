function getWeather() {
    let city = document.getElementById('city').value;
    window.location.href='weather.html?city=${city}';
}