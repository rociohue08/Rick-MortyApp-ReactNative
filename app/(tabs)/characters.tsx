// 📁 app/(tabs)/characters.tsx (VERSIÓN FINAL CON FUENTES Y ESTILOS)

import { PasseroOne_400Regular } from '@expo-google-fonts/passero-one';
import { useFonts } from 'expo-font';
import { Link, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { getCharacters } from '../../src/api.js';
// 💡 Importamos el componente de tarjeta modular
import CharacterCard from '../../src/components/characterCard.jsx';

// 💡 Interfaz para el tipado (USANDO TU ESTRUCTURA DETALLADA)
interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type?: string;
    gender: string;
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export default function CharactersScreen() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Cargar la fuente
    const [fontsLoaded] = useFonts({
        PasseroOne_400Regular,
    });

    // 1. Obtener datos (Usando la función de tu src/api.js)
    useEffect(() => {
        async function loadData() {
            try {
                // Asegúrate que getCharacters devuelva un array de Character[]
                const data: Character[] = await getCharacters(); 
                setCharacters(data);
            } catch (error) {
                console.error("Error fetching characters:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, []);

    // 2. Vista de Carga y Fuente
    if (!fontsLoaded || isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#68ff10ff" />
                <Text style={styles.textoComun}>Cargando...</Text>
            </View>
        );
    }
    
    // 3. RenderItem: Llama a la tarjeta modular y le pasa los estilos.
    const renderItem = ({ item }: { item: Character }) => (
        // Usamos Link para navegar al detalle. La navegación está enlazada al Pressable de la Card.
        <Link href={`/personajes/${item.id.toString()}`} asChild> 
            {/* 💡 Pasamos el personaje y el objeto styles completo */}
            <CharacterCard character={item} styles={styles} />
        </Link>
    );

    return (
        <View style={styles.container}>
            {/* Configura el título de la pestaña */}
            <Stack.Screen options={{ title: 'Personajes', headerShown: false }} /> 
            
            {/* Tu título personalizado */}
            <Text style={styles.title}>Personajes de Rick & Morty</Text>

            <FlatList<Character> 
                data={characters}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}


// --- ESTILOS DEFINIDOS AQUÍ ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 40,
        backgroundColor: '#000000ff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    // Estilo que usará la Card: Contenedor de la fila
    characterItemContainer: { 
        backgroundColor: '#490840ff',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between', 
    },
    // Estilo que usará la Card: Contenedor de info (texto)
    infoContainer: {
        flex: 1,
        marginLeft: 25, 
    },
    // Estilo que usará la Card: Imagen
    image: {
        width: 80, 
        height: 80,
        borderRadius: 40,
    },
    // Estilo que usará la Card: Botones
    actionButtons: {
        flexDirection: 'column', 
        alignItems: 'center',
        marginLeft: 10,
    },
    // Estilo que usará la Card: Botón individual
    actionButton: {
        padding: 8,
        marginVertical: 4, 
    },
    // Estilo que usará la Card: Nombre
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'PasseroOne_400Regular',
        color:'#68ff10ff'
    },
    // Estilo que usará la Card: Texto común
    textoComun:{
        color:'#68ff10ff'  
    },
    // Estilo para el contenido de la FlatList
    listContent: {
        paddingVertical: 10,
    },
});