import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  // useParams hook is used to extract the artist id from the URL params
  const { id: artistId } = useParams();

  // useSelector hook is used to access the player state from the Redux store
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // useGetArtistDetailsQuery is a custom hook that handles the logic for fetching the artist details from the API
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery(artistId);

  // If the artist details are currently being fetched, show a loading spinner
  if (isFetchingArtistDetails)
    return <Loader title="Loading artist details..." />;

  // If there is an error fetching the artist details, show an error component
  if (error) return <Error />;

  // Render the artist details and related songs components
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData?.data[0]} />
      <RelatedSongs
        data={artistData?.data[0].views['top-songs']?.data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
