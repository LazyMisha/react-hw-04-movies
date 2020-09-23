import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Suspense fallback={<p>Loading...</p>}>
    <Router>
      <App />
    </Router>
  </Suspense>,
  document.getElementById("root")
);
