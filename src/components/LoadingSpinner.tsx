import { Cloud, Sun, CloudRain, Zap, Wind, Snowflake } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="relative w-full max-w-md">
        {/* Background Blur Effect */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-2xl sm:rounded-3xl transform scale-110 animate-pulse"></div>

        {/* Main Container */}
        <div className="relative bg-white/15 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-16 border border-white/20 shadow-2xl">
          <div className="flex flex-col items-center">
            {/* Animated Weather Icons Constellation */}
            <div className="relative mb-8 sm:mb-12 w-24 h-24 sm:w-32 sm:h-32 mx-auto">
              {/* Central Sun */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping">
                    <Sun className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400/40" />
                  </div>
                  <Sun className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
              </div>
              
              {/* Orbiting Weather Icons */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '6s' }}>
                <Cloud className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 text-white/80" />
                <CloudRain className="absolute top-1/2 right-0 transform -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                <Wind className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 text-gray-300" />
                <Snowflake className="absolute top-1/2 left-0 transform -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 text-blue-200" />
              </div>

              {/* Lightning Effect */}
              <div className="absolute top-2 right-2 animate-pulse" style={{ animationDelay: '0.5s' }}>
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />
              </div>
            </div>
            
            {/* Gradient Loading Bars */}
            <div className="w-full max-w-xs sm:max-w-sm space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full animate-pulse transform origin-left scale-x-75"></div>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-full animate-pulse transform origin-left scale-x-50" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-full animate-pulse transform origin-left scale-x-90" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
            
            {/* Loading Text with Gradient */}
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-3 sm:mb-4">
                Loading Weather Data
              </h3>
              <p className="text-white/80 text-base sm:text-lg font-medium mb-4 sm:mb-6">
                Fetching real-time meteorological information...
              </p>
              
              {/* Animated Dots */}
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};