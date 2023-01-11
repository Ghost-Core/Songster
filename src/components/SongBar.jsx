import React from 'react';
import { Link } from 'react-router-dom';

import PlayPause from './PlayPause';

// This component displays a song bar for each song in the list, with information about the song and an optional play/pause button
const SongBar = ({
  song, // the song object
  i, // the index of the song in the list
  artistId, // the id of the artist (if applicable)
  isPlaying, // whether the song is currently playing or not
  activeSong, // the currently active song
  handlePauseClick, // function to handle pausing the song
  handlePlayClick, // function to handle playing the song
}) => (
  // The main container for the song bar

  <div
    className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
      // Conditional styling for the container based on whether it is the active song
      activeSong?.title === song?.title ? 'bg-[#4c426e]' : 'bg-transparent'
    } py-2 p-4 rounded-lg cursor-pointer mb-2`}
  >
    {/* Displays the song's index */}
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    {/* Container for the song's image and information */}
    <div className="flex-1 flex flex-row justify-between items-center">
      {/* The song's image */}
      <img
        className="w-20 h-20 rounded-lg"
        src={
          // Conditional for the image's source depending on whether it's an artist or a song
          artistId
            ? song?.attributes?.artwork?.url
                .replace('{w}', '125')
                .replace('{h}', '125')
            : song?.images?.coverart
        }
        alt={song?.title}
      />
      {/* Container for the song's title and subtitle/album name */}
      <div className="flex-1 flex flex-col justify-center mx-3">
        {!artistId ? (
          // If it's a song, display a link to its page
          <Link to={`/songs/${song.key}`}>
            <p className="text-xl font-bold text-white">{song?.title}</p>
          </Link>
        ) : (
          // If it's an artist, just display the title
          <p className="text-xl font-bold text-white">
            {song?.attributes?.name}
          </p>
        )}
        <p className="text-base text-gray-300 mt-1">
          {/* Display the subtitle/album name */}
          {artistId ? song?.attributes?.albumName : song?.subtitle}
        </p>
      </div>
    </div>
    {!artistId ? (
      // If it's a song, display the play/pause button
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={() => handlePlayClick(song, i)}
      />
    ) : null}
  </div>
);
export default SongBar;
