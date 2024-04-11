import React from "react";
import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  return (
    <div>
      <img
        className="movie-card-poster"
        alt="Movie Card"
        src={IMG_CDN + posterPath}
      />
    </div>
  );
};

export default MovieCard;
