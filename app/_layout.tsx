import { PasseroOne_400Regular } from '@expo-google-fonts/passero-one';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { FavoriteProvider } from '../src/context/favoritesContext'; // Tu Provider

// Previene que la pantalla de inicio (Splash Screen) se oculte automáticamente
// mientras cargamos las fuentes.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    // 1. Carga las fuentes necesarias
    const [fontsLoaded, fontError] = useFonts({
        // Mapeamos el nombre que usaremos en CSS a la fuente importada
        'PasseroOne_400Regular': PasseroOne_400Regular,
        // Agrega aquí cualquier otra fuente de Google Fonts que necesites
    });

    // 2. Manejo de efectos secundarios y ocultar el Splash Screen
    useEffect(() => {
        if (fontsLoaded || fontError) {
            // Oculta el Splash Screen cuando las fuentes se carguen O si hay un error
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    // 3. Condición de Renderizado: Si la fuente no está cargada, no renderizamos nada (solo el Splash Screen)
    if (!fontsLoaded && !fontError) {
        // Retornamos null para que el Splash Screen permanezca visible.
        return null;
    }
    
    // Si hay un error de carga, podrías mostrar una pantalla de error.
    if (fontError) {
        // Opcional: Loggea el error para debug
        console.error("Error cargando la fuente:", fontError);
        // O simplemente procedemos para que se use la fuente por defecto.
    }


    // 4. Renderiza el contenido principal (ya con fuentes cargadas)
    return (
        // El Provider debe envolver TODO, incluyendo el Stack/Slot
        <FavoriteProvider>
            {/* Usamos Slot (o Stack si tuvieras un Stack Navigator principal) 
              para renderizar el resto de las rutas.
              La fuente 'PasseroOne_400Regular' ya está disponible globalmente aquí.
            */}
            <Slot /> 
        </FavoriteProvider>
    );
}
