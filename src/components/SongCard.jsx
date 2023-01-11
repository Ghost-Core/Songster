import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

// This component is a card that displays a song and its details
// It receives props such as the song, whether it is currently playing, the active song, data and an index
const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  // useDispatch hook is used to dispatch an action to the Redux store
  const dispatch = useDispatch();

  // handlePauseClick is a callback function that is called when the pause button is clicked
  // It dispatches the playPause action with a payload of false to pause the song
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  // handlePlayClick is a callback function that is called when the play button is clicked
  // It dispatches the setActiveSong action with a payload of the song and its data and index
  // It also dispatches the playPause action with a payload of true to play the song
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  // JSX code for rendering the song card with the song details and play/pause buttons
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title
              ? 'flex bg-black bg-opacity-70'
              : 'hidden'
          }`}
        >
          {/* PlayPause component receives props such as isPlaying, activeSong, song and the callback functions for handlePause and handlePlay */}
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          alt="song_img"
          src={song.images?.coverart}
          className="w-full h-full rounded-lg"
        />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          {/* Link component is used for navigating to a specific song page */}
          <Link to={`/songs/${song?.key}`}>{song.title}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          {/* Link component is used for navigating to a specific artist page */}
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : '/top-artists'
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
