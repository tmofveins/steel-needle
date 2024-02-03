import { Link } from "react-router-dom";

const Header = () => {
    const content = (
        <h1>
            <Link to="/">Steel Needle</Link>
        </h1>
    );

    return content;
}

export default Header;