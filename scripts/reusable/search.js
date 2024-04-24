const searchForm = document.querySelector("#search");
const typeEl = document.querySelector(".search_type");
const searchField = document.querySelector(".search_field");
const submitSearch = document.querySelector(".submit_search");

let search = "";

//Sets an event listener for when the search is submitted, which will cause the page to change and a forced location reload
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

//This is to make it clear to the user when they can search (setting required on input would work as well)
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
