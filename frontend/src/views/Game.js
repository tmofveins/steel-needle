import React, { useState, useEffect } from "react";

import HelpButton from "../components/HelpButton";
import SearchBar from "../components/SearchBar";
import TestRandom from "../components/TestRandom";
import TestUpdate from "../components/TestUpdate";
import GuessItem from "../components/GuessItem";

const Game = () => {
    const [solution, setSolution] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [guesses, setGuesses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3500/songs/random/17up")
            .then(res => res.json())
            .then(data => {
                setSolution(data[0]);
                setLoading(false);
                console.log("solution:",data);
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

    function analyzeGuess(guess, solution) {
        console.log(solution);
        return {
            song_title: solution.song_title,
            artist: solution.artist,
        }
    }

    const handleUserGuess = (guess) => {
        const feedback = analyzeGuess(guess, solution);
        setGuesses([...guesses, {guess, feedback}]);
        console.log("guess array", guesses);
        console.log("curr guess", guess);
        console.log("curr feedback", feedback);
    }

    const content = (
        <>
        <SearchBar onGuess={handleUserGuess}/>
        <div className="guesses-list">
            {guesses.map((item, index) => (
                <GuessItem key={index} feedback={item.feedback}/>
            ))}
        </div>
        <TestRandom/>
        <TestUpdate/>
        <HelpButton/>
        </>
    );

    return content;
}

export default Game;