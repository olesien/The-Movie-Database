import { getActor, getActorMovies, getActorTvs } from "./reusable/movieAPI.js";
const errorEl = document.querySelector(".error");

const actorTitleEl = document.querySelector(".actor_title");
const actorImgEl = document.querySelector(".actor_img");
const actorDescriptionEl = document.querySelector(".actor_description");
const birthplaceEl = document.querySelector(".birthplace");
const popularityEl = document.querySelector(".popularity");
const genderEl = document.querySelector(".gender");
const moviesEl = document.querySelector(".movies");

const urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id") ?? 1;

//Render the actor and some misc information about them
const loadActor = async () => {
    const res = await getActor(Number(id));

    if (res.error == false) {
        const data = res.data;
        actorTitleEl.innerText = data.name;
        actorImgEl.src = data?.profile_path
            ? "https://media.themoviedb.org/t/p/w300_and_h450_bestv2" +
              data.profile_path
            : "/images/unknown_person.jpg";
        actorDescriptionEl.innerText = data?.biography;
        birthplaceEl.innerText = data?.place_of_birth ?? "Unknown";
        popularityEl.innerText = data?.popularity ?? 0;
        genderEl.innerText = data?.gender
            ? data.gender === 2
                ? "Male"
                : "Female"
            : "Unknown";
        console.log(data);
    } else {
        document.querySelector("main").remove();
        errorEl.innerText = res.message;
    }

    //Load actor addons

    const res2 = await getActorMovies(Number(id));
    if (res2.error == false) {
        const data = res2.data;
        data.cast.forEach((movie) => {
            const link = document.createElement("a");
            link.classList.add("movie");
            link.href = "./movie.html?id=" + movie.id;
            link.innerHTML = `<img alt="${movie.original_title}" src="${
                movie?.backdrop_path
                    ? "https://media.themoviedb.org/t/p/w300_and_h450_bestv2" +
                      movie.backdrop_path
                    : "/images/unknown_movie.jpg"
            }"/><div class="pic-overlay"><p>Movie</p></div>`;

            moviesEl.appendChild(link);
        });
        console.log(data);
    } else {
        document.querySelector("main").remove();
        errorEl.innerText = res.message;
    }

    const res3 = await getActorTvs(Number(id));
    if (res3.error == false) {
        const data = res3.data;
        data.cast.forEach((movie) => {
            const link = document.createElement("a");
            link.classList.add("movie");
            link.href = "./movie.html?id=" + movie.id;
            link.innerHTML = `<img alt="${movie.original_title}" src="${
                movie?.backdrop_path
                    ? "https://media.themoviedb.org/t/p/w300_and_h450_bestv2" +
                      movie.backdrop_path
                    : "/images/unknown_movie.jpg"
            }"/><div class="pic-overlay"><p>TV</p></div>`;

            moviesEl.appendChild(link);
        });
        console.log(data);
    } else {
        document.querySelector("main").remove();
        errorEl.innerText = res.message;
    }
};

loadActor();
