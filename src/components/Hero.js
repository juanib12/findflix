import { useMovie } from "../hooks/useMovie";
import MovieHero from "./MovieHero";

const Hero = () => {

    const { movie, loading } = useMovie(null, "popular", "movie");

    return (
        <div>
            {movie.length > 0 ? (
                <MovieHero movieID={movie[0]?.id} isHome={true}/>
            ) : null}
        </div>
    )
}

export default Hero;
