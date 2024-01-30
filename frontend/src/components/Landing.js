import { Link } from "react-router-dom";

const Landing = () => {
    const content = (
        <main>
            <Link to="/game">Click here to play</Link>
            <br/>
            <Link to="/songs">View song list</Link>
        </main>
    );

    return content;
}

export default Landing;