const authKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYmI1ZjllMzkxYTk4MGY0NmI0ZTZhMWJjNDYxMjUxNyIsInN1YiI6IjYyZmJjN2MyNmU5MzhhMDA3YTNjMTYxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.18qu5fJ5POzrxMgqTaXyHUeOOlEU_ORX9B1UNN74VNM";
export const getGenres = async () => {
    //Return all genres
    try {
        const res = await fetch(
            "https://api.themoviedb.org/3/genre/movie/list?language=en",
            {
                cache: "force-cache",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${authKey}`,
                },
            }
        );
        const json = await res.json();
        console.log(json);
        return json?.genres ?? [];
    } catch (err) {
        console.log(err);
        return [];
    }
};

export const getMoviesByGenre = async (page, id) => {
    //Return all movies by genre
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&with_genres=${id}&sort_by=popularity.desc`,
            {
                cache: "force-cache",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${authKey}`,
                },
            }
        );
        const json = await res.json();
        console.log(json);
        return json;
    } catch (err) {
        console.log(err);
        return [];
    }
};

export const getHighestRatedMovies = async (page) => {
    //Return all movies that are high rated
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
            {
                cache: "force-cache",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${authKey}`,
                },
            }
        );
        const json = await res.json();
        console.log(json);
        return json;
    } catch (err) {
        console.log(err);
        return [];
    }
};

export const getPopularMovies = async (page) => {
    //Return all movies that are popular
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
            {
                cache: "force-cache",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${authKey}`,
                },
            }
        );
        const json = await res.json();
        console.log(json);
        return json;
    } catch (err) {
        console.log(err);
        return [];
    }
};

export const getMovieSearch = async (searchText, page) => {
    //Return all movies that match
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=${page}`,
            {
                cache: "force-cache",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${authKey}`,
                },
            }
        );
        const json = await res.json();
        console.log(json);
        return json;
    } catch (err) {
        console.log(err);
        return [];
    }
};

export const getActorSearch = async (searchText, page) => {
    //Return all actors that match
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/search/person?query=${searchText}&language=en-US&page=${page}`,
            {
                cache: "force-cache",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${authKey}`,
                },
            }
        );
        const json = await res.json();
        console.log(json);
        return json;
    } catch (err) {
        console.log(err);
        return [];
    }
};
