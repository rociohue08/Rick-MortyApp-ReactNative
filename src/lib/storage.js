import AsyncStorage from "@react-native-async-storage/async-storage";

//clave valor
const KEY ="favourites.characters.v1";

export async function loadFavorites() {

    const raw = await AsyncStorage.getItem(KEY); //usamos para identificar los valores 
    const items = JSON.parse(raw) ||[];
    return items;

}

export async function saveFavorites(items = []){
    const raw = JSON.stringify(items);
    await AsyncStorage.setItem(KEY,raw);
}