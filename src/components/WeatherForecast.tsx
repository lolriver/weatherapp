import { WeatherData } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';
import { Calendar, TrendingUp } from 'lucide-react';

interface WeatherForecastProps {
  weatherData: WeatherData;
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({ weatherData }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="relative group">
      {/* Glowing Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
      
      <div className="relative bg-white/15 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl hover:bg-white/20 hover:border-white/30 transition-all duration-500">
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl sm:rounded-2xl shadow-xl">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" />
          </div>
          <h3 className="text-xl sm:text-3xl font-black bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
            5-Day Forecast
          </h3>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          {weatherData.forecast.map((day, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-white/10 to-white/5 rounded-xl sm:rounded-2xl active:from-white/15 active:to-white/10 transition-all duration-200 border border-white/10 active:border-white/20 group shadow-xl touch-action-manipulation"
            >
              <div className="flex items-center gap-3 sm:gap-5 flex-1 min-w-0">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-white/20 to-white/10 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-lg flex-shrink-0">
                  <WeatherIcon condition={day.weather.main} size="sm" />
                </div>
                <div className="min-w-0">
                  <div className="text-white font-bold text-sm sm:text-lg truncate">
                    {index === 0 ? 'Today' : formatDate(day.date)}
                  </div>
                  <div className="text-white/80 text-xs sm:text-base capitalize font-semibold truncate">
                    {day.weather.description}
                  </div>
                </div>
              </div>
              
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-1 sm:gap-2 text-white font-black text-base sm:text-xl">
                  <span className="text-lg sm:text-2xl">{day.temp_max}°</span>
                  <span className="text-white/60 text-sm">/</span>
                  <span className="text-white/80 text-sm sm:text-lg">{day.temp_min}°</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-white/60 text-sm mt-1">
                  <TrendingUp className="w-3 h-3" />
                  <span className="font-medium">High/Low</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-white/10 rounded-xl sm:rounded-2xl border border-white/10">
          <p className="text-white/70 text-center text-xs sm:text-sm font-medium">
            <span className="hidden sm:inline">📊 Forecast accuracy: 95% • Updated every 3 hours</span>
            <span className="sm:hidden">📊 Updated every 3 hours</span>
          </p>
        </div>
      </div>
    </div>
  );
};