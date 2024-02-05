import React, { useState, useEffect } from "react";

import HelpButton from "../components/HelpButton";
import SearchBar from "../components/SearchBar";
import TestRandom from "../components/TestRandom";
import TestUpdate from "../components/TestUpdate";

const Game = () => {
    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:3500/songs/random/17up")
            .then(res => res.json())
            .then(data => {
                setSong(data);
                console.log(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch song:", err);
                setError("Failed to load today's song. Please refresh page and try again.");
                setLoading(false);
            })
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const content = (
        <>
        <SearchBar/>
        <TestRandom/>
        <TestUpdate/>
        <HelpButton/>
        </>
    );

    return content;
}

export default Game;