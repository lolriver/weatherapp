import { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { WeatherForecast } from './components/WeatherForecast';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { WeatherBackground } from './components/WeatherBackground';
import { About } from './components/About';
import { Navigation } from './components/Navigation';

function App() {
  const { weatherData, loading, error, fetchWeatherByLocation, getCurrentLocation } = useWeather();
  const [currentView, setCurrentView] = useState<'weather' | 'about'>('weather');

  if (loading) {
    return (
      <WeatherBackground>
        <LoadingSpinner />
      </WeatherBackground>
    );
  }

  if (error && !weatherData && currentView === 'weather') {
    return (
      <WeatherBackground>
        <Navigation currentView={currentView} onViewChange={setCurrentView} />
        <ErrorMessage message={error} onRetry={getCurrentLocation} />
      </WeatherBackground>
    );
  }

  return (
    <WeatherBackground 
      weatherCondition={weatherData?.current.weather.main}
      timezone={weatherData?.location.timezone}
    >
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      
      {currentView === 'weather' ? (
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 pt-24 sm:pt-28">
          <div className="text-center mb-8 sm:mb-12">
            <div className="relative inline-block mb-4 sm:mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <h1 className="relative text-4xl sm:text-6xl md:text-7xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-2 sm:mb-4 tracking-tight">
                WeatherPro
              </h1>
            </div>
            <p className="text-white/90 text-base sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed px-4">
              Experience real-time weather updates with stunning visuals and comprehensive forecasts for any location worldwide
            </p>
            <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>

          <SearchBar
            onSearch={fetchWeatherByLocation}
            onCurrentLocation={getCurrentLocation}
            loading={loading}
          />

          {weatherData && (
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
                <div className="lg:col-span-2">
                  <CurrentWeather weatherData={weatherData} />
                </div>
                <div className="lg:col-span-1">
                  <WeatherForecast weatherData={weatherData} />
                </div>
              </div>
            </div>
          )}

          {error && weatherData && (
            <div className="max-w-md mx-auto mt-8 p-6 bg-red-500/15 backdrop-blur-xl rounded-3xl border border-red-300/20 shadow-2xl">
              <p className="text-red-100 text-center font-medium">{error}</p>
            </div>
          )}

          <div className="text-center mt-12 sm:mt-20 mb-6">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-xl rounded-full px-4 sm:px-8 py-3 sm:py-4 border border-white/20 shadow-xl">
              <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-white/80 text-xs sm:text-sm font-semibold">
                <span className="hidden sm:inline">Powered by OpenWeatherMap API • Real-time Data • Global Coverage</span>
                <span className="sm:hidden">Real-time Weather Data</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <About />
      )}
    </WeatherBackground>
  );
}

export default App;