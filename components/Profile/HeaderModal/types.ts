import { User } from "@/types/api.types";
import { LocationType } from "@/types/api.types";
export interface DailyWeather {
  date: string;
  dayName: string;
  temp: number;
  minTemp: number;
}

export interface WeatherInfo {
    currentDate: string;
    forecast: DailyWeather[];
  
  }
  export interface WeatherCardProps {
    dayWeather: DailyWeather;
    currentDate?: string;
  }
  export interface TopBarProps {
    isPrivate: boolean;
    onToggleVariant: () => void;
    onNotificationPress: () => void;
    onBookmarkPress: () => void;
  }
  export interface UserInfoProps {
    user: User;
    isPrivate: boolean;
    onToggleVariant: () => void;
  }
  export interface WeatherSectionProps {
    weather: WeatherInfo;
    location: string;
    variant: 'private' | 'public';
    onCalendarPress: () => void;
    onLocationSelect: (newLocation: LocationType) => Promise<void>;
  }
  export interface PublicProfileContentProps {
    user: User;
    followersCount: number;
    followingsCount: number;
    onSettingsPress: () => void;
  }
  export interface HeaderModalProps {
    user: User;
    variant: 'private' | 'public';
    weather?: WeatherInfo;
    followersCount: number;
    followingsCount: number;
    location: string;
    onLocationSelect: (location: LocationType) => void;
    onToggleVariant: () => void;
    onCalendarPress: () => void;
    onSettingsPress: () => void;
    onNotificationPress: () => void;
    onBookmarkPress: () => void;
  }
