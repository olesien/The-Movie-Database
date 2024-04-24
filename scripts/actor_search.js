import { renderActorList } from "./reusable/renderList.js";
import { getActorSearch } from "./reusable/movieAPI.js";
import { renderPagination } from "./reusable/render_pagination.js";

//Get all elements
const search = document.querySelector(".search_field");
const prevEl = document.querySelector(".prev");
const nextEl = document.querySelector(".next");
const moviesEl = document.querySelector(".movies");
const pagination = document.querySelector(".page");
const titleEl = document.querySelector(".title");
const errorEl = document.querySelector(".error");

//Get url params used for query params
const urlParams = new URLSearchParams(window.location.search);

let page = urlParams.get("page") ?? 1;
let searchText = urlParams.get("text") ?? "";
search.value = searchText;

titleEl.innerText = "Search Results - " + searchText;

//Load the actors
const loadActors = async () => {
    const res = await getActorSearch(searchText, Number(page));
    if (res.error == false) {
        const data = res.data;
        const movies = data.results;
        if (movies.length == 0) {
            document.querySelector("main").remove();
            errorEl.innerText = "No results found.";
        } else {
            renderActorList(movies, moviesEl);
            console.log(data);
            page = data.page;

            renderPagination(pagination, page, data.total_pages);
        }
    } else {
        document.querySelector("main").remove();
        errorEl.innerText = res.message;
    }
};

//Pagination, triggered when pressing back
prevEl.addEventListener("click", () => {
    if (prevEl.classList.contains("clickable")) {
        //Go to prev page
        prevEl.classList.remove("clickable");
        if (page > 1) page--;
        urlParams.set("page", page);
        window.location.search = searchParams.toString();
        loadActors();
        scroll(0, 0); //go to top
    }
});
//Pagination, triggered when pressing forward
nextEl.addEventListener("click", () => {
    if (nextEl.classList.contains("clickable")) {
        //Go to next page
        page++;
        nextEl.classList.remove("clickable");
        urlParams.set("page", page);
        window.location.search = searchParams.toString();
        loadActors();
        scroll(0, 0); //go to top
    }
});

loadActors();
