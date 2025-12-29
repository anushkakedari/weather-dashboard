import { getWeather, getHourlyForecast, getWeatherByCoords } from './weather.js';
import { renderWeather, renderError, renderLoading, renderHourly } from './ui.js';
let lastWeatherData = null;
let lastHourlyData = null;
let currentUnit = 'C';
function loadUserLocationWeather() {
  if (!navigator.geolocation) {
    console.log('Geolocation not supported');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async position => {
      const { latitude, longitude } = position.coords;

      renderLoading();

      try {
        const weather = await getWeatherByCoords(latitude, longitude);

        // Hourly forecast needs city name
        const hourly = await getHourlyForecast(weather.city);

        lastWeatherData = weather;
        lastHourlyData = hourly;
        localStorage.setItem(
            'cachedWeather',
            JSON.stringify({
                weather,
                hourly
            })
            );


        renderWeather(weather, currentUnit);
        renderHourly(hourly, currentUnit);
      } catch (err) {
        console.log(err.message);
      }
    },
    error => {
      console.log('User denied location access');
    }
  );
}

function showOfflineUI() {
  document.getElementById('offline-msg').classList.remove('hidden');
  searchBtn.disabled = true;
}

function hideOfflineUI() {
  document.getElementById('offline-msg').classList.add('hidden');
  searchBtn.disabled = false;
}
window.addEventListener('offline', () => {
  showOfflineUI();

  const cached = localStorage.getItem('cachedWeather');
  if (!cached) return;

  const { weather, hourly } = JSON.parse(cached);
  renderWeather(weather, currentUnit);
  renderHourly(hourly, currentUnit);
});

window.addEventListener('online', () => {
  hideOfflineUI();
});

const input = document.getElementById('city-input');
const button = document.getElementById('search-btn');

button.addEventListener('click', async () => {
  const city = input.value.trim();
  if (!city) return;

  renderLoading();

  try {
    const weather = await getWeather(city);
    const hourly = await getHourlyForecast(city);
    lastWeatherData = weather;
    lastHourlyData = hourly;

    renderWeather(weather, currentUnit);
    renderHourly(hourly, currentUnit);
  } catch (err) {
    renderError(err.message);
  }
});
const unitBtn = document.getElementById('unit-btn');

unitBtn.addEventListener('click', () => {
  currentUnit = currentUnit === 'C' ? 'F' : 'C';
  unitBtn.textContent = currentUnit === 'C' ? '°F' : '°C';

  renderWeather(lastWeatherData, currentUnit);
  renderHourly(lastHourlyData, currentUnit);
});
if (!navigator.onLine) {
  showOfflineUI();

  const cached = localStorage.getItem('cachedWeather');
  if (cached) {
    const { weather, hourly } = JSON.parse(cached);
    renderWeather(weather, currentUnit);
    renderHourly(hourly, currentUnit);
  }
}

loadUserLocationWeather();




// button.addEventListener('click', async () => {
//   const city = input.value.trim();
//   if (!city) return;

//   renderLoading();

//   try {
//     const data = await getWeather(city);
//     renderWeather(data);
//   } catch (err) {
//     renderError(err.message);
//   }
// });


// import { getWeather } from './weather.js';
// import { renderWeather, renderError, renderLoading } from './ui.js';

// const form = document.getElementById('search-form');
// const input = document.getElementById('city-input');

// form.addEventListener('submit', async (e) => {
//   e.preventDefault();
  
//   const city = input.value.trim();
//   if (!city) return;

//   renderLoading();

//   try {
//     const data = await getWeather(city);
//     renderWeather(data);
//   } catch (error) {
//     renderError(error.message);
//   }
// });
