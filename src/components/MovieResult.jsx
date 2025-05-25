import React, { useEffect, useState } from "react";

const TMDB_API_KEY = "efb9e8a4a83601cdfdd5346ccf911519";

const genreMap = {
  "Бойовик": 28,
  "Пригоди": 12,
  "Анімація": 16,
  "Комедія": 35,
  "Кримінал": 80,
  "Документальний": 99,
  "Драма": 18,
  "Сімейний": 10751,
  "Фантастика": 878,
  "Історичний": 36,
  "Жахи": 27,
  "Музика": 10402,
  "Мелодрама": 10749,
  "Фентезі": 14,
  "Трилер": 53,
  "Військовий": 10752,
  "Вестерн": 37,
  "Телевізійний фільм": 10770,
  "Детектив": 9648
};

const MovieResult = ({ answers, onRestart }) => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const fetchMovies = () => {
    const genreId = genreMap[answers.genre];

    let yearFrom = 1950;
    let yearTo = new Date().getFullYear();

    if (answers.era === "Класика (до 2000)") {
      yearTo = 1999;
    } else if (answers.era === "Середній період (2000–2015)") {
      yearFrom = 2000;
      yearTo = 2015;
    } else if (answers.era === "Сучасний (2015+)") {
      yearFrom = 2016;
    }

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&primary_release_date.gte=${yearFrom}-01-01&primary_release_date.lte=${yearTo}-12-31&language=uk&sort_by=popularity.desc`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setMovies(data.results);
          const random = data.results[Math.floor(Math.random() * data.results.length)];
          setMovie(random);
        } else {
          setError("Не знайдено фільмів за заданими критеріями... Спробуйте заново");
        }
      })
      .catch(() => setError("Виникла помилка."));
  };

  useEffect(() => {
    fetchMovies();
  }, [answers]);

  const getAnotherMovie = () => {
    if (movies.length > 1) {
      const alternatives = movies.filter((m) => m.id !== movie.id);
      const random = alternatives[Math.floor(Math.random() * alternatives.length)];
      setMovie(random);
    }
  };

  const openInGoogle = () => {
    const query = `${movie.title} ${movie.release_date?.slice(0, 4)} дивитися українською`;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
  };

  return (
    <div className="result">
      {error && <p>{error}</p>}
      {movie && (
        <div>
          <h2>Рекомендуємо вам фільм:</h2>
          <h3>{movie.title} ({movie.release_date?.slice(0, 4)})</h3>
          <p>{movie.overview}</p>
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ maxWidth: "200px" }}
            />
          )}
          <br />
          <div style={{ marginTop: "15px" }}>
            <button onClick={getAnotherMovie} style={{ marginRight: "10px" }}>
              Обрати інший варіант
            </button>
            <button onClick={openInGoogle} style={{ marginRight: "10px" }}>
              Дивитися фільм!
            </button>
            <button onClick={onRestart}>Шукати заново 🔁</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieResult;
