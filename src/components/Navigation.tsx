import { Cloud, Info, Home } from 'lucide-react';

interface NavigationProps {
  currentView: 'weather' | 'about';
  onViewChange: (view: 'weather' | 'about') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 bg-gradient-to-b from-black/20 to-transparent backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/30 shadow-xl">
              <Cloud className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="hidden md:block">
              <h2 className="text-white font-bold text-lg sm:text-xl">WeatherPro</h2>
              <p className="text-white/70 text-xs sm:text-sm">Professional Weather App</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onViewChange('weather')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold transition-all duration-200 active:scale-95 touch-action-manipulation ${
                currentView === 'weather'
                  ? 'bg-white/30 text-white border border-white/40 shadow-xl'
                  : 'bg-white/10 text-white/80 active:bg-white/20 border border-white/20'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline text-sm sm:text-base">Weather</span>
            </button>
            <button
              onClick={() => onViewChange('about')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold transition-all duration-200 active:scale-95 touch-action-manipulation ${
                currentView === 'about'
                  ? 'bg-white/30 text-white border border-white/40 shadow-xl'
                  : 'bg-white/10 text-white/80 active:bg-white/20 border border-white/20'
              }`}
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline text-sm sm:text-base">About</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};