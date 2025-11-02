// src/components/CharacterCard.tsx

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useFavorites } from "../context/favoritesContext";

// --- INTERFACES PARA TIPADO (OBLIGATORIO en .tsx) ---

// Tipo simplificado para los estilos recibidos (Usamos 'any' para simplificar la compleja estructura de StyleSheet)
type StyleProp = any;

// Interfaz del Personaje (Mínima necesaria para la Card)
// Debe coincidir con la que definiste en characters.tsx
interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

// Interfaz para las PROPS que recibe CharacterCard (Resuelve el error TS2322)
interface CharacterCardProps {
  character: Character;
  styles: StyleProp; // 💡 ¡Aquí está la propiedad que faltaba en el tipado!
}

// --- COMPONENTE (APLICANDO EL TIPADO) ---

// Aplicamos el tipo CharacterCardProps al componente
export default function CharacterCard({
  character,
  styles,
}: CharacterCardProps) {
  // 1. Hook de Contexto
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isCurrentlyFavorite = isFavorite(character);

  // 2. Manejador del Botón de Favorito
  const handleToggleFavorite = (e: any) => {
    e.stopPropagation(); // Evita que el Link padre navegue
    if (isCurrentlyFavorite) {
      removeFavorite(character);
    } else {
      addFavorite(character);
    }
  };

  // 3. Manejador del Botón de Detalle (Ojo)
  const handleNavigateToDetail = (e: any) => {
    e.stopPropagation();
    router.push(`/personajes/${character.id.toString()}`);
  };

  return (
    // Usamos styles.characterItemContainer y demás estilos que vienen de characters.tsx
    <View style={styles.characterItemContainer}>
      <Image source={{ uri: character.image }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.textoComun}>Nombre:</Text>
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.textoComun}>Especie: {character.species}</Text>
      </View>

      {/* CONTENEDOR DE BOTONES (Corazón y Ojo) */}
      <View style={styles.actionButtons}>
        {/* 1. BOTÓN DE FAVORITO (CORAZÓN) */}
        <Pressable onPress={handleToggleFavorite} style={styles.actionButton}>
          <Ionicons
            name={isCurrentlyFavorite ? "heart" : "heart-outline"}
            size={30}
            color={isCurrentlyFavorite ? "#ff6666" : "#68ff10ff"}
          />
        </Pressable>

        {/* 2. BOTÓN DE DETALLE (OJO) */}
        <Pressable onPress={handleNavigateToDetail} style={styles.actionButton}>
          <Ionicons name="eye" size={30} color="#68ff10ff" />
        </Pressable>
      </View>
    </View>
  );
}
