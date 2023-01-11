import React from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

// PlayPause component that takes in props for current playing state, active song, song, handlePause and handlePlay function
const PlayPause = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
}) => {
  // If the song is currently playing and the active song's title matches the passed in song's title
  if (isPlaying && activeSong?.title === song.title) {
    return (
      <FaPauseCircle
        size={35}
        className="text-gray-300"
        onClick={handlePause}
      />
    );
  } else {
    return (
      <FaPlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
    );
  }
};
export default PlayPause;
