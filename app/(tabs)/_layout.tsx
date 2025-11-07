// app/(tabs)/_layout.tsx (CÓDIGO LISTO PARA PEGAR)

import { Ionicons } from "@expo/vector-icons"; // Usamos un paquete de iconos común
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

// ----------------------------------------------------------------------
// Sustituciones y Tipado Estricto para evitar el error TS7053
// ----------------------------------------------------------------------

// 1. Definición del tipo para las claves válidas del esquema de color
type ColorSchemeKey = "light" | "dark";

// 2. Sustituye Colors y aplica tipificación estricta
const SimpleColors: Record<ColorSchemeKey, { tint: string }> = {
  light: { tint: "blue" },
  dark: { tint: "cyan" },
};

// 3. Sustituye useColorScheme y aplica el tipo de retorno estricto
const useSimpleColorScheme = (): ColorSchemeKey => "light";

// 4. Sustituye HapticTab (Botón simple sin vibración)
const SimpleTabButton = (props: any) => <View {...props} style={{ flex: 1 }} />;

// 5. Sustituye IconSymbol por Ionicons
const TabIcon = ({ name, color }: { name: any; color: string }) => {
  return <Ionicons name={name} size={28} color={color} />;
};

// ----------------------------------------------------------------------

export default function TabLayout() {
  // Ahora colorScheme es de tipo 'light' | 'dark', resolviendo el error de indexación
  const colorScheme = useSimpleColorScheme();

  return (
    <Tabs
      screenOptions={{
        // ❌ ERROR RESUELTO
        tabBarActiveTintColor: SimpleColors[colorScheme].tint,
        headerShown: false,
        tabBarButton: SimpleTabButton,
      }}
    >
           {" "}
      <Tabs.Screen
        name="index"
        options={{
          // CLAVE 1: Ocultamos el texto de la etiqueta
          tabBarShowLabel: false,
          // CLAVE 2: Usamos 'title' para el tooltip en la web
          title: "Inicio",
          tabBarIcon: ({ color }) => <TabIcon name="home" color={color} />,
        }}
      />
            {/* 🟢 PERSONAJES */}
           {" "}
      <Tabs.Screen
        name="characters"
        options={{
          // CLAVE 1: Ocultamos el texto de la etiqueta
          tabBarShowLabel: false,
          // CLAVE 2: Usamos 'title' para el tooltip en la web
          title: "Personajes",
          tabBarIcon: ({ color }) => <TabIcon name="people" color={color} />,
        }}
      />
            {/* 🟢 FAVORITOS */}
           {" "}
      <Tabs.Screen
        name="favorites"
        options={{
          // CLAVE 1: Ocultamos el texto de la etiqueta
          tabBarShowLabel: false,
          // CLAVE 2: Usamos 'title' para el tooltip en la web
          title: "Favoritos",
          tabBarIcon: ({ color }) => <TabIcon name="heart" color={color} />,
        }}
      />
            {/* 🟢 PERFIL */}
           {" "}
      <Tabs.Screen
        name="profile"
        options={{
          // CLAVE 1: Ocultamos el texto de la etiqueta
          tabBarShowLabel: false,
          // CLAVE 2: Usamos 'title' para el tooltip en la web
          title: "Perfil",
          tabBarIcon: ({ color }) => <TabIcon name="person" color={color} />,
        }}
      />
         {" "}
    </Tabs>
  );
}
