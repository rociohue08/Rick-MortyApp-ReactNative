// app/(tabs)/_layout.tsx (MODIFICADO)
/*Vamos a unificar el nombre de la ruta a characters (para que coincida con tu archivo CHARACTERS) 
y agregar las pestañas faltantes (favorites y profile). */

import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio', // Título actualizado
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      
      {/* 🟢 PERSONAJES: CAMBIADO A "characters" */}
      <Tabs.Screen
        name="characters" 
        options={{
          title: 'Personajes', // Título actualizado
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={color} />,
        }}
      />
      
      {/* 🟢 FAVORITOS: AÑADIDO */}
      <Tabs.Screen
        name="favorites" // Necesitas crear el archivo app/(tabs)/favorites.tsx
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.fill" color={color} />,
        }}
      />

      {/* 🟢 PERFIL: AÑADIDO */}
      <Tabs.Screen
        name="profile" // Necesitas crear el archivo app/(tabs)/profile.tsx
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.crop.circle.fill" color={color} />,
        }}
      />

    </Tabs>
  );
}