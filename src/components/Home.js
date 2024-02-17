import Peliculas from "./Peliculas";
import Series from "./Series";
import WatchProviders from "./WatchProviders";
import Hero from './Hero'

const Home = () => {
  return (
    <>
      <Hero />
      <div className="container home bd-grid">
        <WatchProviders />
        <Peliculas query="now_playing" data_top={true}/>
        <Peliculas query="popular"/>
        <Peliculas query="top_rated"/>
        <Peliculas query="upcoming"/>
        <Series query="popular"/>
        <Series query="airing_today"/>
        <Series query="top_rated"/>
      </div>
    </>
  );
};

export default Home;
