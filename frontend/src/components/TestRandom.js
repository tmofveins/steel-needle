import React, { useState } from "react";
import GridItem from "./GridItem";

const TestRandom = () => {
    const [randomSong, setRandomSong] = useState();

    const handleRandomSong = () => {
        fetch("http://localhost:3500/songs/random/17up")
          .then(res => res.json())
          .then(data => setRandomSong(data))
          .catch(err => console.error("Random song search failed:", err));
    }
  
    return (
        <div>
            <button onClick={handleRandomSong}>
            Print random song
            </button>

            <div>
                {
                randomSong && <GridItem key={randomSong[0].song_id} song={randomSong[0]}/>
                }
            </div>
        </div>
    );
}

export default TestRandom