import { getMovie } from "./reusable/movieAPI.js";
const errorEl = document.querySelector(".error");

const movieTitleEl = document.querySelector(".movie_title");
const movieImgEl = document.querySelector(".movie_img");
const movieDescriptionEl = document.querySelector(".movie_description");
const releaseEl = document.querySelector(".release");
const popularityEl = document.querySelector(".popularity");
const ratingEl = document.querySelector(".rating");
const revenueEl = document.querySelector(".revenue");
const genresEl = document.querySelector(".genres");

export const formattedNumber = (num, returnZero = false) => {
    if (!num || isNaN(num)) {
        if (returnZero) return 0;
        return "";
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

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
        revenueEl.innerText = "$" + formattedNumber(data?.revenue);
        genresEl.innerHTML = data.genres.map(
            (genre) => ` <a href="/genre/${genre.id}">${genre.name}</a>`
        );
        console.log(data);
    } else {
        document.querySelector("main").remove();
        errorEl.innerText = res.message;
    }
};

loadMovie();
