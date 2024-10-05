import React, { useState } from "react";
import GridItem from "./GridItem";

const TestRandom = () => {
    const [randomSong, setRandomSong] = useState();

    const handleRandomSong = () => {
        fetch("http://localhost:3500/songs/random/17up")
          .then(res => res.json())
          .then(data => {
            console.log("Data fetched:", data);
            setRandomSong(data);
          })
          .catch(err => console.error("Random song search failed:", err));
    }

    return (
        <div>
            <button onClick={handleRandomSong}>
            Print random song
            </button>

            <div>
                {
                randomSong
                    ? <GridItem key={randomSong.song_id} song={randomSong}/>
                    : <p>Loading...</p>
                }
            </div>
        </div>
    );
}

export default TestRandom;