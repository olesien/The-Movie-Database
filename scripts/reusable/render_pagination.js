//This function renders the pagination visible on most pages at the bottom. To maintain simplicity,
//It does not try and keep track of the page itself but is simply reran every time page changes.
export const renderPagination = (element, page, maxPages) => {
    const prev = element.querySelector(".prev");
    const current = element.querySelector(".current");
    const next = element.querySelector(".next");

    if (page != 1) {
        prev.classList.add("clickable");
    } else {
        prev.classList.remove("clickable");
    }

    current.innerText = page + " / " + maxPages;

    if (page != maxPages) {
        next.classList.add("clickable");
    } else {
        next.classList.remove("clickable");
    }
};
