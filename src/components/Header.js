import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <nav className="nav bd-grid">
        <div>
          <Link to="/">
          <a href="#" className="nav__logo">
            FindFlix
          </a>
          </Link>
        </div>

        <div className="nav__menu">
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/">
                <a href="#" className="nav__link">
                  Inicio
                </a>
              </Link>
            </li>
            <Link to="/peliculas/top_rated">
            <li className="nav__item">
              <a href="" className="nav__link">
                Mejor valoradas
              </a>
            </li>
            </Link>
            <Link to="/peliculas/popular">
            <li className="nav__item">
              <a href="" className="nav__link">
                Popular
              </a>
            </li>
            </Link>
            <Link to="/peliculas/upcoming">
            <li className="nav__item">
              <a href="" className="nav__link">
                Proximamente
              </a>
            </li>
            </Link>
          </ul>
        </div>

        <Link to="/search" style={{ cursor: "text" }} className="link">
          <div className="icon-search">
            <i class="bx bx-search icon"></i>
          </div>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
