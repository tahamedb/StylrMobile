import { useState, useCallback } from 'react';
import { nominatimService } from '@/services/Nominatim/nominatim';

export const useLocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );

      const location = await nominatimService.reverseGeocode(
        position.coords.latitude,
        position.coords.longitude
      );

      return location;
    } catch (err) {
      setError('Impossible d\'obtenir votre position');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { getCurrentLocation, isLoading, error };
};