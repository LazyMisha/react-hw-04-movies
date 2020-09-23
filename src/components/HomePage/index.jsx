import React, { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import { fetchTrendingMovies } from "../../api/movies";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchTrendingMovies()
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => console.log(error))
      .finally(setIsLoading(false));
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {!isLoading ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { referenced: "/", search: "" },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default HomePage;
