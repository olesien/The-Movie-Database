import { getGenres } from "./movieAPI.js";
const genresEl = document.querySelector(".genres");
const loadGenres = async () => {
    const genres = await getGenres();
    genresEl.innerHTML = ""; //Clear DOM
    genres.forEach((genre) => {
        const li = document.createElement("li");

        const a = document.createElement("a");
        a.href = "/genre/" + genre.id;
        a.innerText = genre.name;

        li.appendChild(a);

        genresEl.appendChild(li);
    });
    console.log(genres);
};

loadGenres();
