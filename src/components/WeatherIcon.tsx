import { Cloud, Sun, CloudRain, CloudSnow, Wind, Eye } from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  condition, 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-16 h-16'
  };

  const getIcon = () => {
    const baseClasses = `${sizeClasses[size]} ${className}`;
    
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className={`${baseClasses} text-yellow-500`} />;
      case 'clouds':
        return <Cloud className={`${baseClasses} text-gray-500`} />;
      case 'rain':
        return <CloudRain className={`${baseClasses} text-blue-500`} />;
      case 'snow':
        return <CloudSnow className={`${baseClasses} text-blue-200`} />;
      case 'wind':
        return <Wind className={`${baseClasses} text-gray-600`} />;
      case 'mist':
      case 'fog':
        return <Eye className={`${baseClasses} text-gray-400`} />;
      default:
        return <Sun className={`${baseClasses} text-yellow-500`} />;
    }
  };

  return getIcon();
};