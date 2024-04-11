import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import VideoContainer from "./VideoContainer";
import SecondaryContainer from "./SecondaryContainer";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return;
  const mainMovie = movies[0];

  const { id } = mainMovie;

  return (
    <div>
      Main Container
      <VideoContainer movieId={id} />
      <SecondaryContainer />
    </div>
  );
};

export default MainContainer;
