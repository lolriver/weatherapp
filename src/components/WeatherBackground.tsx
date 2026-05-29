import { ReactNode } from 'react';
import { getBackgroundConfig, isNightTime, getWeatherAnimation } from '../utils/backgroundUtils';

interface WeatherBackgroundProps {
  weatherCondition?: string;
  timezone?: number;
  children: ReactNode;
}

export const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ 
  weatherCondition = 'clear', 
  timezone,
  children 
}) => {
  const isNight = isNightTime(timezone);
  const backgroundConfig = getBackgroundConfig(weatherCondition, isNight);
  const animationClass = getWeatherAnimation(weatherCondition);

  // Dynamic background images based on weather condition
  const getBackgroundImage = () => {
    const condition = weatherCondition.toLowerCase();
    
    if (isNight) {
      switch (condition) {
        case 'clear':
          return 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';
        case 'clouds':
          return 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';
        case 'rain':
          return 'https://images.pexels.com/photos/1463530/pexels-photo-1463530.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';
        case 'snow':
          return 'https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';
        default:
          return 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';
      }
    } else {
      switch (condition) {
        case 'clear':
          return 'https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';
        case 'clouds':
          return 'https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';
        case 'rain':
          return 'https://images.pexels.com/photos/1529360/pexels-photo-1529360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';
        case 'snow':
          return 'https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';
        case 'thunderstorm':
          return 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';
        default:
          return 'https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';
      }
    }
  };

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br ${backgroundConfig.gradient} transition-all duration-1000 ${animationClass} relative overflow-hidden`}
      style={{ textShadow: backgroundConfig.textShadow }}
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url(${getBackgroundImage()})`,
          filter: 'brightness(0.3) contrast(1.1)',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${backgroundConfig.gradient} opacity-80`} />
      
      {/* Additional Weather-specific Overlay */}
      {backgroundConfig.overlay && (
        <div className={`absolute inset-0 ${backgroundConfig.overlay} pointer-events-none`} />
      )}
      
      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Orbs */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Weather-specific Effects */}
        {weatherCondition.toLowerCase() === 'rain' && (
          <>
            {[...Array(100)].map((_, i) => (
              <div
                key={`rain-${i}`}
                className="absolute w-0.5 h-12 bg-blue-200/20 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${0.5 + Math.random() * 0.5}s`,
                  transform: `rotate(${10 + Math.random() * 10}deg)`
                }}
              />
            ))}
          </>
        )}
        
        {weatherCondition.toLowerCase() === 'snow' && (
          <>
            {[...Array(50)].map((_, i) => (
              <div
                key={`snow-${i}`}
                className="absolute w-2 h-2 bg-white/60 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </>
        )}
        
        {weatherCondition.toLowerCase() === 'thunderstorm' && (
          <>
            {[...Array(3)].map((_, i) => (
              <div
                key={`lightning-${i}`}
                className="absolute inset-0 bg-yellow-400/10 animate-pulse"
                style={{
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: '0.1s'
                }}
              />
            ))}
          </>
        )}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};