/*
La ruta [id].tsx no significa que el archivo se llame "id"; significa que id es una 
variable que se pasa en la URL. 

Si usas app/personajes/[id].tsx: Las URLs
que funcionan son /personajes/1, /personajes/42, etc. La variable id (1, 42) se captura automáticamente 
por el hook useLocalSearchParams().

*/

// app/personajes/[id].tsx

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Stack, useLocalSearchParams } from 'expo-router'; // Añadido Link para el botón de Volver
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; // Importado Dimensions
import { getCharacterDetail } from '../../src/api.js'; // Función para el detalle



// Estilos de color comunes para el tema de Rick and Morty
const RICK_MORTY_GREEN = '#68ff10ff';
const DARK_BG = '#1a1a1a';
const CARD_BG = '#222222';
const TEXT_COLOR = '#eeeeee';

// FUNCIÓN AGREGADA: Auxiliar para dividir un array en dos columnas verticales
const splitIntoColumns = (data: string[]) => {
    // Calculamos el índice medio para dividir la lista por la mitad
    const middleIndex = Math.ceil(data.length / 2);
    const column1 = data.slice(0, middleIndex);
    const column2 = data.slice(middleIndex);
    return { column1, column2 };
};


export default function CharacterDetailScreen() {
    // Obtener la altura de la ventana al cargar el componente
    const windowHeight = Dimensions.get('window').height;

    // 1. Obtener el ID de la URL
    const { id } = useLocalSearchParams();
    const characterId = id as string; // TypeScript: asegura que 'id' es una cadena

    const [character, setCharacter] = useState<any>(null); // Puedes usar la interfaz Character aquí también
    const [isLoading, setIsLoading] = useState(true);

    // 2. Cargar los datos específicos del personaje
    useEffect(() => {
        async function loadDetail() {
            if (!characterId) return;

            try {
                const data = await getCharacterDetail(characterId);
                setCharacter(data);
            } catch (error) {
                console.error("Error cargando detalle del personaje:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadDetail();
    }, [characterId]);

    // 3. Manejo de estados de carga y error
    if (isLoading) {
        return (
            // APLICAMOS FLEX: 1 AQUÍ para que la vista de carga siempre ocupe todo el espacio.
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={RICK_MORTY_GREEN} />
                <Text style={styles.loadingText}>Cargando datos ...</Text>
            </View>
        );
    }

    if (!character) {
        return (
            // APLICAMOS FLEX: 1 AQUÍ para que la vista de error siempre ocupe todo el espacio.
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>No se pudo cargar la información del personaje.</Text>
            </View>
        );
    }
    
    // Configura el título del encabezado con el nombre del personaje
    const headerTitle = character.name.length > 20 ? "Detalle" : character.name;

    // División de episodios en dos arrays para el layout de columna
    const { column1, column2 } = splitIntoColumns(character.episode);

    // 4. Mostrar el detalle
    return (
        <ScrollView 
            // Combinamos flex: 1 con minHeight para garantizar que ocupe todo el espacio visible en web y nativo
            style={[styles.container, { minHeight: windowHeight }]} 
            contentContainerStyle={styles.contentContainer}
            // Agregamos una propiedad para garantizar el scroll en el entorno web
            // Si el contenido es largo, siempre se permite el desplazamiento.
            alwaysBounceVertical={true} 
        >
            <Stack.Screen
                options={{
                    title: headerTitle,
                    headerStyle: { backgroundColor: DARK_BG },
                    headerTintColor: RICK_MORTY_GREEN,
                }}
            />
            
            {/* Botón de Volver Manual */}
            <Link href="/characters" asChild>
                <TouchableOpacity style={styles.goBackButton}>
                    <FontAwesome 
                        name="arrow-circle-left" // <-- Ícono "arrow-circle-left"
                        size={34}
                        style={styles.goBackIcon}

                    />
                        
                    
                </TouchableOpacity>
            </Link>
                
            <Text style={styles.tittle}>DETALLES DEL PERSONAJE</Text>


            <View style={styles.card}>
                <Image source={{ uri: character.image }} style={styles.image} />
                
                <Text style={styles.name}>{character.name}</Text>
                
                {/* Detalles principales */}
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Especie:</Text>
                    <Text style={styles.value}>{character.species}</Text>
                </View>
                
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Estado:</Text>
                    {/* Cambiamos el color del estado según su valor */}
                    <Text style={[styles.value, { color: character.status === 'Alive' ? RICK_MORTY_GREEN : (character.status === 'Dead' ? '#e74c3c' : '#f1c40f') }]}>
                        {character.status}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Origen:</Text>
                    <Text style={styles.value}>{character.origin.name}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Última ubicación:</Text>
                    <Text style={styles.value}>{character.location.name}</Text>
                </View>

               <View style={styles.episodeListContainer}>
                    <Text style={styles.episodeTitle}>Apariciones en Episodios:</Text>
                    
                    {/* Contenedor Flex Row para alinear las dos columnas lado a lado */}
                    <View style={styles.episodeColumnsWrapper}>
                        
                        {/* COLUMNA 1 (Flujo Vertical) */}
                        <View style={styles.episodeColumn}>
                            {column1.map((episodeUrl: string, index: number) => (
                                <Text key={index} style={styles.episodeItem}>
                                    - Episodio {episodeUrl.split('/').pop()}
                                </Text>
                            ))}
                        </View>
                        
                        {/* COLUMNA 2 (Flujo Vertical) */}
                        <View style={styles.episodeColumn}>
                            {column2.map((episodeUrl: string, index: number) => (
                                <Text key={index} style={styles.episodeItem}>
                                    - Episodio {episodeUrl.split('/').pop()}
                                </Text>
                            ))}
                        </View>

                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    tittle:{
        fontSize: 34,
        fontWeight: 'bold',
        fontFamily: 'PasseroOne_400Regular',
        color: RICK_MORTY_GREEN,
        marginBottom: 20,
        textAlign: 'center',
    },
    container: {
        maxHeight: '10%',
        backgroundColor: 
        '#490840ff',
    },
    contentContainer: {
        maxHeight: '60%',
        padding: 65,
        paddingBottom: 20, // ESENCIAL:5Espacio extra al final para asegurar que se vea la última línea
        alignItems: 'center', // Para centrar el contenido, como la tarjeta

    },
    loadingContainer: {
        flex: 1, // ESENCIAL: Ocupar todo el espacio para la pantalla de carga/error
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: DARK_BG,
    },
    loadingText: {
        color: TEXT_COLOR,
        marginTop: 10,
    },
    errorText: {
        color: '#e74c3c', // Rojo para errores
        fontSize: 18,
    },
    goBackButton: {
        alignSelf: 'flex-start',
        marginBottom: 15,
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    goBackContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    goBackIcon: {
        marginRight: 8,
        color: RICK_MORTY_GREEN
    
    },
  
    // Estilo de la tarjeta de detalle
    card: {
        padding: 40,
        borderRadius: 12,
        alignItems: 'center',
        width: '70%', // Asegura que la tarjeta ocupe todo el ancho disponible
        shadowColor: RICK_MORTY_GREEN,
        shadowOpacity: 3.4,
        shadowRadius: 5,
        elevation: 8,
        backgroundColor: CARD_BG,
        paddingBottom:40,
        marginBottom:'80%',
       
        
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: RICK_MORTY_GREEN,
        marginBottom: 20,
    },
    // Estilo para el nombre del personaje
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'PasseroOne_400Regular',
        color: RICK_MORTY_GREEN,
        marginBottom: 20,
        textAlign: 'center',
    },
    // Estilo para cada fila de detalle
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '40%',
        paddingVertical: 8,
    },
    // Estilo para la etiqueta del detalle
    label: {
        fontSize: 16,
        color:  RICK_MORTY_GREEN, 
        fontWeight: '600',
    },
    // Estilo para el valor del detalle 
    value: {
        fontSize: 16,
        color: TEXT_COLOR, 
    },
    
    episodeListContainer: {
        marginTop: 25,
        backgroundColor: '#111111ff', // Un poco más oscuro que el fondo de la tarjeta
        padding: 15,
        borderRadius: 8,
        width: '100%',
    },

    // ESTILO CLAVE 1: Contenedor principal que alinea las dos columnas (horizontal)
    episodeColumnsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Asegura que las columnas se separen un poco
    },

    // ESTILO CLAVE 2: Estilo para cada columna (vertical, toma el 48% del ancho)
    episodeColumn: {
        width: '48%', 
        flexDirection: 'column', // Los ítems dentro se apilan verticalmente (esto es lo que quieres)
    },


    // Estilo para el título de la lista de episodios
    episodeTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: RICK_MORTY_GREEN,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: RICK_MORTY_GREEN,
        paddingBottom: 5,
    },
    // Estilo para cada ítem de episodio
    episodeItem: {
        fontSize: 14,
        color: TEXT_COLOR,
        marginBottom: 4,
        // flexDirection: 'column' en Text no hace nada, el layout se define en el padre (episodeColumn)
        // Se elimina el `flexDirection: 'column'` de aquí.
    }
});
