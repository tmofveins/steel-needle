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
    <>
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type in your guess..."
      />
    </div>

    <ul>
        {searchResults?.map(song => 
            <li key={song.song_id}>{song.song_title}</li>
        )}
    </ul>

    <br></br>
    <button onClick={() => {
        fetch("http://localhost:3500/songs/search?term=style").then(response=>response.json().then(data => console.log(data)))
        }}>test</button>
    </>
  );
}

export default SearchBar;