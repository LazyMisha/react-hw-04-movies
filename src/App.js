import React, { lazy } from "react";
import Header from "./components/Header";
import { Switch, Route } from "react-router-dom";
const HomePage = lazy(() => import("./components/HomePage"));
const MoviesPage = lazy(() => import("./components/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./components/MovieDetailsPage"));

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/movies/:id" component={MovieDetailsPage} />
        <Route path="/movies" component={MoviesPage} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </>
  );
};

export default App;
