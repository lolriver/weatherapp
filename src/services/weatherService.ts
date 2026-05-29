import { WeatherData, Coordinates } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export class WeatherService {
  static async getCurrentWeather(coords: Coordinates): Promise<WeatherData> {
    if (!API_KEY) {
      throw new Error('OpenWeatherMap API key is missing. Please set VITE_OPEN_WEATHER_API_KEY in your .env file.');
    }

    try {
      const [currentResponse, forecastResponse, geoResponse] = await Promise.all([
        fetch(`${BASE_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`),
        fetch(`${BASE_URL}/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`),
        fetch(`${GEO_URL}/reverse?lat=${coords.lat}&lon=${coords.lon}&limit=1&appid=${API_KEY}`)
      ]);

      if (!currentResponse.ok) {
        const errorData = await currentResponse.json();
        if (errorData.message === 'city not found') {
          throw new Error('City not found. Please check your spelling or try another location.');
        }
        throw new Error(`Weather API error: ${errorData.message || 'Failed to fetch current weather'}`);
      }

      if (!forecastResponse.ok) {
        const errorData = await forecastResponse.json();
        if (errorData.message === 'city not found') {
          throw new Error('City not found. Please check your spelling or try another location.');
        }
        throw new Error(`Forecast API error: ${errorData.message || 'Failed to fetch forecast'}`);
      }

      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();

      let locationName = currentData.name;
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        if (geoData && geoData.length > 0) {
          locationName = geoData[0].name || currentData.name;
        }
      }

      return this.formatWeatherData(currentData, forecastData, coords, locationName);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error instanceof Error ? error : new Error('Failed to fetch weather data');
    }
  }

  static async searchLocation(query: string): Promise<WeatherData> {
    if (!API_KEY) {
      throw new Error('OpenWeatherMap API key is missing. Please set VITE_OPEN_WEATHER_API_KEY in your .env file.');
    }

    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(`${BASE_URL}/weather?q=${query}&appid=${API_KEY}&units=metric`),
        fetch(`${BASE_URL}/forecast?q=${query}&appid=${API_KEY}&units=metric`)
      ]);

      if (!currentResponse.ok) {
        const errorData = await currentResponse.json();
        if (errorData.message === 'city not found') {
          throw new Error('City not found. Please check your spelling or try another location.');
        }
        throw new Error(`Weather API error: ${errorData.message || 'Failed to fetch current weather'}`);
      }

      if (!forecastResponse.ok) {
        const errorData = await forecastResponse.json();
        if (errorData.message === 'city not found') {
          throw new Error('City not found. Please check your spelling or try another location.');
        }
        throw new Error(`Forecast API error: ${errorData.message || 'Failed to fetch forecast'}`);
      }

      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();

      return this.formatWeatherData(currentData, forecastData);
    } catch (error) {
      console.error('Error searching location:', error);
      throw new Error('Failed to search location');
    }
  }

  private static getMockWeatherData(): WeatherData {
    return {
      location: {
        name: 'New York',
        country: 'US',
        lat: 40.7128,
        lon: -74.0060
      },
      current: {
        temp: 22,
        feels_like: 25,
        humidity: 65,
        wind_speed: 3.5,
        weather: {
          main: 'Clear',
          description: 'Clear sky',
          icon: '01d'
        }
      },
      forecast: [
        {
          date: new Date().toISOString(),
          temp_max: 25,
          temp_min: 18,
          weather: { main: 'Clear', description: 'Clear sky', icon: '01d' }
        },
        {
          date: new Date(Date.now() + 86400000).toISOString(),
          temp_max: 23,
          temp_min: 16,
          weather: { main: 'Clouds', description: 'Few clouds', icon: '02d' }
        },
        {
          date: new Date(Date.now() + 172800000).toISOString(),
          temp_max: 28,
          temp_min: 20,
          weather: { main: 'Clear', description: 'Clear sky', icon: '01d' }
        },
        {
          date: new Date(Date.now() + 259200000).toISOString(),
          temp_max: 26,
          temp_min: 19,
          weather: { main: 'Rain', description: 'Light rain', icon: '10d' }
        },
        {
          date: new Date(Date.now() + 345600000).toISOString(),
          temp_max: 24,
          temp_min: 17,
          weather: { main: 'Clouds', description: 'Scattered clouds', icon: '03d' }
        }
      ]
    };
  }

  private static formatWeatherData(currentData: any, forecastData: any, requestedCoords?: Coordinates, locationName?: string): WeatherData {
    const coords = requestedCoords || {
      lat: currentData.coord.lat,
      lon: currentData.coord.lon
    };

    return {
      location: {
        name: locationName || currentData.name,
        country: currentData.sys.country,
        lat: coords.lat,
        lon: coords.lon,
        timezone: currentData.timezone
      },
      current: {
        temp: Math.round(currentData.main.temp),
        feels_like: Math.round(currentData.main.feels_like),
        humidity: currentData.main.humidity,
        wind_speed: currentData.wind.speed,
        weather: {
          main: currentData.weather[0].main,
          description: currentData.weather[0].description,
          icon: currentData.weather[0].icon
        }
      },
      forecast: forecastData.list.slice(0, 5).map((item: any) => ({
        date: item.dt_txt,
        temp_max: Math.round(item.main.temp_max),
        temp_min: Math.round(item.main.temp_min),
        weather: {
          main: item.weather[0].main,
          description: item.weather[0].description,
          icon: item.weather[0].icon
        }
      }))
    };
  }
}