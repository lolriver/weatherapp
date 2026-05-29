export interface WeatherData {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
    timezone: number;
  };
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: {
      main: string;
      description: string;
      icon: string;
    };
  };
  forecast: ForecastDay[];
}

export interface ForecastDay {
  date: string;
  temp_max: number;
  temp_min: number;
  weather: {
    main: string;
    description: string;
    icon: string;
  };
}

export interface Coordinates {
  lat: number;
  lon: number;
}