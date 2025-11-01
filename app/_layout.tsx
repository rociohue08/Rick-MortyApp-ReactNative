// app/_layout.tsx

import { Slot } from 'expo-router'; // Importamos el Slot de Expo Router
import { FavoriteProvider } from '../src/context/favoritesContext'; // 💡 Importamos tu Provider

export default function RootLayout() {

  // Nota: Aquí podrías añadir lógica de carga de fuentes si fuera necesario.
  
  return (
    // 📢 Envolvemos toda la app con el Provider
    <FavoriteProvider>
      {/* El Slot renderiza el resto de las rutas (tabs, stacks, etc.) */}
      <Slot /> 
    </FavoriteProvider>
  );
}