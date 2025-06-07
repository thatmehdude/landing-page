import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <>
        <div className="homepage-container">
            <h3>Welcome to the homepage</h3>
            <p>Here are links to the project pages</p>
            <ul>
                <Link to="/contact-book">Contact book</Link>
                {" "}
                <Link to="/github-search">Github search</Link>
            </ul>
        </div>
        </>
    )
}

export default HomePage