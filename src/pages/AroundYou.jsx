import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

// This component displays a list of songs based on the user's country location
const CountryTracks = () => {
  const [country, setCountry] = useState('CA'); // Uses the useState hook to initialize the country state as 'CA'
  const [loading, setLoading] = useState(true); //  the loading state as true
  const { activeSong, isPlaying } = useSelector((state) => state.player); // Uses the useSelector hook to access the activeSong and isPlaying state from the global store
  const { data, isFetching, error } = useGetSongsByCountryQuery(country); // Uses the useGetSongsByCountryQuery hook to retrieve the data, isFetching and error states related to the country state

  // The useEffect hook is used to make an API call to determine the user's country location and update the country state
  useEffect(() => {
    if (country === 'CA') {
      axios
        .get(
          `https://geo.ipify.org/api/v2/country?apiKey=${
            import.meta.env.VITE_GEO_API_KEY
          }`
        )
        .then((res) => setCountry(res?.data?.location.country))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [country]);

  // Conditional rendering is used to display a loader or error message while the data is loading or if there is an error
  if (isFetching && loading)
    return <Loader title="Loading Songs around you..." />;

  if (error && country !== '') return <Error />;
  // Otherwise, the component displays a list of songs in a grid format using the SongCard component.
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around you <span className="font-black">{country}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
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

export default CountryTracks;
