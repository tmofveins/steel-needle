import React, { useState, useEffect } from 'react';
import GridItem from './GridItem';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [randomSong, setRandomSong] = useState();

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

  const handleRandomSong = () => {
      fetch("http://localhost:3500/songs/random")
        .then(res => res.json())
        .then(data => setRandomSong(data))
        .catch(err => console.error("Random song search failed:", err));

      console.log(randomSong);
  }

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
                    : <div>No matches found.</div>
            )
          }
      </div>

      <button onClick={handleRandomSong}>
        Print random song
      </button>

      <div>
        {
          randomSong 
            && <GridItem key={randomSong[0].song_id} song={randomSong[0]}/>
        }
      </div>
    </div>
  );
}

export default SearchBar;