export const renderList = (list, element) => {
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
        linkEl.href = "/actor.html?id=" + data.id;
        titleEl.appendChild(linkEl);

        const department = document.createElement("p");
        department.innerText = data.known_for_department;

        movieDiv.appendChild(imgEl);
        movieDiv.appendChild(titleEl);
        movieDiv.appendChild(department);

        element.appendChild(movieDiv);
    });
};
