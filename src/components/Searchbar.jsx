import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FiSearch } from 'react-icons/fi';

// Searchbar component to render the search form and handle the search functionality
const Searchbar = () => {
  // useNavigate hook to navigate to the search page
  const navigate = useNavigate();

  // useState hook to track the search term entered by the user
  const [searchTerm, setSearchTerm] = useState('');

  // handleSubmit function to handle the form submission
  const handleSubmit = (e) => {
    // prevent the default form submission behavior
    e.preventDefault();

    // navigate to the search page with the search term as a parameter
    navigate(`/search/${searchTerm}`);
  };

  // render the form with the search input and icon
  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="p-2 text-gray-400 focus-within:text-gray-600"
    >
      <label htmlFor="search-field" className="sr-only">
        Search all files
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch aria-hidden="true" className="w-5 h-5 ml-4" />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          className="flex-1 bg-transparent border-none placeholder-gray-500 outline-none text-base text-white p-4"
          placeholder="Search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Searchbar;
