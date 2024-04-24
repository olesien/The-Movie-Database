import { renderMovieList } from "./reusable/renderList.js";
import { getMovieSearch } from "./reusable/movieAPI.js";
import { renderPagination } from "./reusable/render_pagination.js";
const search = document.querySelector(".search_field");

const prevEl = document.querySelector(".prev");
const nextEl = document.querySelector(".next");
const moviesEl = document.querySelector(".movies");
const pagination = document.querySelector(".page");
const titleEl = document.querySelector(".title");
const errorEl = document.querySelector(".error");

const urlParams = new URLSearchParams(window.location.search);

let page = urlParams.get("page") ?? 1;

let searchText = urlParams.get("text") ?? "";
search.value = searchText;
titleEl.innerText = "Search Results - " + searchText;

//Load the movies seen on search page.
const loadMovies = async () => {
    const res = await getMovieSearch(searchText, Number(page));
    if (res.error == false) {
        const data = res.data;
        const movies = data.results;
        if (movies.length == 0) {
            document.querySelector("main").remove();
            errorEl.innerText = "No results found.";
        } else {
            renderMovieList(movies, moviesEl, true);
            console.log(data);
            page = data.page;

            renderPagination(pagination, page, data.total_pages);
        }
    } else {
        document.querySelector("main").remove();
        errorEl.innerText = res.message;
    }
};

prevEl.addEventListener("click", () => {
    if (prevEl.classList.contains("clickable")) {
        //Go to prev page
        prevEl.classList.remove("clickable");
        if (page > 1) page--;
        urlParams.set("page", page);
        window.location.search = urlParams.toString();
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
        window.location.search = urlParams.toString();
        loadMovies();
        scroll(0, 0); //go to top
    }
});

loadMovies();
