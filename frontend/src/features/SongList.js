import React, { useState, useEffect } from "react";
import HomeButton from "../components/HomeButton";
import GridItem from "../components/GridItem";

const SongList = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3500/songs")
            .then(response => response.json())
            .then(data => setSongs(data))
            .catch(err => console.error("Error displaying song data:", err));
    }, []);

    const content = (
        <>
        <HomeButton/>
        <div className="grid-container">
            {songs.map(song => <GridItem key={song.song_id} song={song}/>)}
        </div>
        </>
    );

    return content;
}

export default SongList;