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
  
export interface HeaderModalProps {
    variant: 'private' | 'public';
    username: string;
    location?: string;
    weather?: WeatherInfo;
    //isLoading?: boolean;
    onToggleVariant: () => void;
    onCalendarPress?: () => void;
    onSettingsPress?: () => void;
    onNotificationPress?: () => void;
    onBookmarkPress?: () => void;
  }
