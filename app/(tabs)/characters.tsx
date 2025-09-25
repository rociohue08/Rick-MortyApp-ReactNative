import { PasseroOne_400Regular } from '@expo-google-fonts/passero-one';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';

interface Character {
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
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

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
        <ActivityIndicator size="large" color="#2ecc71" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personajes de Rick & Morty</Text>

      <FlatList
        data={characters}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
  <View style={styles.characterItem}>

    <Image
      source={{ uri: item.image }}
      style={styles.image}
    />

    <View style={styles.infoContainer}>
      <Text style={styles.textoComun}>Nombre:</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.textoComun}>Especie: {item.species}</Text>
    </View>

  </View>

        )}
      />
    </View>
  );
}

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
characterItem: {
  backgroundColor: '#700bb3a8',
  padding: 20,
  marginVertical: 8,
  marginHorizontal: 16,
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3.84,
  elevation: 5,
  width: '85%',
  flexDirection: 'row',
  alignItems: 'flex-start', // 👈 Alinea todo al inicio (arriba), no al centro
},

infoContainer: {
  flex: 1,
  marginLeft: 25, // 👈 Espacio a la izquierda del texto (separación clara)
  marginTop: 40,
},

image: {
  width: 150,
  height: 150,
  borderRadius: 75,
},
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'PasseroOne_400Regular',
    color:'#68ff10ff'
  },
  textoComun:{
  color:'#68ff10ff'  }
});