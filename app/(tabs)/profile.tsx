// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
// Si quieres usar iconos, descomenta la siguiente línea y asegúrate de tener @expo/vector-icons instalado
// import { Ionicons } from '@expo/vector-icons'; 

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      // Aquí puedes configurar opciones que afecten a todas las pestañas, como el color
      tabBarActiveTintColor: '#2ecc71', 
    }}>
      <Tabs.Screen
        name="characters" // Cambia "explore" por "characters"
        options={{
          headerTitle: 'Personajes',
          title: 'Personajes',
          // tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          headerTitle: 'Favoritos',
          title: 'Favoritos',
          // tabBarIcon: ({ color, size }) => <Ionicons name="heart" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: 'Perfil',
          title: 'Perfil',
          // tabBarIcon: ({ color, size }) => <Ionicons name="settings" color={color} size={size} />,
        }}
      />
      {/* Si ya tienes un archivo index.tsx en (tabs) y no lo necesitas, puedes eliminar esta línea y el archivo */}
      <Tabs.Screen
        name="index" 
        options={{
          headerTitle: 'Inicio',
          title: 'Inicio',
          // tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}