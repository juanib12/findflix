import { useMovie } from "../hooks/useMovie";
import MovieHero from "./MovieHero";

const Hero = () => {

    const { movie } = useMovie(null, "popular", "movie");

    return (
        <div>
            {movie.length > 0 ? (
                <MovieHero movieID={movie[0]?.id} isHome={true} query="movie"/>
            ) : null}
        </div>
    )
}

export default Hero;
