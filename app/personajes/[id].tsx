/*La ruta [id].tsx no significa que el archivo se llame "id"; significa que id es una 
variable que se pasa en la URL. 

Si usas app/personajes/[id].tsx: Las URLs
que funcionan son /personajes/1, /personajes/42, etc. La variable id (1, 42) se captura automáticamente 
por el hook useLocalSearchParams().

*/


// app/personajes/[id].tsx

import { useLocalSearchParams } from 'expo-router'; // Para obtener el [id]
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { getCharacterDetail } from '../../src/api.js'; // Función para el detalle
// import CharacterCard from '../../src/components/CharacterCard.jsx'; // La podemos reutilizar

export default function CharacterDetailScreen() {
    // 1. Obtener el ID de la URL
    const { id } = useLocalSearchParams();
    const characterId = id as string; // TypeScript: asegura que 'id' es una cadena

    const [character, setCharacter] = useState<any>(null); // Puedes usar la interfaz Character aquí también
    const [isLoading, setIsLoading] = useState(true);

    // 2. Cargar los datos específicos del personaje
    useEffect(() => {
        async function loadDetail() {
            if (!characterId) return;

            const data = await getCharacterDetail(characterId);
            setCharacter(data);
            setIsLoading(false);
        }
        loadDetail();
    }, [characterId]);

    if (isLoading || !character) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    
    // 3. Mostrar el detalle
    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold' }}>{character.name}</Text>
            <Text>Especie: {character.species}</Text>
            <Text>Origen: {character.origin.name}</Text>
            {/* Aquí puedes usar CharacterCard o solo el botón de favorito */}
            {/* <CharacterCard character={character} /> */}
            
            <Text style={{ fontSize: 20, marginTop: 15 }}>Episodios:</Text>
            {/* Muestra la lista de episodios (Requisito del TP) */}
            {character.episode.map((episodeUrl: string, index: number) => (
                <Text key={index}>- Episodio {episodeUrl.split('/').pop()}</Text>
            ))}
        </View>
    );
}




