// app/_layout.tsx (MODIFICADO)

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { FavoritesProvider } from './context/FavoritesContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    // 🟢 2. ENVOLVER CON PROVIDER
    <FavoritesProvider> 
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          {/* 🟢 3. RUTA DE DETALLE DINÁMICA */}
          <Stack.Screen name="personajes/[id]" options={{ title: 'Detalle' }} /> 
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </FavoritesProvider>
  );
}