// src/context/favoritesContext.jsx

import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { loadFavorites, saveFavorites } from '../storage.js'; // Importamos de src/storage.js

// 1. Creación del Contexto
export const FavoriteContext = createContext();

// 2. Función Reducer (El Motor de Estado)
function favoriteReducer(state, action){
    switch (action.type){
        // Carga inicial desde AsyncStorage
        case 'cargaDePersonajes':{
            return action.payload;
        }

        // Añadir a favoritos
        case 'addFavorite':{
            // Evitar duplicados
            if (state.some(fav => fav.id === action.payload.id)){
                return state;
            }
            // Devolver nuevo array inmutable
            return [action.payload, ...state]; 
        }  

        // Eliminar de favoritos
        case 'deleteFavorite':{
            // Devolver nuevo array filtrando por ID
            return state.filter(character => character.id !== action.payload.id);
        }
        default:
            throw new Error (`Unhandled action type: ${action.type}`);
    }
}

// 3. Componente Provider (El Suministrador)
export function FavoriteProvider({ children }) {
    // Hooks de Estado y Reducer
    const [favorites, dispatch] = useReducer(favoriteReducer, []); 
    const [isReady, setIsReady] = useState(false); 

    // --- EFECTO 1: CARGA INICIAL (Cargar de AsyncStorage) ---
    useEffect(() => {
        const initFavorites = async () => {
            const storedFavorites = await loadFavorites();
            dispatch({ type: 'cargaDePersonajes', payload: storedFavorites });
            setIsReady(true); // Carga terminada
        };
        initFavorites();
    }, []); 

    // --- EFECTO 2: GUARDADO (Persistencia al cambiar 'favorites') ---
    useEffect(() => {
        if (isReady) {
            saveFavorites(favorites);
        }
    }, [favorites, isReady]); 

    // --- FUNCIONES DE INTERFAZ (Llaman a dispatch) ---
    
    const addFavorite = (character) => {
        dispatch({ type: 'addFavorite', payload: character });
    };

    const removeFavorite = (character) => {
        dispatch({ type: 'deleteFavorite', payload: character });
    };
    
    // Función isFavorite (lectura optimizada)
    const isFavorite = useMemo(() => (character) => {
        if (!character || !character.id) return false;
        return favorites.some(fav => fav.id === character.id);
    }, [favorites]);

    // Valor que se provee al Context
    const contextValue = {
        favorites,  
        isFavorite,  
        addFavorite,  
        removeFavorite,  
        isReady,       
    };

    return (
        <FavoriteContext.Provider value={contextValue}>
            {children}
        </FavoriteContext.Provider>
    );
}

// 4. Hook Personalizado (Simplifica el consumo en los componentes)
export const useFavorites = () => {
    // Devuelve el 'contextValue'
    return useContext(FavoriteContext); 
};