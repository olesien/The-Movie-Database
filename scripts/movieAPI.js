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