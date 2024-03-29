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

    const handleUserGuess = (guess) => {
        const feedback = analyzeGuess(guess, solution);
        setGuesses([...guesses, {guess, feedback}]);
    }

    function analyzeGuess(guess, solution) {
        let feedback = {
            bpm: 'R',
            date: 'R',
            version: 'R',
            diff_level: 'R',
            diff_name: 'R',
            chart_type: 'R',
        }

        // other fields to compare: bpm, date, version, diff_level, diff_name, chart_type
        if (guess.song_id === solution.song_id) {
            Object.keys(feedback).forEach(key => {feedback[key] = 'G'});
        } else {
            const guessBPM = parseFloat(guess.bpm);
            const solutionBPM = parseFloat(solution.bpm);

            if (guessBPM === solutionBPM) { 
                feedback.bpm = 'G';
            } else {
                
            }

            const guessDate = parseFloat(guess.date.slice(0,4));
            const solutionDate = parseFloat(solution.date.slice(0,4));

            if (guessDate === solutionDate) {
                feedback.date = 'G';
            } else {
                feedback.date = guessDate > solutionDate ? 'RD' : 'RU';
            }

            const guessVersion = parseFloat(guess.version);
            const solutionVersion = parseFloat(solution.version);

            if (guess.version === solution.version) {
                feedback.version = 'G';
            } else {
                feedback.version = guessVersion > solutionVersion ? 'RD' : 'RU';
            }

            const guessDiffLevel = parseFloat(guess.version);
            const solutionDiffLevel = parseFloat(solution.version);

            if (guessDiffLevel === solutionDiffLevel) {
                feedback.diff_level = 'G';
            } else {
                feedback.diff_level = guessDiffLevel > solutionDiffLevel ? 'RD' : 'RU';
            }

            if (guess.diff_name === solution.diff_name) {
                feedback.diff_name = 'G';
            } else {
                feedback.diff_name = 'R';
            }

            if (guess.chart_type === solution.chart_type) {
                feedback.chart_type = 'G';
            } else {
                feedback.chart_type = 'R';
            }
        }
    
        console.log(feedback);
        return feedback;
    }

    const content = (
        <>
        <SearchBar onGuess={handleUserGuess}/>
        <div className="guesses-list">
            {guesses.map((item, index) => (
                <GuessItem key={index} guess={item.guess} feedback={item.feedback}/>
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