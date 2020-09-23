import React, { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import { fetchMoviesWithQuery } from "../../api/movies";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const history = useHistory();
  const location = useLocation();

  const handleOnChange = ({ target }) => {
    setQuery(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query === "") return;
    fetchMoviesWithQuery(query).then((data) => {
      setResult(data);
    });
    history.push({
      search: `?query=${query}`,
    });
  };

  useEffect(() => {
    const { query: queryFromLink = "" } = qs.parse(location.search);
    if (queryFromLink) {
      setQuery(queryFromLink);
      fetchMoviesWithQuery(queryFromLink).then((data) => {
        setResult(data);
      });
    }
  }, [location.search]);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search films"
            value={query}
            onChange={handleOnChange}
          />
        </form>
      </div>
      <ul>
        {result.map((film) => (
          <li key={film.id}>
            <Link
              to={{
                pathname: `/movies/${film.id}`,
                state: { referenced: "/movies", search: location.search },
              }}
            >
              {film.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MoviesPage;
