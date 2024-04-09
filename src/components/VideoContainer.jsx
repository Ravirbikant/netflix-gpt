import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const VideoContainer = ({ movieId }) => {
  const getMovieVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();

    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData[0];
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
  return <div>Video Container</div>;
};

export default VideoContainer;
