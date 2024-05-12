//This function renders the movie list seen on most pages. includeDescription is for the search
//Where description is a requirement.
export const renderMovieList = (list, element, includeDescription = false) => {
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
        linkEl.href = "../movie.html?id=" + data.id;
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

//This function renders the list of actors seen on actor search page.
export const renderActorList = (list, element) => {
    element.innerHTML = "";

    list.forEach((data) => {
        const movieDiv = document.createElement("li");
        const imgEl = document.createElement("img");
        imgEl.src = data?.profile_path
            ? "https://media.themoviedb.org/t/p/w300_and_h450_bestv2" +
              data.profile_path
            : "/images/unknown_person.jpg";

        const titleEl = document.createElement("h2");
        const linkEl = document.createElement("a");
        linkEl.innerText = data.original_name;
        linkEl.href = "../actor.html?id=" + data.id;
        titleEl.appendChild(linkEl);

        const department = document.createElement("p");
        department.innerText = data.known_for_department;

        const knownFor = document.createElement("p");
        knownFor.style.width = "250px";
        knownFor.innerText = data.known_for
            .map(
                (film) =>
                    `${
                        film.media_type === "tv"
                            ? film.original_name
                            : film.title
                    } (${film.media_type.replace(/^./, (str) =>
                        str.toUpperCase()
                    )})`
            )
            .join(", ");

        movieDiv.appendChild(imgEl);
        movieDiv.appendChild(titleEl);
        movieDiv.appendChild(department);
        movieDiv.append(imgEl, titleEl, department, knownFor);

        element.appendChild(movieDiv);
    });
};
