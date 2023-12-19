function fetchWeatherData(city) {
    const apiKey = '393ac1325a23fcb533eb1f9082b17771'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
}


function renderWeatherData(data) {

    const cityName = data.city.name;
    const currentDate = (data.list[0].dt_txt);
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

    todaySection.append(`
      <h3>5-Day Forecast:<h3>
    `);

}

const forecastDate =(data.list[i].dt_txt);
const forecastTemp = data.list[i].main.temp;
const forecastHumidity = data.list[i].main.humidity;
const forecastWind = data.list[0].wind.speed;
const forecastWeatherIcon = data.list[i].weather[0].icon;