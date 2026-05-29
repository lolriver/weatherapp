import { WeatherData } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';
import { Droplets, Wind, Thermometer, MapPin, Clock } from 'lucide-react';

interface CurrentWeatherProps {
  weatherData: WeatherData;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weatherData }) => {
  const { location, current } = weatherData;

  const formatTime = () => {
    // Calculate city time using timezone offset
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const cityTime = new Date(utc + (location.timezone * 1000));
    
    return cityTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = () => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const cityTime = new Date(utc + (location.timezone * 1000));
    
    return cityTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isNight = () => {
    // Calculate city time using timezone offset
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const cityTime = new Date(utc + (location.timezone * 1000));
    const hour = cityTime.getHours();
    return hour < 6 || hour >= 18;
  };

  return (
    <div className="relative group">
      {/* Glowing Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
      
      <div className="relative bg-white/15 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl mb-6 sm:mb-8 hover:bg-white/20 hover:border-white/30 transition-all duration-500">
        {/* Location Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl sm:rounded-2xl shadow-xl">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              {location.name}, {location.country}
            </h2>
          </div>
          
          <p className="text-white/90 capitalize mb-3 sm:mb-4 text-lg sm:text-2xl font-bold tracking-wide">
            {current.weather.description}
          </p>

          <div className="flex items-center justify-center gap-3 sm:gap-6 text-white/80 text-sm sm:text-base bg-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 w-fit mx-auto shadow-xl flex-wrap">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold">{formatTime()}</span>
            </div>
            <div className="w-1 h-1 bg-white/50 rounded-full hidden sm:block"></div>
            <span className="flex items-center gap-2 font-semibold">
              {isNight() ? '🌙' : '☀️'} 
              {formatDate()}
            </span>
          </div>
        </div>

        {/* Main Temperature Display */}
        <div className="flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-10 bg-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl gap-4 sm:gap-0">
          <div className="sm:mr-8 p-4 sm:p-6 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl sm:rounded-3xl shadow-2xl">
            <WeatherIcon condition={current.weather.main} size="lg" />
          </div>
          <div className="text-center">
            <div className="text-6xl sm:text-8xl md:text-9xl font-black bg-gradient-to-b from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-2 sm:mb-4 leading-none">
              {current.temp}°
            </div>
            <div className="text-white/90 text-lg sm:text-2xl font-bold">
              Feels like {current.feels_like}°C
            </div>
          </div>
        </div>

        {/* Weather Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6">
          <div className="text-center p-3 sm:p-6 bg-gradient-to-br from-white/15 to-white/5 rounded-xl sm:rounded-3xl active:from-white/20 active:to-white/10 transition-all duration-200 border border-white/10 active:border-white/20 shadow-xl touch-action-manipulation">
            <div className="p-2 sm:p-4 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-xl sm:rounded-2xl w-fit mx-auto mb-2 sm:mb-4 transition-all duration-300 shadow-xl">
              <Droplets className="w-5 h-5 sm:w-7 sm:h-7 text-blue-300" />
            </div>
            <div className="text-white font-black text-lg sm:text-2xl mb-1 sm:mb-2">{current.humidity}%</div>
            <div className="text-white/80 font-semibold text-xs sm:text-base">Humidity</div>
          </div>
          
          <div className="text-center p-3 sm:p-6 bg-gradient-to-br from-white/15 to-white/5 rounded-xl sm:rounded-3xl active:from-white/20 active:to-white/10 transition-all duration-200 border border-white/10 active:border-white/20 shadow-xl touch-action-manipulation">
            <div className="p-2 sm:p-4 bg-gradient-to-br from-gray-500/30 to-slate-500/30 rounded-xl sm:rounded-2xl w-fit mx-auto mb-2 sm:mb-4 transition-all duration-300 shadow-xl">
              <Wind className="w-5 h-5 sm:w-7 sm:h-7 text-gray-300" />
            </div>
            <div className="text-white font-black text-lg sm:text-2xl mb-1 sm:mb-2">{current.wind_speed} m/s</div>
            <div className="text-white/80 font-semibold text-xs sm:text-base">Wind Speed</div>
          </div>
          
          <div className="text-center p-3 sm:p-6 bg-gradient-to-br from-white/15 to-white/5 rounded-xl sm:rounded-3xl active:from-white/20 active:to-white/10 transition-all duration-200 border border-white/10 active:border-white/20 shadow-xl touch-action-manipulation">
            <div className="p-2 sm:p-4 bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-xl sm:rounded-2xl w-fit mx-auto mb-2 sm:mb-4 transition-all duration-300 shadow-xl">
              <Thermometer className="w-5 h-5 sm:w-7 sm:h-7 text-red-300" />
            </div>
            <div className="text-white font-black text-lg sm:text-2xl mb-1 sm:mb-2">{current.feels_like}°</div>
            <div className="text-white/80 font-semibold text-xs sm:text-base">Feels Like</div>
          </div>
        </div>
      </div>
    </div>
  );
};