import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';

// The Search component is a functional component that displays the search results for a specific query.
const Search = () => {
  // Using the useParams hook, we grab the searchTerm from the URL.
  const { searchTerm } = useParams();
  // We also grab the activeSong, isPlaying, and data from the global state using the useSelector hook.
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  // We map over the data to extract the track information.
  const songs = data?.tracks?.hits.map((song) => song.track);

  // If the data is still being fetched, we display a loading spinner.
  if (isFetching) return <Loader title={`Searching ${searchTerm}...`} />;

  // If there is an error, we display an error message.
  if (error) return <Error />;

  return (
    // The main container for the search results
    <div className="flex flex-col">
      {/* The title displays the search term and the results */}
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>

      {/* The main container for the songs, displaying them in a grid format */}
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
