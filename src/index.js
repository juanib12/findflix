import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movie from "./components/Movie";
import Search from "./components/Search";
import TiposPeliculas from "./components/TiposPeliculas";
import MoviesByGenre from "./components/MoviesByGenre";
import FilterByProvider from "./components/FilterByProvider";
import Serie from "./components/Serie";
import { store } from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter forceRefresh={true}>
    <React.StrictMode>
      <Routes>
        <Route exact path="/" element={
          <Provider store={store}>
            <App />
          </Provider>
        } />
        <Route forceRefresh={true} path="/producto/:id" element={<Movie />} />
        <Route path="/search" element={<Search />} />
        <Route path="/peliculas/:id" element={<TiposPeliculas />} />
        <Route path="/movies_by_genre/:id" element={<MoviesByGenre />} />
        <Route path="/filterbyprovider/:id" element={<FilterByProvider />}/>
        <Route forceRefresh={true} path="/serie/:id" element={<Serie />}/>
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
