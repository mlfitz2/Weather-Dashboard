



async function searchWeather(cityName) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`
    let response = await fetch(apiUrl);
    let res = await response.json();
    console.log(res);

    let cardArea = document.getElementById('test-text');
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

searchWeather('seattle')