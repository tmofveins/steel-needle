import React, { useState, useEffect } from 'react';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const searchSongs = () => {
      if (searchTerm) {
          fetch(`http://localhost:3500/songs/search?term=${searchTerm}`)
                        .then(res => res.json())
                        .then(data => setSearchResults(data))
                        .catch(err => console.error("Song search failed:", err));
        }
    };

    const timeoutId = setTimeout(() => {
      searchSongs();
    }, 500); // Debounce search to limit requests

    // Cleanup function to cancel the timeout if the component unmounts or the term changes
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  return (
    <div className="search-container">
        <input
          className="search-bar"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type in your guess..."
        />

      <div className='dropdown-content'>
          {
            searchTerm && (
                searchResults.length 
                    ? searchResults?.map(song => <div key={song.song_id}>{song.song_title}</div>)
                    : <p>No matches found.</p>
            )
          }
      </div>
    </div>
  );
}

export default SearchBar;