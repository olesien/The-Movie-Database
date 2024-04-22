export const renderList = (list, element) => {
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

        movieDiv.appendChild(imgEl);
        movieDiv.appendChild(titleEl);
        movieDiv.appendChild(releaseEl);

        element.appendChild(movieDiv);
    });
};
