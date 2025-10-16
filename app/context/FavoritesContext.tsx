// context/FavoritesContext.tsx

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useReducer, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

// --- TIPOS ---
type FavoriteAction = { type: 'SET_FAVORITES', payload: number[] } | { type: 'TOGGLE_FAVORITE', payload: number };
type Dispatch = (action: FavoriteAction) => void;
type State = { favoriteIds: number[] };

// --- CONSTANTES ---
const initialState: State = { favoriteIds: [] };
const ASYNC_STORAGE_KEY = '@MultiversoHub:favorites';

// --- REDUCER ---
function favoritesReducer(state: State, action: FavoriteAction): State {
  switch (action.type) {
    case 'SET_FAVORITES':
      return { favoriteIds: action.payload };
    case 'TOGGLE_FAVORITE':
      const id = action.payload;
      const isFavorite = state.favoriteIds.includes(id);

      let newFavorites: number[];
      if (isFavorite) {
        newFavorites = state.favoriteIds.filter(favId => favId !== id);
      } else {
        newFavorites = [...state.favoriteIds, id];
      }
      
      // 🟢 PERSISTENCIA: Guardar en AsyncStorage
      AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(newFavorites));
      
      return { favoriteIds: newFavorites };
    default:
      return state;
  }
}

// --- CONTEXTOS ---
const FavoritesStateContext = createContext<State | undefined>(undefined);
const FavoritesDispatchContext = createContext<Dispatch | undefined>(undefined);

// --- PROVIDER --- despues impòrtar en layout app
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);
  const [isReady, setIsReady] = useState(false);

  // 🟢 EFECTO: Cargar favoritos al inicio
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
        if (storedFavorites !== null) {
          const parsedFavorites = JSON.parse(storedFavorites);
          dispatch({ type: 'SET_FAVORITES', payload: parsedFavorites });
        }
      } catch (e) {
        console.error("Error al cargar favoritos de AsyncStorage:", e);
      } finally {
        setIsReady(true);
      }
    };
    loadFavorites();
  }, []);

  if (!isReady) {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#68ff10ff" />
            <Text style={styles.loadingText}>Cargando Multiverso...</Text>
        </View>
    );
  }

  return (
    <FavoritesStateContext.Provider value={state}>
      <FavoritesDispatchContext.Provider value={dispatch}>
        {children}
      </FavoritesDispatchContext.Provider>
    </FavoritesStateContext.Provider>
  );
};

const styles = StyleSheet.create({
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
    loadingText: { marginTop: 10, color: '#68ff10ff' }
});

// --- HOOKS DE CONSUMO ---
export const useFavorites = () => {
  const context = useContext(FavoritesStateContext);
  if (context === undefined) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
  }
  return context;
};

// Hook simple para la lógica de añadir/quitar un favorito
export const useFavoriteActions = () => {
  const { favoriteIds } = useFavorites();
  const dispatch = useFavoritesDispatch();
  
  const toggleFavorite = (characterId: number) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: characterId });
  };

  const isFavorite = (characterId: number) => {
    return favoriteIds.includes(characterId);
  };
  
  return { toggleFavorite, isFavorite };
};

const useFavoritesDispatch = () => {
  const context = useContext(FavoritesDispatchContext);
  if (context === undefined) {
    throw new Error('useFavoritesDispatch debe usarse dentro de FavoritesProvider');
  }
  return context;
};