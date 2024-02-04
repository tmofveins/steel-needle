import { Link } from "react-router-dom";

const Header = () => {
    const content = (
        <div className="header">
            <h1>
                <Link to="/">Steel Needle</Link>
            </h1>
        </div>
    );

    return content;
}

export default Header;