export interface BackgroundConfig {
  gradient: string;
  overlay?: string;
  textShadow?: string;
}

export const getBackgroundConfig = (
  weatherCondition: string,
  isNight: boolean = false
): BackgroundConfig => {
  const condition = weatherCondition.toLowerCase();
  
  // Night mode backgrounds
  if (isNight) {
    switch (condition) {
      case 'clear':
        return {
          gradient: 'from-indigo-900 via-purple-900 to-black',
          textShadow: '0 2px 4px rgba(0,0,0,0.8)'
        };
      case 'clouds':
        return {
          gradient: 'from-gray-800 via-gray-900 to-black',
          textShadow: '0 2px 4px rgba(0,0,0,0.8)'
        };
      case 'rain':
        return {
          gradient: 'from-slate-800 via-blue-900 to-black',
          overlay: 'bg-black/20',
          textShadow: '0 2px 4px rgba(0,0,0,0.8)'
        };
      case 'snow':
        return {
          gradient: 'from-blue-900 via-slate-800 to-black',
          textShadow: '0 2px 4px rgba(0,0,0,0.8)'
        };
      case 'thunderstorm':
        return {
          gradient: 'from-gray-900 via-purple-900 to-black',
          overlay: 'bg-purple-900/30',
          textShadow: '0 2px 4px rgba(0,0,0,0.9)'
        };
      default:
        return {
          gradient: 'from-blue-900 via-indigo-900 to-black',
          textShadow: '0 2px 4px rgba(0,0,0,0.8)'
        };
    }
  }
  
  // Day mode backgrounds
  switch (condition) {
    case 'clear':
      return {
        gradient: 'from-yellow-400 via-orange-500 to-red-500',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
      };
    case 'clouds':
      return {
        gradient: 'from-gray-400 via-gray-500 to-gray-600',
        textShadow: '0 2px 4px rgba(0,0,0,0.4)'
      };
    case 'rain':
      return {
        gradient: 'from-gray-600 via-blue-700 to-blue-800',
        overlay: 'bg-blue-900/20',
        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
      };
    case 'snow':
      return {
        gradient: 'from-blue-200 via-blue-300 to-blue-400',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
      };
    case 'thunderstorm':
      return {
        gradient: 'from-gray-800 via-gray-700 to-black',
        overlay: 'bg-yellow-400/10',
        textShadow: '0 2px 4px rgba(0,0,0,0.7)'
      };
    case 'mist':
    case 'fog':
      return {
        gradient: 'from-gray-300 via-gray-400 to-gray-500',
        overlay: 'bg-white/10',
        textShadow: '0 2px 4px rgba(0,0,0,0.4)'
      };
    default:
      return {
        gradient: 'from-blue-400 via-blue-500 to-blue-600',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
      };
  }
};

export const isNightTime = (timezone?: number): boolean => {
  if (timezone !== undefined) {
    // Convert timezone offset from seconds to milliseconds and calculate city time
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const cityTime = new Date(utc + (timezone * 1000));
    const hour = cityTime.getHours();
    return hour < 6 || hour >= 18;
  }
  
  // Fallback to local time if no timezone provided
  const hour = new Date().getHours();
  return hour < 6 || hour >= 18; // Night between 6 PM and 6 AM
};

export const getWeatherAnimation = (condition: string): string => {
  switch (condition.toLowerCase()) {
    case 'rain':
      return 'animate-pulse';
    case 'snow':
      return 'animate-bounce';
    case 'thunderstorm':
      return 'animate-pulse';
    default:
      return '';
  }
};