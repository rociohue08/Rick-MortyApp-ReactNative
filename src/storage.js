/*stoge para la persistencia de datos - asyncStorage */



import AsyncStorage from "@react-native-async-storage/async-storage";

//clave valor
const KEY ="favorites.characters.v1";


/**
 * Carga los favoritos guardados en el dispositivo.
 * @returns {Promise<Array>} El array de favoritos o un array vacío si no hay datos.
 */

export const loadFavorites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(KEY);
    // Si no hay datos (null), devuelve un array vacío. Si hay, lo parsea.
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Storage Error: Falló la carga de favoritos", e);
    // Aseguramos que siempre devuelve un array en caso de error.
    return []; 
  }
};

/**
 * Guarda el array de favoritos actual en el dispositivo.
 * @param {Array} favorites - El array de personajes favoritos.
 */
export const saveFavorites = async (favorites) => {
  try {
    const jsonValue = JSON.stringify(favorites);
    await AsyncStorage.setItem(KEY, jsonValue);
  } catch (e) {
    console.error("Storage Error: Falló el guardado de favoritos", e);
  }
};