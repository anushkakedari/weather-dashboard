const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const feelsLike = document.getElementById('feels-like');
const status = document.getElementById('status');
const icon = document.getElementById('weather-icon');
const hourlySlider = document.getElementById('hourly-slider');

export function renderLoading() {
   
  const cityEl = document.getElementById('city-name');
  const tempEl = document.getElementById('temperature');
  const conditionEl = document.getElementById('condition');

  cityEl.textContent = '';
  tempEl.textContent = 'Loading...';
  conditionEl.textContent = '';

//   status.textContent = 'Loading...';
}

export function renderError(message) {
  status.textContent = message;
}

export function renderWeather(data, unit) {
  // ✅ DOM ELEMENTS (MUST BE DEFINED)
  const cityEl = document.getElementById('city-name');
  const tempEl = document.getElementById('temperature');
  const feelsEl = document.getElementById('feels-like');
  const conditionEl = document.getElementById('condition');
  const iconEl = document.getElementById('weather-icon');
  const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');

if (humidityEl) humidityEl.textContent = `${data.humidity}%`;
if (windEl) windEl.textContent = `${data.wind} km/h`;
  // Safety check (professional habit)
  if (!cityEl || !tempEl) return;

  // Convert temp based on unit
  const displayTemp =
    unit === 'C' ? data.temp : cToF(data.temp);
  const displayFeels =
    unit === 'C' ? data.feelsLike : cToF(data.feelsLike);

  // Render UI
  cityEl.textContent = data.city;
  tempEl.textContent = `${displayTemp}°${unit}`;
  feelsEl.textContent = `Feels like ${displayFeels}°${unit}`;
  conditionEl.textContent = data.condition;
  iconEl.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
//   console.log('Rendering hero weather:', data);
    updateBackground(data.conditionMain, data.icon);
}

// export function renderWeather(data, unit) {
//   status.textContent = '';

//   cityName.textContent = data.city;
//   temperature.textContent = `${data.temp}°`;
//   condition.textContent = data.condition;
//   humidity.textContent = `${data.humidity}%`;
//   wind.textContent = `${data.wind} m/s`;
//   feelsLike.textContent = `${data.feelsLike}°`;

//   icon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
//   updateBackground(data.conditionMain, data.icon);
//   const displayTemp =
//   unit === 'C' ? data.temp : cToF(data.temp);

// tempElement.textContent = `${displayTemp}°${unit}`;


// }
function updateBackground(condition, icon) {
  document.body.className = ''; // reset all

  const isNight = icon.includes('n');

  if (condition === 'Clear') {
    document.body.classList.add(isNight ? 'clear-night' : 'clear-day');
  } else if (condition === 'Clouds') {
    document.body.classList.add('clouds');
  } else if (condition === 'Rain' || condition === 'Drizzle') {
    document.body.classList.add('rain');
  } else if (condition === 'Snow') {
    document.body.classList.add('snow');
  } else if (condition === 'Thunderstorm') {
    document.body.classList.add('thunderstorm');
  } else {
    document.body.classList.add('mist');
  }
}
export function renderHourly(hourlyData, unit) {
  hourlySlider.innerHTML = '';

  hourlyData.forEach(hour => {
    const card = document.createElement('div');
    card.className = 'hour-card';

    card.innerHTML = `
      <p class="hour">${hour.time}</p>
      <img src="https://openweathermap.org/img/wn/${hour.icon}@2x.png" />
      <p class="hour-temp">${hour.temp}°</p>
    `;

    hourlySlider.appendChild(card);
  });
}
function cToF(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}


// export function renderWeather(data) {
//   status.textContent = '';

//   cityName.textContent = data.city;
//   temperature.textContent = `🌡️ ${data.temp}°C`;
//   condition.textContent = `☁️ ${data.condition}`;
//   humidity.textContent = `💧 Humidity: ${data.humidity}%`;
//   wind.textContent = `🌬️ Wind: ${data.wind} m/s`;

//   card.classList.remove('hidden');
// }
