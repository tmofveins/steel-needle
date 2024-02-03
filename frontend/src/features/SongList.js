import React, { useState, useEffect } from "react";

const Song = ({ song }) => {
    return (
        <div className="grid-item">
            <div className="item-header">{song.song_title}</div>
            <div className="item-value">{song.title_romaji} / {song.artist}</div>
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
        <div className="grid-container">
            {songs.map(song => <Song key={song.song_id} song={song}/>)}
        </div>
    );

    return content;
}

export default SongList;