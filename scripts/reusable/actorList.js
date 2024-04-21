export const renderList = (list, element) => {
    element.innerHTML = "";

    list.forEach((data) => {
        const movieDiv = document.createElement("li");
        const imgEl = document.createElement("img");
        imgEl.src =
            "https://media.themoviedb.org/t/p/w300_and_h450_bestv2" +
            data.profile_path;

        const titleEl = document.createElement("h2");
        const linkEl = document.createElement("a");
        linkEl.innerText = data.original_name;
        linkEl.href = "/actor/" + data.id;
        titleEl.appendChild(linkEl);

        const totalMovies = document.createElement("p");
        totalMovies.innerText = data.known_for.length;

        movieDiv.appendChild(imgEl);
        movieDiv.appendChild(titleEl);
        movieDiv.appendChild(totalMovies);

        element.appendChild(movieDiv);
    });
};
