import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
// import { useColorScheme } from 'react-native';
import { TamaguiProvider, Theme } from 'tamagui';

import config from '../tamagui.config';

interface Props {
  children: React.ReactNode;
}

export default function BaseThemeProvider({ children }: Props) {
  // const colorScheme = useColorScheme();
  // const isDark = colorScheme === 'dark';
  const isDark = false;

  return (
    <NavThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <TamaguiProvider config={config}>
        <Theme name={isDark ? 'dark' : 'light'}>
          {children}
        </Theme>
      </TamaguiProvider>
    </NavThemeProvider>
  );
}
