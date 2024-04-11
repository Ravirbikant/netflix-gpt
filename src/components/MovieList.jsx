import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div>
      {title}
      <div className="d-flex overflow-auto">
        {movies &&
          movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
      </div>
    </div>
  );
};

export default MovieList;
