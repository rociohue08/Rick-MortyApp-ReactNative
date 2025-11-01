import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function IndexScreen() {
  return (
    <View style={styles.container}>
      {/* Stack.Screen configura las opciones del encabezado (Header) 
        para esta pantalla específica.
      */}
      <Stack.Screen 
        options={{ 
          title: 'Pantalla de Inicio', 
        }} 
      />
      
      <Text style={styles.title}>¡Bienvenido a Rick and Morty App!</Text>
      <Text style={styles.subtitle}>Usa las pestañas inferiores para navegar.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});