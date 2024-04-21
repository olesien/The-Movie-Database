const searchForm = document.querySelector("#search");
const typeEl = document.querySelector(".search_type");
const searchField = document.querySelector(".search_field");
const submitSearch = document.querySelector(".submit_search");

let search = "";

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const type = typeEl.value;

    console.log(type, search);
    if (search != "") {
        window.history.pushState(
            null,
            type,
            `/search/${type}.html?text=${search}`
        );
        location.reload();
    }
});

searchField.addEventListener("input", () => {
    search = searchField.value;
    if (search.length === 0) {
        submitSearch.classList.remove("searchable");
        submitSearch.ariaDisabled = true;
    } else {
        submitSearch.classList.add("searchable");
        submitSearch.ariaDisabled = false;
    }
});
