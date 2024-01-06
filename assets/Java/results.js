window.onload = function(){
    let queryParams = new URLSearchParams(window.location.search);
    let city = queryParams.get('city');
    if(!city) {
        window.location.href='index.html';
    }
    const apiKey = f1820185a54de142b8e99d9732f66c85;
    const apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    document.getElementById('loading').style.display = 'block';
    
    fetch(apiUrl)
    .then(respone => respone.json())
    .then(data => {
        document.getElementById('loading').style.display = 'none';
        const weatherContainer = document.getElementById('weather-container');
    })
}