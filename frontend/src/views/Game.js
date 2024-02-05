import HelpButton from "../components/HelpButton";
import SearchBar from "../components/SearchBar";
import TestRandom from "../components/TestRandom";
import TestUpdate from "../components/TestUpdate";

const Game = () => {
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