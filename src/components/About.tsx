import { 
  Cloud, 
  MapPin, 
  Thermometer, 
  Wind, 
  Droplets, 
  Eye, 
  Smartphone, 
  Globe, 
  Zap,
  Shield,
  Clock,
  Star,
  Download,
  Search
} from 'lucide-react';

export const About: React.FC = () => {
  const features = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Global Coverage",
      description: "Access weather data for any city worldwide with precise location-based forecasts"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-time Updates",
      description: "Get the most current weather conditions updated every few minutes"
    },
    {
      icon: <Thermometer className="w-6 h-6" />,
      title: "Detailed Metrics",
      description: "Temperature, humidity, wind speed, and feels-like temperature all in one place"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "5-Day Forecast",
      description: "Plan ahead with accurate weather predictions for the next five days"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Responsive Design",
      description: "Perfect experience across all devices - desktop, tablet, and mobile"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Optimized performance with instant search and smooth animations"
    }
  ];

  const instructions = [
    {
      step: "1",
      title: "Search Location",
      description: "Type any city name in the search bar to get instant weather data",
      icon: <Search className="w-5 h-5" />
    },
    {
      step: "2",
      title: "Use Current Location",
      description: "Click 'Use Current Location' to get weather for your exact position",
      icon: <MapPin className="w-5 h-5" />
    },
    {
      step: "3",
      title: "View Details",
      description: "Explore current conditions, detailed metrics, and 5-day forecast",
      icon: <Eye className="w-5 h-5" />
    },
    {
      step: "4",
      title: "Stay Updated",
      description: "Weather data refreshes automatically to keep you informed",
      icon: <Clock className="w-5 h-5" />
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 pt-20 sm:pt-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="relative inline-block mb-6 sm:mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl sm:blur-2xl opacity-40 animate-pulse"></div>
            <div className="relative p-4 sm:p-6 bg-white/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/30 shadow-2xl">
              <Cloud className="w-12 h-12 sm:w-16 sm:h-16 text-white mx-auto" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4 sm:mb-6">
            About WeatherPro
          </h1>
          <p className="text-base sm:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto px-4">
            WeatherPro is a cutting-edge weather application that delivers real-time meteorological data 
            with stunning visual design and professional-grade accuracy. Built for weather enthusiasts, 
            professionals, and everyday users who demand the best.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">
            Powerful Features
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-5 sm:p-6 bg-white/15 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-xl active:bg-white/25 active:border-white/30 transition-all duration-200 touch-action-manipulation"
              >
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl sm:rounded-2xl w-fit mb-3 sm:mb-4 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How to Use Section */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">
            How to Use WeatherPro
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {instructions.map((instruction, index) => (
              <div
                key={index}
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-white/15 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-xl active:bg-white/20 transition-all duration-200 touch-action-manipulation"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl text-white font-bold text-base sm:text-lg shadow-lg">
                    {instruction.step}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <div className="p-1 bg-white/20 rounded-lg flex-shrink-0">
                      {instruction.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">{instruction.title}</h3>
                  </div>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed">{instruction.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Details */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">
            Technical Excellence
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-8">
            <div className="p-6 sm:p-8 bg-white/15 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 bg-green-500/30 rounded-xl sm:rounded-2xl">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-300" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Data Source</h3>
              </div>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white/80">
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  OpenWeatherMap API integration
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Real-time weather data
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Global weather station network
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Professional meteorological accuracy
                </li>
              </ul>
            </div>

            <div className="p-6 sm:p-8 bg-white/15 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 bg-purple-500/30 rounded-xl sm:rounded-2xl">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Technology</h3>
              </div>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white/80">
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  React + TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Tailwind CSS styling
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Responsive design system
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Modern web standards
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Weather Data Explanation */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">
            Understanding Weather Data
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <div className="p-4 sm:p-6 bg-white/15 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-xl text-center">
              <div className="p-2 sm:p-3 bg-red-500/30 rounded-xl sm:rounded-2xl w-fit mx-auto mb-2 sm:mb-4">
                <Thermometer className="w-5 h-5 sm:w-6 sm:h-6 text-red-300" />
              </div>
              <h3 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2">Temperature</h3>
              <p className="text-white/80 text-xs sm:text-sm">Current air temperature and how it feels to your body</p>
            </div>
            <div className="p-4 sm:p-6 bg-white/15 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-xl text-center">
              <div className="p-2 sm:p-3 bg-blue-500/30 rounded-xl sm:rounded-2xl w-fit mx-auto mb-2 sm:mb-4">
                <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />
              </div>
              <h3 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2">Humidity</h3>
              <p className="text-white/80 text-xs sm:text-sm">Amount of water vapor in the air as a percentage</p>
            </div>
            <div className="p-4 sm:p-6 bg-white/15 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-xl text-center">
              <div className="p-2 sm:p-3 bg-gray-500/30 rounded-xl sm:rounded-2xl w-fit mx-auto mb-2 sm:mb-4">
                <Wind className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
              </div>
              <h3 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2">Wind Speed</h3>
              <p className="text-white/80 text-xs sm:text-sm">How fast air is moving, measured in meters per second</p>
            </div>
            <div className="p-4 sm:p-6 bg-white/15 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-xl text-center">
              <div className="p-2 sm:p-3 bg-yellow-500/30 rounded-xl sm:rounded-2xl w-fit mx-auto mb-2 sm:mb-4">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />
              </div>
              <h3 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2">Conditions</h3>
              <p className="text-white/80 text-xs sm:text-sm">Overall weather state like sunny, cloudy, or rainy</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 sm:gap-4 bg-white/15 backdrop-blur-xl rounded-full px-4 sm:px-8 py-3 sm:py-4 border border-white/20 shadow-xl">
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
            <span className="text-white/90 font-medium text-sm sm:text-base">
              Built with ❤️ for weather enthusiasts worldwide
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};