import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Esto configura el encabezado de la pantalla */}
      <Stack.Screen options={{ title: 'Mi Perfil' }} />
      <Text>Información del usuario y ajustes.</Text>
    </View>
  );
}