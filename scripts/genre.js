import { renderList } from "./moveList.js";
import { getMoviesByGenre } from "./movieAPI.js";
const moviesEl = document.querySelector(".movies");
const genreTitleEl = document.querySelector(".genre-title");

const urlParams = new URLSearchParams(window.location.search);
genreTitleEl.innerText = "Genre - " + urlParams.get("name") ?? "";
const loadMovies = async () => {
    const data = await getMoviesByGenre(
        Number(urlParams.get("page") ?? 1),
        Number(urlParams.get("id") ?? 1)
    );
    const movies = data.results;
    renderList(movies, moviesEl);
    console.log(data);
};

loadMovies();
