import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Sparkles } from 'lucide-react';
import { CityService, City } from '../services/cityService';

interface SearchBarProps {
  onSearch: (location: string) => void;
  onCurrentLocation: () => void;
  loading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onCurrentLocation, 
  loading 
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length >= 2) {
        setLoadingSuggestions(true);
        try {
          const cities = await CityService.searchCities(query);
          setSuggestions(cities);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        } finally {
          setLoadingSuggestions(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city: City) => {
    const cityName = `${city.name}, ${city.country}`;
    setQuery(cityName);
    setShowSuggestions(false);
    onSearch(cityName);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 sm:mb-12" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative group touch-action-manipulation">
        {/* Glowing Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-focus-within:blur-2xl transition-all duration-300"></div>
        
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for any city worldwide..."
            className="w-full px-4 sm:px-8 py-4 sm:py-6 pr-14 sm:pr-16 bg-white/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 text-base sm:text-lg font-medium shadow-2xl"
            disabled={loading}
            autoComplete="off"
            inputMode="search"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 p-2.5 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl text-white active:scale-95 disabled:opacity-50 shadow-xl touch-action-manipulation"
          >
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-3 sm:mt-4 bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl z-50 max-h-80 sm:max-h-96 overflow-y-auto touch-action-pan-y">
            {loadingSuggestions ? (
              <div className="p-8 text-center">
                <div className="relative mx-auto mb-4 w-10 h-10">
                  <div className="absolute inset-0 rounded-full border-3 border-blue-200"></div>
                  <div className="absolute inset-0 rounded-full border-3 border-blue-500 border-t-transparent animate-spin"></div>
                </div>
                <p className="text-gray-700 font-semibold">Searching cities...</p>
                <p className="text-gray-500 text-sm mt-1">Finding the perfect match</p>
              </div>
            ) : suggestions.length > 0 ? (
              <ul className="py-4">
                {suggestions.map((city) => (
                  <li
                    key={city.id}
                    onClick={() => handleSuggestionClick(city)}
                    className="px-4 sm:px-6 py-4 sm:py-5 active:bg-gradient-to-r active:from-blue-50 active:to-indigo-50 cursor-pointer transition-all duration-200 border-b border-gray-100/50 last:border-b-0 group touch-action-manipulation"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl group-hover:from-blue-200 group-hover:to-indigo-300 transition-all duration-300 shadow-lg">
                        <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-900 truncate text-lg">
                          {city.name}
                        </div>
                        <div className="text-gray-600 truncate mt-1 font-medium">
                          {city.region ? `${city.region}, ` : ''}{city.country}
                        </div>
                      </div>
                      <Sparkles className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                    </div>
                  </li>
                ))}
              </ul>
            ) : query.length >= 2 ? (
              <div className="p-8 text-center text-gray-500">
                <div className="p-4 bg-gray-100 rounded-full w-fit mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-gray-400" />
                </div>
                <p className="font-semibold text-lg">No cities found</p>
                <p className="text-sm text-gray-400 mt-2">Try a different search term or check spelling</p>
              </div>
            ) : null}
          </div>
        )}
      </form>
      
      <button
        onClick={onCurrentLocation}
        disabled={loading}
        className="mt-4 sm:mt-6 w-full flex items-center justify-center gap-3 sm:gap-4 px-4 sm:px-8 py-4 sm:py-5 bg-white/15 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 text-white active:bg-white/25 active:border-white/30 transition-all duration-200 disabled:opacity-50 shadow-2xl group active:scale-95 font-semibold text-base sm:text-lg touch-action-manipulation"
      >
        <div className="p-2 bg-white/20 rounded-xl group-hover:bg-white/30 transition-all duration-300 shadow-lg">
          <MapPin className="w-5 h-5" />
        </div>
        <span>Use My Current Location</span>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-200"></div>
        </div>
      </button>
    </div>
  );
};