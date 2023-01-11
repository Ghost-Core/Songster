import React from 'react';
import { Link } from 'react-router-dom';

// DetailsHeader is a functional component that displays the header for a details page
const DetailsHeader = ({ artistId, artistData, songData }) => {
  // Determine which data to use based on whether the artistId prop is provided
  const data = artistId ? artistData : songData;
  const name = artistId ? artistData?.attributes?.name : songData?.title;
  const subtitle = artistId
    ? artistData?.attributes?.genreNames[0]
    : songData?.genres?.primary;
  const artworkUrl = artistId
    ? artistData?.attributes?.artwork?.url
        .replace('{w}', '500')
        .replace('{h}', '500')
    : songData?.images?.coverart;

  return (
    <div className="relative w-full flex flex-col">
      {/* The div element is styled as a gradient background */}
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

      {/* The div element is styled as an absolute container with flex layout */}
      <div className="absolute inset-0 flex items-center">
        {/* The img element displays the artist's profile picture or the cover art for the song */}
        <img
          alt="profile"
          src={artworkUrl || ''}
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />

        {/* The div element contains the name and genre of the artist or song */}
        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">{name}</p>
          {!artistId && (
            <Link to={`/artists/${songData?.artists[0]?.adamid}`}>
              <p className="text-base text-gray-400 mt-2">
                {songData?.subtitle}
              </p>
            </Link>
          )}

          <p className="text-base text-gray-400 mt-2">{subtitle}</p>
        </div>
      </div>

      {/* The div element is styled as a spacer */}
      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default DetailsHeader;
