import { renderList } from "./reusable/actorList.js";
import { getActorSearch } from "./reusable/movieAPI.js";
import { renderPagination } from "./reusable/pagination.js";
const search = document.querySelector(".search_field");

const prevEl = document.querySelector(".prev");
const nextEl = document.querySelector(".next");
const moviesEl = document.querySelector(".movies");

const pagination = document.querySelector(".page");
const titleEl = document.querySelector(".title");

const urlParams = new URLSearchParams(window.location.search);

let page = urlParams.get("page") ?? 1;

let searchText = urlParams.get("text") ?? "";
search.value = searchText;

titleEl.innerText = "Search Results - " + searchText;
const loadActors = async () => {
    const data = await getActorSearch(searchText, Number(page));
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
        loadActors();
        scroll(0, 0); //go to top
    }
});

nextEl.addEventListener("click", () => {
    if (nextEl.classList.contains("clickable")) {
        //Go to next page
        page++;
        nextEl.classList.remove("clickable");
        urlParams.set("page", page);
        loadActors();
        scroll(0, 0); //go to top
    }
});

loadActors();
