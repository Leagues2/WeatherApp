const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const WeatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', async () => {
  const city = document.querySelector('.search-box input').value;
  const APIKey = localStorage.getItem("API_KEY")
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

  if (city === '') {
    return;
  }

  try {
    const response = await fetch(url);

    const weatherData = await response.json();

    if (weatherData.cod === '404') {
      container.style.height = '600px';
      weatherBox.style.display = 'none';
      WeatherDetails.style.display = 'none';
      error404.style.display = 'block';
      error404.classList.add('fadeIn');
      return;
    }

    error404.style.display = 'none';
    error404.classList.remove('fadeIn');

    const image = document.querySelector('.weather-box img');
    const temprature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');
      switch (weatherData.weather[0].main) {
        case 'Clear':
          image.src = 'images/clear.png';
          break;
        case 'Rain':
          image.src = 'images/rain.png';
          break;
        case 'Snow':
          image.src = 'images/snow.png';
          break;
        case 'Clouds':
          image.src = 'images/clouds.png';
          break;
        case 'Haze':
          image.src = 'images/mist.png';
          break;
        default:
          image.src = '';
          break;
      }



      temprature.innerHTML = `${parseInt(weatherData.main.temp)}<span>°C</span>`;
      humidity.innerHTML = `${weatherData.main.humidity}%`;
      wind.innerHTML = `${parseInt(weatherData.wind.speed)}Km/h`;
      description.innerHTML = `${weatherData.weather[0].description}`;

    weatherBox.style.display = '';
    WeatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    WeatherDetails.classList.add('fadeIn');
    container.style.height = '690px';
  } catch (error) {
    console.error(error);
  }
});
