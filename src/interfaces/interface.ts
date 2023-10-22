export interface IGeocodeData {
  lat: string;
  lon: string;
}
export interface ILocation {
  address: {
    city: string;
    municipality: string;
    city_district: string;
    state: string;
  }
}
export interface IWeather {
  current_weather: { 
    is_day: number;
    temperature: number;
    time: string;
    weathercode: number;
    winddirection: number;
    windspeed: number;
  },
  daily: {
    sunrise: Array<string>;
    sunset: Array<string>;
    temperature_2m_max: Array<number>;
    temperature_2m_min: Array<number>;
    time: Array<string>;
    uv_index_max: Array<number>;
    weathercode: Array<number>;
  }
}
export interface IWeathercode {
  [key: number]: {
    title: string;
    icon: string;
  };
}
export interface IAddress {
  address: string
}
export type AddressContextType = {
  address: IAddress;
  setAddress: (address: IAddress) => void;
}