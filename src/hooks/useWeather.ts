import { useState, useEffect } from 'react';
import { WeatherData, Coordinates } from '../types/weather';
import { WeatherService } from '../services/weatherService';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherByCoords = async (coords: Coordinates) => {
    try {
      setLoading(true);
      setError(null);
      const data = await WeatherService.getCurrentWeather(coords);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async (location: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await WeatherService.searchLocation(location);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Got user location:', {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          };
          fetchWeatherByCoords(coords);
        },
        (error) => {
          console.error('Geolocation error:', error);
          let errorMessage = 'Unable to get your location. ';

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Location permission denied. Please enable location access in your browser settings.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage += 'Location request timed out.';
              break;
            default:
              errorMessage += 'An unknown error occurred.';
          }

          setError(errorMessage);
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return {
    weatherData,
    loading,
    error,
    fetchWeatherByLocation,
    getCurrentLocation
  };
};