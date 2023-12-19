function fetchWeatherData(city) {
    const apiKey = '393ac1325a23fcb533eb1f9082b17771';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}


function renderWeatherData(data) {

    const cityName = data.city.name;
    const currentDate = data.list[0].dt_txt;
    const currentTemp = data.list[0].main.temp;
    const currentHumidity = data.list[0].main.humidity;
    const currentWindSpeed = data.list[0].wind.speed;
    const currentWeatherIcon = data.list[0].weather[0].icon;

    $('#today').html(`
      <h2>${cityName} (${currentDate}) <img src="https://openweathermap.org/img/wn/${currentWeatherIcon}.png" alt="Weather Icon"></h2>
      <p>Temp: ${currentTemp} &#8451;</p>
      <p>Wind: ${currentWindSpeed} m/s</p>
      <p>Humidity: ${currentHumidity}%</p>
    `);

    const forecastSection = $('#forecast');
    const todaySection = $('#today');

    forecastSection.empty();
    todaySection.append(`
     <h3>5-Day Forecast:</h3>
   `);

    for (let i = 1; i < data.list.length; i++) {
        const forecastDate = data.list[i].dt_txt;
        const forecastTemp = data.list[i].main.temp;
        const forecastHumidity = data.list[i].main.humidity;
        const forecastWindSpeed = data.list[i].wind.speed;
        const forecastWeatherIcon = data.list[i].weather[0].icon;

        forecastSection.append(`
      <div class="col-md-2">
        <h5>${forecastDate}</h5>
        <img src="https://openweathermap.org/img/wn/${forecastWeatherIcon}.png" alt="Weather Icon">
        <p>Temp: ${forecastTemp} &#8451;</p>
        <p>Wind: ${forecastWindSpeed} km/h</p>
        <p>Humidity: ${forecastHumidity}%</p>
      </div>
    `);
    }
}

function addToLocalStorage(city) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistory.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}


function loadSearchHistory() {
    const historyContainer = $('#history');
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  
    historyContainer.html(searchHistory.map(city => `<li class="list-group-item">${city}</li>`).join(''));
  }
  
  function handleSearchHistoryClick(event) {
    const city = $(event.target).text();
    fetchWeatherData(city).then(function(data) {
      if (data) {
        renderWeatherData(data);
      }
    });
  }
  
  $('#search-form').submit(function(event) {
    event.preventDefault();
    const city = $('#search-input').val().trim();
  
    fetchWeatherData(city).then(function(data) {
      if (data) {
        renderWeatherData(data);

        addToLocalStorage(city);
  
        loadSearchHistory();
      }
    });
  });
  
  $('#history').on('click', 'li', handleSearchHistoryClick);
  
  $(document).ready(loadSearchHistory);