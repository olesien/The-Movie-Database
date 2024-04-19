import { getGenres } from "./reusable/movieAPI.js";
const genresEl = document.querySelector(".genres");
const loadGenres = async () => {
    const genres = await getGenres();
    genresEl.innerHTML = ""; //Clear DOM
    genres.forEach((genre) => {
        const li = document.createElement("li");

        const a = document.createElement("a");
        a.href = "/genre.html?id=" + genre.id + "&name=" + genre.name;
        a.innerText = genre.name;

        li.appendChild(a);

        genresEl.appendChild(li);
    });
    console.log(genres);
};

loadGenres();
