import { Text, TextProps } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export function ThemedText(props: TextProps) {
  const { colors } = useTheme();
  return (
    <Text 
      {...props} 
      style={[
        { color: colors.text },
        props.style
      ]} 
    />
  );
}
