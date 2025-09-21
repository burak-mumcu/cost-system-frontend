function Navbar({ setPage }) {
    return (
        <nav className="navbar">
            <button onClick={() => setPage("home")}>Home</button>
            <button onClick={() => setPage("calculate")}>Calculate</button>
            <button onClick={() => setPage("schema")}>Schema</button>
            <button onClick={() => setPage("health")}>Health</button>
        </nav>
    );
}

export default Navbar;
