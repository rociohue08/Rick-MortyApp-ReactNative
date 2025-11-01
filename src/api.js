// src/api.js

const BASE_URL = 'https://rickandmortyapi.com/api/character';

/**
 * Obtiene la lista de personajes.
 * @returns {Promise<Array>} Lista de personajes.
 */
export async function getCharacters() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Retornamos solo el array de resultados (los personajes)
    return data.results; 
  } catch (error) {
    console.error("Error fetching characters:", error);
    // Devolvemos un array vacío para evitar que la app crashee
    return []; 
  }
}

/**
 * Obtiene el detalle de un personaje por ID.
 */
export async function getCharacterDetail(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching character ${id} detail:`, error);
    return null;
  }
}