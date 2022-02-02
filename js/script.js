

async function searchWeather(cityName) {

    //Current weather
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`
    let response = await fetch(apiUrl);
    let res = await response.json();
    console.log(res);

    let cardArea = document.getElementById('current-weather-area');
    let tempEl = document.createElement('p');
    let humidityEl = document.createElement('p');
    let windSpeedEl = document.createElement('p');
    let nameEl = document.createElement('h3');
    let imgEl = document.createElement('img');


    nameEl.textContent = `${res.name}`;
    tempEl.textContent = `Temp: ${res.main.temp} °F`;
    humidityEl.textContent = `Humidity: ${res.main.humidity}%`;
    windSpeedEl.textContent = `Wind Speed: ${res.wind.speed} mph`;


    
    imgEl.src = `https://openweathermap.org/img/w/${res.weather[0].icon}.png`
    
    nameEl.append(imgEl);
    cardArea.append(nameEl, tempEl, humidityEl, windSpeedEl);
}


async function searchForecast(cityName) {
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=979a65fd5e03b76d473b58f3098b3af0&units=imperial`;
    let response = await fetch(forecastUrl);
    let res = await response.json();
    console.log(res);

    for ( i = 0; i < 5; i++) {
        let forecastArea = document.getElementById('forecast-area');
        let forecastCard = document.createElement('div');
        let tempEl = document.createElement('p');
        let humidityEl = document.createElement('p');
        let windSpeedEl = document.createElement('p');
        let nameEl = document.createElement('h3');
        let imgEl = document.createElement('img');
    
        nameEl.textContent = `${res.city.name}`;
        tempEl.textContent = `Temp: ${res.list[i].main.temp} °F`;
        humidityEl.textContent = `Humidity: ${res.list[i].main.humidity}%`;
        windSpeedEl.textContent = `Wind Speed: ${res.list[i].wind.speed} mph`;

        // imgEl.src = `https://openweathermap.org/img/w/${res.weather[0].icon}.png`

        // nameEl.append(imgEl);
    
        forecastCard.append(nameEl, tempEl, humidityEl, windSpeedEl);
        forecastArea.append(forecastCard);

    }

}







searchWeather('seattle')
searchForecast('seattle')

    

