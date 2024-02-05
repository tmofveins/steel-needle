import HelpButton from "../components/HelpButton";
import SearchBar from "../components/SearchBar";
import TestRandom from "../components/TestRandom";

const Game = () => {
    const content = (
        <>
        <SearchBar/>
        <TestRandom/>
        <HelpButton/>
        </>
    );

    return content;
}

export default Game;