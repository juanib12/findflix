import { Link } from "react-router-dom";

const Header = ({isSearch}) => {
  return (
    <header className="header bd-grid">
      <div>
        <Link to="/" className="nav__logo">
          FindFlix
        </Link>
      </div>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/" className="nav__link">
              Inicio
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/peliculas/top_rated" className="nav__link">
              Peliculas
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/peliculas/popular" className="nav__link">
              Series
            </Link>
          </li>
          {/* <li className="nav__item">
            <Link to="/peliculas/upcoming" className="nav__link">
              Proximamente
            </Link>
          </li> */}
        </ul>

        {!isSearch ? (
          <Link to="/search" style={{ cursor: "text" }} className="link">
            <div className="icon-search">
              <span>Buscar pelis, series...</span>
              <i className="bx bx-search icon"></i>
            </div>
          </Link>
        ) : null}

      </nav>
    </header>
  );
};

export default Header;
