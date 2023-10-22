import { Link } from "react-router-dom";

const Header = ({isSearch}) => {
  return (
    <header className="header bd-grid">
      <div>
        <Link to="/">
          <a href="#" className="nav__logo">
            FindFlix
          </a>
        </Link>
      </div>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/">
              <a href="#" className="nav__link">
                Inicio
              </a>
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/peliculas/top_rated">
              <a href="" className="nav__link">
                Mejor valoradas
              </a>
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/peliculas/popular">
              <a href="" className="nav__link">
                Popular
              </a>
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/peliculas/upcoming">
              <a href="" className="nav__link">
                Proximamente
              </a>
            </Link>
          </li>
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
