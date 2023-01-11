import React from 'react';

import { loader } from '../assets';

// The Loader component displays a loading spinner and a title that can be passed as a prop.
// It is commonly used to indicate that data is being fetched or processed.
const Loader = ({ title }) => (
  <div className="w-full flex justify-center items-center flex-col">
    {/* Add a key to the image to improve performance when re-rendering */}
    <img
      key={loader}
      src={loader}
      alt="loader"
      className="w-32 h-32 object-contain"
    />
    <h1 className="font-bold text-2xl text-white mt-2">{title || 'Loading'}</h1>
  </div>
);
export default Loader;
