import { Stack } from "expo-router";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

// 💡 CORRECCIÓN IMPORTANTE: Se usa "../../" para subir dos niveles (fuera de '(tabs)' y 'app')
// La ruta ahora es correcta para un archivo dentro de 'app/(tabs)/'
const RICK_MORTY_BACKGROUND = require("../../assets/images/portada.jpg");

export default function IndexScreen() {
  return (
    // 1. Usamos ImageBackground en lugar de View
    <ImageBackground
      source={RICK_MORTY_BACKGROUND} // Se pasa el resultado de require() directamente
      style={styles.background}
      resizeMode="cover" // <-- CORREGIDO: resizeMode debe ser una prop del componente para que la imagen cubra el fondo
    >
     {/* Stack.Screen configura las opciones del encabezado (Header) */}
   
      <Stack.Screen
        options={{
          title: "Pantalla de Inicio", // Opcional: Si no quieres que el header se vea sobre el fondo, // puedes ocultarlo o hacerlo transparente. // headerTransparent: true, // headerTitleStyle: { color: 'white' }
        }}
      />
      
      {/* 2. Contenedor de Contenido (Asegura que el texto esté centrado) */}
    
      <View style={styles.contentContainer}>
        {/* Opcional: Añadimos una capa semitransparente para mejor contraste */}
        <View style={styles.overlay} />
        <Text style={styles.title}>¡Bienvenido a Rick and Morty App!</Text>
      
       
      </View>
      
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // El estilo 'background' debe ocupar todo el espacio
  background: {
    flex: 1,
    width: "100%", // Añadido: Asegura que tome todo el ancho
    height: "100%", // Añadido: Asegura que tome todo el alto // El 'resizeMode' se movió como prop en el JSX, no va aquí
  }, // El contenedor de contenido se encarga de centrar los textos
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // Ya no necesitamos 'backgroundColor' aquí, ImageBackground lo maneja
  }, // Capa oscura y semitransparente para mejorar el contraste
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Negro con 40% de opacidad
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    fontFamily: "PasseroOne_400Regular",
    marginBottom: 20,
    color: "#68ff10ff", // Verde Rick and Morty
    textAlign: "center",
    zIndex: 1, // Asegura que el texto esté sobre el overlay
  },
  subtitle: {
    fontSize: 18, // Aumenté un poco el tamaño para mejor legibilidad
    color: "white", // Cambié a blanco para mejor contraste
    zIndex: 1, // Asegura que el texto esté sobre el overlay
  },
});
