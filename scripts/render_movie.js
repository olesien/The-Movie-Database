import { getMovie, getMovieCredits } from "./reusable/movieAPI.js";
import { formattedNumber } from "./reusable/usefulFuncs.js";

//All elements
const errorEl = document.querySelector(".error");
const movieTitleEl = document.querySelector(".movie_title");
const movieImgEl = document.querySelector(".movie_img");
const movieDescriptionEl = document.querySelector(".movie_description");
const releaseEl = document.querySelector(".release");
const popularityEl = document.querySelector(".popularity");
const ratingEl = document.querySelector(".rating");
const revenueEl = document.querySelector(".revenue");
const genresEl = document.querySelector(".genres");
const actorListEl = document.querySelector(".actor_list");

//URL for search params.
const urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id") ?? 1;

const loadMovie = async () => {
    const res = await getMovie(Number(id));

    if (res.error == false) {
        const data = res.data;
        movieTitleEl.innerText = data.original_title;
        movieImgEl.src = data?.backdrop_path
            ? "https://media.themoviedb.org/t/p/w300_and_h450_bestv2" +
              data.backdrop_path
            : "/images/unknown_movie.jpg";
        movieDescriptionEl.innerText = data?.overview;
        releaseEl.innerText = data?.release_date ?? "Unknown";
        popularityEl.innerText = data?.popularity ?? 0;
        ratingEl.innerText = data?.vote_average + " / 10";

        revenueEl.innerText = data?.revenue
            ? "$" + formattedNumber(data?.revenue)
            : "Unknown";
        genresEl.innerHTML = data.genres.map(
            (genre) =>
                ` <a href="./genre.html?id=${genre.id}&name=${genre.name}">${genre.name}</a>`
        );
        console.log(data);
    } else {
        document.querySelector("main").remove();
        errorEl.innerText = res.message;
    }

    //Load movie addons (movie credits)
    const res2 = await getMovieCredits(Number(id));
    //It's a successful request
    if (res2.error == false) {
        const data = res2.data;
        data.cast.forEach((person) => {
            const tr = document.createElement("tr");
            const imgCell = document.createElement("td");
            imgCell.innerHTML = `<img alt="${
                person.name
            }'s profile image" src="${
                person?.profile_path
                    ? "https://media.themoviedb.org/t/p/w300_and_h450_bestv2" +
                      person.profile_path
                    : "/images/unknown_person.jpg"
            }"/>`;
            const nameCell = document.createElement("td");
            nameCell.innerHTML = `<a href="./actor.html?id=${person.id}">${person.name}</a>`;
            const asCell = document.createElement("td");
            asCell.innerText = person?.known_for_department ?? "Unknown";
            const roleCell = document.createElement("td");
            roleCell.innerText = person?.character ?? "Unknown";

            tr.append(imgCell, nameCell, asCell, roleCell);

            actorListEl.appendChild(tr);
        });
        console.log(data);
    } else {
        //Error
        document.querySelector("main").remove();
        errorEl.innerText = res.message;
    }
};

loadMovie();
