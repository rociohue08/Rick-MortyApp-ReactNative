// app/(tabs)/characters.tsx

import { PasseroOne_400Regular } from '@expo-google-fonts/passero-one';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
// 🟢 Importaciones necesarias para los íconos de los botones
import { Ionicons } from '@expo/vector-icons';
import { useFavoriteActions } from '../context/FavoritesContext';
// Interfaz para el tipado
interface Personaje {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export default function CharactersScreen() {
  const [characters, setCharacters] = useState<Personaje[]>([]);
  const [loading, setLoading] = useState(true);

  // 🟢 Hook de Favoritos
  const { toggleFavorite, isFavorite } = useFavoriteActions();

  // Cargar la fuente
  const [fontsLoaded] = useFonts({
    PasseroOne_400Regular,
  });

  // Obtener datos
  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data = await response.json();
      setCharacters(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#68ff10ff" />
        <Text style={styles.textoComun}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personajes de Rick & Morty</Text>

      <FlatList<Personaje> 
        data={characters}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
            // 🟢 Lógica para saber si es favorito
            const isCharFavorite = isFavorite(item.id);

            return (
              <View style={styles.characterItemContainer}> 
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                />

                <View style={styles.infoContainer}>
                  <Text style={styles.textoComun}>Nombre:</Text>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.textoComun}>Especie: {item.species}</Text>
                </View>

                {/* 🟢 CONTENEDOR DE BOTONES (Corazón y Ojo) */}
                <View style={styles.actionButtons}>
                    
                    {/* 1. BOTÓN DE FAVORITO (CORAZÓN) */}
                    <Pressable
                        onPress={() => toggleFavorite(item.id)}
                        style={styles.actionButton}
                    >
                        <Ionicons 
                            name={isCharFavorite ? 'heart' : 'heart-outline'} 
                            size={30} 
                            color={isCharFavorite ? '#ff6666' : '#68ff10ff'} // Rojo si es favorito
                        />
                    </Pressable>

                    {/* 2. BOTÓN DE DETALLE (OJO) */}
                    <Pressable
                        onPress={() => router.push(`personajes/${item.id}` as any)} // 👈 Navegación al detalle
                        style={styles.actionButton}
                    >
                        <Ionicons name="eye" size={30} color="#68ff10ff" />
                    </Pressable>
                </View>
              </View>
            );
        }}
      />
    </View>
  );
}

// --- ESTILOS MODIFICADOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#000000ff',
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    fontFamily: 'PasseroOne_400Regular',
    marginBottom: 20,
    color:'#68ff10ff',
    textAlign: 'center',
  },
// 🟢 characterItem ANTERIOR AHORA ES characterItemContainer (Es el contenedor de la fila)
characterItemContainer: { 
    backgroundColor: '#700bb3a8',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center', // Alinea la imagen y texto con los botones verticalmente
    justifyContent: 'space-between', // Espacio entre contenido y botones
},
infoContainer: {
  flex: 1,
  marginLeft: 25, 
  // Quitamos el marginTop: 40 para que se vea bien centrado
},
image: {
  width: 80, // Reducido para caber en la fila
  height: 80,
  borderRadius: 40,
},
// 🟢 Nuevos estilos para los botones
actionButtons: {
    flexDirection: 'column', // Botones apilados
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
},
actionButton: {
    padding: 8,
    marginVertical: 4, 
},
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'PasseroOne_400Regular',
    color:'#68ff10ff'
  },
  textoComun:{
  color:'#68ff10ff'  }
});