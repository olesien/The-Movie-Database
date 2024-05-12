import { getGenres } from "./reusable/movieAPI.js";
const genresEl = document.querySelector(".genres");
const errorEl = document.querySelector(".error");

//Renders the list of all the genres seen on start page
const loadGenres = async () => {
    const res = await getGenres();
    if (res.error == false) {
        const genres = res.data;

        genresEl.innerHTML = ""; //Clear DOM
        genres.forEach((genre) => {
            const li = document.createElement("li");

            const a = document.createElement("a");
            a.href = "./genre.html?id=" + genre.id + "&name=" + genre.name;
            a.innerText = genre.name;

            li.appendChild(a);

            genresEl.appendChild(li);
        });
    } else {
        document.querySelector("main").remove();
        errorEl.innerText = res.message;
    }
};

loadGenres();
