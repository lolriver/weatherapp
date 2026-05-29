export interface City {
  id: string;
  name: string;
  region: string;
  country: string;
}

// Mock city data as fallback when API is unavailable
const mockCities: City[] = [
  { id: '1', name: 'New York', region: 'New York', country: 'United States' },
  { id: '2', name: 'London', region: 'England', country: 'United Kingdom' },
  { id: '3', name: 'Tokyo', region: 'Tokyo', country: 'Japan' },
  { id: '4', name: 'Paris', region: 'Île-de-France', country: 'France' },
  { id: '5', name: 'Sydney', region: 'New South Wales', country: 'Australia' },
  { id: '6', name: 'Mumbai', region: 'Maharashtra', country: 'India' },
  { id: '7', name: 'Berlin', region: 'Berlin', country: 'Germany' },
  { id: '8', name: 'Toronto', region: 'Ontario', country: 'Canada' },
  { id: '9', name: 'Dubai', region: 'Dubai', country: 'United Arab Emirates' },
  { id: '10', name: 'Singapore', region: 'Singapore', country: 'Singapore' },
  { id: '11', name: 'Los Angeles', region: 'California', country: 'United States' },
  { id: '12', name: 'Barcelona', region: 'Catalonia', country: 'Spain' },
  { id: '13', name: 'Amsterdam', region: 'North Holland', country: 'Netherlands' },
  { id: '14', name: 'Bangkok', region: 'Bangkok', country: 'Thailand' },
  { id: '15', name: 'Rome', region: 'Lazio', country: 'Italy' },
];

export class CityService {
  static async searchCities(query: string): Promise<City[]> {
    if (query.length < 2) {
      return [];
    }

    // Use mock data for city search
    return mockCities.filter(city =>
      city.name.toLowerCase().includes(query.toLowerCase()) ||
      city.region.toLowerCase().includes(query.toLowerCase()) ||
      city.country.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);
  }
}