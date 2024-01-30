import React, { useState, useEffect } from "react";

const Song = ({ song }) => {
    return (
        <div>
            <h3>{song.song_id}</h3>
            <h3>{song.song_title}</h3>
        </div>
    );
}

const SongList = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3500/songs")
            .then(response => response.json())
            .then(data => setSongs(data))
            .catch(err => console.error("Error displaying song data:", err));
    }, []);

    const content = (
        <div>
            {songs.map(song => <Song key={song.song_id} song={song}/>)}
        </div>
    );

    return content;
}

export default SongList;