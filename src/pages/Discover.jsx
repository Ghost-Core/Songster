import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
import { genres } from '../assets/constants';

// useDispatch and useSelector hooks from the react-redux library are imported and used to access the state and dispatch actions.
const Discover = () => {
  const dispatch = useDispatch(); // dispatch is used to dispatch an action to update the state in the store.
  const { genreListId } = useSelector((state) => state.player); // retrieves the genreListId from the player state in the store.
  const { activeSong, isPlaying } = useSelector((state) => state.player); // retrieves the activeSong and isPlaying from the player state in the store.
  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || 'POP'
  ); // retrieves data, isFetching and error from the useGetSongsByGenreQuery hook. If genreListId is not present, it defaults to 'POP'.

  // conditional to check if the data is still being fetched and displays a loading spinner if true.
  if (isFetching) return <Loader title="Loading songs..." />;

  // conditional to check if there is an error and displays an error component if true.
  if (error) return <Error />;

  // retrieves the title of the genre from the genres array by matching the value of the genreListId.
  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  // returns JSX to render the discover page.
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>

        {/* select dropdown to allow user to select a different genre to view. */}
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))} // dispatches an action to update the genreListId in the store when a new option is selected.
          value={genreListId || 'pop'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {/* maps through the data and renders a SongCard component for each song. */}
        {data?.map((song, i) => (
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

export default Discover;
