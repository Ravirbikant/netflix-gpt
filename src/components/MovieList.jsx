import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div>
      {title}
      {/* {movies.map((movie)=>(<MovieCard key={movie.id} posterPath={movie.poster_path} />)} */}
      <div className="d-flex">
        {movies.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
