import axios from "axios";
import themoviedb_api from "../key";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = () => {
  return axios(`/trending/movie/day?api_key=${themoviedb_api}`).then(
    (response) => response.data.results
  );
};

export const fetchMovieDetails = (id) => {
  return axios(`/movie/${id}?api_key=${themoviedb_api}`).then(
    (response) => response.data
  );
};

export const fetchMovieCast = (id) => {
  return axios(`/movie/${id}/credits?api_key=${themoviedb_api}`).then(
    (response) => response.data.cast
  );
};

export const fetchMovieReviews = (id) => {
  return axios(
    `/movie/${id}/reviews?api_key=${themoviedb_api}&language=en-US&page=1`
  ).then((response) => response.data.results);
};

export const fetchMoviesWithQuery = (searchQuery) => {
  return axios(
    `/search/movie?api_key=${themoviedb_api}&query=${searchQuery}`
  ).then((response) => response.data.results);
};
