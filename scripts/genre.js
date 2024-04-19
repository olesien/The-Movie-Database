import { renderList } from "./reusable/moveList.js";
import { getMoviesByGenre } from "./reusable/movieAPI.js";
import { renderPagination } from "./reusable/pagination.js";
const prevEl = document.querySelector(".prev");
const nextEl = document.querySelector(".next");
const moviesEl = document.querySelector(".movies");
const genreTitleEl = document.querySelector(".genre-title");

const pagination = document.querySelector(".page");

const urlParams = new URLSearchParams(window.location.search);
genreTitleEl.innerText = "Genre - " + urlParams.get("name") ?? "";

let page = urlParams.get("page") ?? 1;
const loadMovies = async () => {
    const data = await getMoviesByGenre(
        Number(page),
        Number(urlParams.get("id") ?? 1)
    );
    const movies = data.results;
    renderList(movies, moviesEl);
    console.log(data);
    page = data.page;

    renderPagination(pagination, page, data.total_pages);
};

prevEl.addEventListener("click", () => {
    if (prevEl.classList.contains("clickable")) {
        //Go to prev page
        prevEl.classList.remove("clickable");
        if (page > 1) page--;
        urlParams.set("page", page);
        loadMovies();
        scroll(0, 0); //go to top
    }
});

nextEl.addEventListener("click", () => {
    if (nextEl.classList.contains("clickable")) {
        //Go to next page
        page++;
        nextEl.classList.remove("clickable");
        urlParams.set("page", page);
        loadMovies();
        scroll(0, 0); //go to top
    }
});

loadMovies();
