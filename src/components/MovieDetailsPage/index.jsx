import React, { useState, useEffect, lazy } from "react";
import {
  NavLink as Link,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import { fetchMovieDetails } from "../../api/movies";
import styles from "./styles.module.scss";
const Reviews = lazy(() => import("../Reviews"));
const Cast = lazy(() => import("../Cast"));

const MovieDetailsPage = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = props.match.params;
  const { url } = props.match;

  const handleClickOnGoBack = () => {
    const ref = location && location.state ? location.state.referenced : "/";
    const search = location && location.state ? location.state.search : "";
    history.push({
      pathname: ref,
      search: search,
    });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchMovieDetails(id)
      .then((movie) => {
        setMovie(movie);
      })
      .catch((error) => console.log(error))
      .finally(setIsLoading(false));
  }, [id]);

  const {
    backdrop_path,
    original_title: title,
    popularity,
    overview,
    genres,
  } = movie;

  return (
    <>
      {!isLoading && genres ? (
        <>
          <div className={styles.button}>
            <button onClick={handleClickOnGoBack}>&#x2190; Go back</button>
          </div>
          <div className={styles.content}>
            <div className={styles.image}>
              <img
                src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
                alt={title}
              />
            </div>
            <div className={styles.info}>
              <h2>{title}</h2>
              <p>User Score: {popularity}</p>
              <h3>Overview</h3>
              <p>{overview}</p>
              <h3>Genres</h3>
              {genres.map((genre) => (
                <span style={{ paddingRight: 10 }} key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.additional_information}>
            <p>Additional information</p>
            <ul>
              <li>
                <Link to={{ pathname: `${url}/cast`, state: location.state }}>
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={{ pathname: `${url}/reviews`, state: location.state }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <Route path="/movies/:id/cast" component={Cast} />
          <Route path="/movies/:id/reviews" component={Reviews} />
        </>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default MovieDetailsPage;
