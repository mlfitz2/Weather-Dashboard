
//Displays current weather conditions
async function searchWeather(cityName) {

    //Current weather
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`
    let response = await fetch(apiUrl);
    let res = await response.json();

    //Builds elements for data
    let cardArea = document.getElementById('current-weather-area');
    let tempEl = document.createElement('p');
    let humidityEl = document.createElement('p');
    let windSpeedEl = document.createElement('p');
    let nameEl = document.createElement('h3');
    let imgEl = document.createElement('img');

    //Fills in data from API
    nameEl.textContent = `${res.name}`;
    tempEl.textContent = `Temp: ${res.main.temp} °F`;
    humidityEl.textContent = `Humidity: ${res.main.humidity}%`;
    windSpeedEl.textContent = `Wind Speed: ${res.wind.speed} mph`;
    imgEl.src = `https://openweathermap.org/img/w/${res.weather[0].icon}.png`
    
    //Displays data
    nameEl.append(imgEl);
    cardArea.append(nameEl, tempEl, humidityEl, windSpeedEl);
}

//5-day forecast
async function searchForecast(cityName) {
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=979a65fd5e03b76d473b58f3098b3af0&units=imperial`;
    let response = await fetch(forecastUrl);
    let res = await response.json();

    //FCreate elements for forecast data

    for ( i = 0; i < 40; i+=8) { //forecast every 3 hours, so get every 8 forecasts to be once a day
        let forecastArea = document.getElementById('forecast-area');
        let forecastCard = document.createElement('div');
        forecastCard.setAttribute('class', 'forecast-card');
        let tempEl = document.createElement('p');
        let humidityEl = document.createElement('p');
        let windSpeedEl = document.createElement('p');
        let nameEl = document.createElement('h3');
        let imgEl = document.createElement('img');
    
        //Add data from API
        nameEl.textContent = `${res.city.name}`;
        tempEl.textContent = `Temp: ${res.list[i].main.temp} °F`;
        humidityEl.textContent = `Humidity: ${res.list[i].main.humidity}%`;
        windSpeedEl.textContent = `Wind Speed: ${res.list[i].wind.speed} mph`;
        imgEl.src = `https://openweathermap.org/img/w/${res.list[i].weather[0].icon}.png`

        //Display data
        nameEl.append(imgEl);
        forecastCard.append(nameEl, tempEl, humidityEl, windSpeedEl);
        forecastArea.append(forecastCard);
    }
}

//Save the cities that have been searched
function saveCity() {
    let savedCities = document.getElementById('city-input').value;
    let oldList = JSON.parse(localStorage.getItem('savedCities'));
    if (oldList == null) {
        oldList = [];
    }
    oldList.push(savedCities);
    localStorage.setItem('savedCities', JSON.stringify(oldList))
}

//Display cities that have been searched
function getCityList() {
    let savedList = JSON.parse(localStorage.getItem('savedCities'));
    if (savedList == null) {
        savedList = [];
    }
    savedList.forEach(element => {
        let newCity = document.createElement('li');
        newCity.textContent = element.toUpperCase();
        newCity.setAttribute('class', 'saved-city');
        
        let citiesList = document.getElementById('saved-cities-area');
        citiesList.append(newCity);
        
        //User can click on saved city to get updated
        newCity.addEventListener('click', function(){
            let savedCity = this.textContent;
            console.log(savedCity);
            searchWeather(savedCity);
            searchForecast(savedCity);
        })
    })
}




window.addEventListener('load', getCityList())

document.getElementById('search-button').addEventListener('click', function(event) {
    event.preventDefault();
    let myCity = document.getElementById('city-input');
    searchWeather(myCity.value);
    searchForecast(myCity.value);
    saveCity(myCity.value);
})



    

