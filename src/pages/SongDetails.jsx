import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from '../redux/services/shazamCore';

// This component displays the details of a song, including its lyrics and related songs.
const SongDetails = () => {
  // Get the dispatch function from the 'react-redux' library
  const dispatch = useDispatch();
  // Get the 'songid' and 'artistId' from the URL parameters using 'useParams' from 'react-router-dom'
  const { songid, id: artistId } = useParams();
  // Get the 'activeSong' and 'isPlaying' state from the 'player' reducer using 'useSelector' from 'react-redux'
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // Get the data, isFetching, and error state of the 'song related' query using a custom hook 'useGetSongRelatedQuery'
  const {
    data,
    isFetching: isFetchinRelatedSongs,
    error,
  } = useGetSongRelatedQuery({ songid });
  // Get the data, isFetching, and error state of the 'song details' query using a custom hook 'useGetSongDetailsQuery'
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });

  // If both queries are still fetching, display a loading spinner
  if (isFetchingSongDetails && isFetchinRelatedSongs)
    return <Loader title="Searching song details" />;

  // Log the songData to the console
  console.log(songData);

  // If there is an error, display an error component
  if (error) return <Error />;

  // 'handlePauseClick' function dispatches the 'playPause' action with 'false' payload
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  // 'handlePlayClick' function dispatches the 'setActiveSong' action with 'song', 'data', and 'i' payload and dispatches the 'playPause' action with 'true' payload
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  // Render the component
  return (
    <div className="flex flex-col">
      {/* Pass the artistId and songData props to the 'DetailsHeader' component */}
      <DetailsHeader artistId={artistId} songData={songData} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

        <div className="mt-5">
          {/* Render the lyrics of the songData, if it exists, otherwise display a message */}
          {songData?.sections[1].type === 'LYRICS' ? (
            songData?.sections[1]?.text.map((line, i) => (
              <p
                key={`lyrics-${line}-${i}`}
                className="text-gray-400 text-base my-1"
              >
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, No lyrics found!
            </p>
          )}
        </div>
      </div>

      <RelatedSongs
        data={data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
