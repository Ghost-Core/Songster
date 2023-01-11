import React from 'react';

import SongBar from './SongBar';

// Define the related songs component
const RelatedSongs = ({
  data,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  // Wrapper div with classname "flex flex-col"

  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
    <div className="mt-6 w-full flex flex-col">
      {/* Map through data passed in as props and render SongBar component for
      each item */}
      {data?.map((song, i) => (
        <SongBar
          // Unique key for each songbar component
          key={`${artistId}-${song.key}-${i}`}
          // Pass song data and artistId as props to the SongBar component
          song={song}
          i={i}
          artistId={artistId}
          // Pass isPlaying and activeSong props to the SongBar component
          isPlaying={isPlaying}
          activeSong={activeSong}
          // Pass handlePauseClick and handlePlayClick functions as props to the SongBar component
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
