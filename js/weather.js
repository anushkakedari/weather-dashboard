const API_KEY = '640ac4e5000184bc27d63b4e08652854';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function getWeather(city) {
  const res = await fetch(
    `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error('City not found');
  }

  const data = await res.json();
 return {
  city: data.name,
  temp: Math.round(data.main.temp),
  feelsLike: Math.round(data.main.feels_like),
  condition: data.weather[0].description,
  conditionMain: data.weather[0].main, // 👈 ADD THIS
  icon: data.weather[0].icon,
  humidity: data.main.humidity,
  wind: data.wind.speed
};
}
export async function getHourlyForecast(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error('Hourly forecast not available');
  }

  const data = await res.json();

  // Take next 8 intervals ≈ 24 hours
  return data.list.slice(0, 8).map(item => ({
    time: item.dt_txt.split(' ')[1].slice(0, 5), // HH:MM
    temp: Math.round(item.main.temp),
    icon: item.weather[0].icon
  }));
}

export async function getWeatherByCoords(lat, lon) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error('Location weather not available');
  }

  const data = await res.json();

  return {
    city: data.name,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    condition: data.weather[0].description,
    conditionMain: data.weather[0].main,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    wind: data.wind.speed
  };
}





//   return {
//     city: data.name,
//     temp: data.main.temp,
//     condition: data.weather[0].description,
//     humidity: data.main.humidity,
//     wind: data.wind.speed
//   };

