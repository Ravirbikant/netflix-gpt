import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoContainer from "./VideoContainer";
import SecondaryContainer from "./SecondaryContainer";
import { useNavigate } from "react-router-dom";

const MainContainer = () => {
  const navigate = useNavigate();
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  if (!movies) return;
  const mainMovie = movies[0];

  const { id } = mainMovie;
  console.log(mainMovie);

  return (
    <div>
      <div className="main-video-container d-flex align-items-center">
        <VideoContainer movieId={id} />
        <div className="video-container-text ms-5 ps-5">
          <h2>{mainMovie?.original_title}</h2>
          <div className="d-flex">
            <button className="me-2">▶ Play</button>
            <button
              onClick={() => {
                setShowMoreInfo(!showMoreInfo);
              }}
            >
              ⓘ More Info
            </button>
          </div>
          <p className="mt-2">{showMoreInfo && mainMovie?.overview}</p>
        </div>
      </div>

      <SecondaryContainer />
    </div>
  );
};

export default MainContainer;
