export interface WeatherInfo {
    currentTemp: number;
    minTemp: number;
    date: string;
    nextTemp?: number;
    nextMinTemp?: number;
    nextDate?: string;
  }
  
export interface HeaderModalProps {
    variant: 'private' | 'public';
    username: string;
    location?: string;
    weather?: WeatherInfo;
    isLoading?: boolean;
    onToggleVariant: () => void;
    onCalendarPress?: () => void;
    onSettingsPress?: () => void;
    onNotificationPress?: () => void;
    onBookmarkPress?: () => void;
  }