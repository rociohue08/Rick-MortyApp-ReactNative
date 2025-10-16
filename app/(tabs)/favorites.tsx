// app/(tabs)/favorites.tsx

import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
// 🟢 Importamos el hook que nos da la lista de IDs guardados
import { PasseroOne_400Regular } from '@expo-google-fonts/passero-one';
import { useFonts } from 'expo-font';
import { useFavorites } from '../context/FavoritesContext';


// Tipo de personaje (reutilizado)
interface Personaje {
  id: number;
  name: string;
  species: string;
  image: string;
}

export default function FavoritesScreen() {
    // 🟢 OBTENER la lista de IDs favoritos del estado global
    const { favoriteIds } = useFavorites();
    
    const [favoriteCharacters, setFavoriteCharacters] = useState<Personaje[]>([]);
    const [loading, setLoading] = useState(true);

    const [fontsLoaded] = useFonts({
        PasseroOne_400Regular,
     });

    // Efecto que se dispara cada vez que la lista de IDs favoritos cambia
    useEffect(() => {
        const fetchFavoriteCharacters = async () => {
            setLoading(true);
            
            if (favoriteIds.length === 0) {
                setFavoriteCharacters([]);
                setLoading(false);
                return;
            }

            try {
                // 🟢 PREPARAMOS LA URL: '1,2,3,4'
                const idsString = favoriteIds.join(',');
                
                // Llamada a la API usando el listado de IDs
                const response = await fetch(`https://rickandmortyapi.com/api/character/${idsString}`);
                const data = await response.json();
                
                // La API devuelve un array (si son >1) o un objeto (si es solo 1 ID).
                setFavoriteCharacters(Array.isArray(data) ? data : [data]);
            } catch (error) {
                console.error("Error al cargar personajes favoritos:", error);
                setFavoriteCharacters([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFavoriteCharacters();
    }, [favoriteIds]); // 🟢 DEPENDENCIA: Se ejecuta si la lista de IDs cambia

    if (!fontsLoaded || loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#68ff10ff" />
                <Text style={styles.textoComun}>Cargando favoritos...</Text>
            </View>
        );
    }

    if (favoriteCharacters.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Mis Favoritos</Text>
                <Text style={styles.noFavoritesText}>
                    Aún no tienes personajes favoritos. ¡Añade algunos desde la pestaña Personajes!
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis Favoritos ({favoriteCharacters.length})</Text>
            <FlatList
                data={favoriteCharacters}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <Pressable 
                        style={styles.characterItem}
                        // 🟢 Navegación al detalle, igual que en characters.tsx
                         onPress={() => router.push(`personajes/${item.id}` as any)}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.image}
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.textoComun}>Especie: {item.species}</Text>
                        </View>
                    </Pressable>
                )}
            />
        </View>
    );
}

// --- ESTILOS (Ajustados para esta pantalla, puedes reusar los que ya tenías) ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 40,
        backgroundColor: '#000000ff',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'PasseroOne_400Regular',
        marginBottom: 20,
        color: '#68ff10ff',
        textAlign: 'center',
    },
    noFavoritesText: {
        color: '#999',
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
    },
    characterItem: {
        backgroundColor: '#700bb3a8',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoContainer: {
        flex: 1,
        marginLeft: 25,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'PasseroOne_400Regular',
        color: '#68ff10ff',
    },
    textoComun: {
        color: '#68ff10ff',
    }
});