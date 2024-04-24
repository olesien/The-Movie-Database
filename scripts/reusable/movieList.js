export const renderList = (list, element, includeDescription = false) => {
    element.innerHTML = "";

    list.forEach((data) => {
        const movieDiv = document.createElement("li");
        const imgEl = document.createElement("img");
        imgEl.src = data?.backdrop_path
            ? "https://media.themoviedb.org/t/p/w300_and_h450_bestv2" +
              data.backdrop_path
            : "/images/unknown_movie.jpg";

        const titleEl = document.createElement("h2");
        const linkEl = document.createElement("a");
        linkEl.innerText = data.original_title;
        linkEl.href = "/movie.html?id=" + data.id;
        titleEl.appendChild(linkEl);

        const releaseEl = document.createElement("p");
        releaseEl.innerText =
            data?.release_date != "" ? data.release_date : "Unknown";
        const rowContainer = document.createElement("div");
        rowContainer.classList.add("row-container");
        const topRow = document.createElement("div");
        topRow.classList.add("top-row");

        movieDiv.appendChild(imgEl);
        topRow.appendChild(titleEl);
        topRow.appendChild(releaseEl);
        rowContainer.appendChild(topRow);
        if (includeDescription) {
            const descriptionEl = document.createElement("div");
            descriptionEl.classList.add("bottom-row");
            descriptionEl.innerText = data.overview;
            rowContainer.appendChild(descriptionEl);
        }

        movieDiv.appendChild(rowContainer);

        element.appendChild(movieDiv);
    });
};
