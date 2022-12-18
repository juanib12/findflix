import Peliculas from "./Peliculas";
import Series from "./Series";
import WatchProviders from "./WatchProviders";

const Home = () => {
  return (
    <div className="container bd-grid">
      <WatchProviders />
      <Peliculas query="popular"/>
      <Peliculas query="top_rated"/>
      <Peliculas query="upcoming"/>
      <Series query="popular"/>
    </div>
  );
};

export default Home;
