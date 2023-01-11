import React from 'react';
import { useNavigate } from 'react-router-dom';

// ArtistCard is a functional component that displays a card for a track
// with a clickable link to the artist's page
const ArtistCard = ({ track }) => {
  // useNavigate is a hook that allows the component to navigate to a new route
  const navigate = useNavigate();

  return (
    // The div element is styled as a card with a clickable link to the artist's page
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() => navigate(`/artists/${track?.artists[0].adamid}`)}
    >
      {/* The img element displays the cover art for the track */}
      <img
        alt="song_img"
        src={track?.images?.coverart || ''}
        className="w-full h-56 rounded-lg"
      />
      {/* The p element displays the subtitle of the track */}
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {track?.subtitle}
      </p>
    </div>
  );
};

export default ArtistCard;
