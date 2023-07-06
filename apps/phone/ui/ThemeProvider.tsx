import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { TamaguiProvider, Theme } from 'tamagui';

import ToastProvider from '~ui/ToastProvider';

import config from '../tamagui.config';

interface Props {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: Props) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <NavThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <TamaguiProvider config={config}>
        <Theme name={isDark ? 'dark' : 'light'}>
          <ToastProvider>
            {children}
          </ToastProvider>
        </Theme>
      </TamaguiProvider>
    </NavThemeProvider>
  );
}
