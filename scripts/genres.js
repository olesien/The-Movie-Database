import { getGenres } from "./movieAPI.js";
const loadGenres = async () => {
    const genres = await getGenres();
    console.log(genres);
};

loadGenres();
