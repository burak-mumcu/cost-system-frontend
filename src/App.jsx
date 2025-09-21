import { useState } from "react";
import Home from "./pages/Home";
import Calculate from "./pages/Calculate";
import Schema from "./pages/Schema";
import Health from "./pages/Health";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
    const [page, setPage] = useState("home");

    const renderPage = () => {
        switch (page) {
            case "calculate":
                return <Calculate />;
            case "schema":
                return <Schema />;
            case "health":
                return <Health />;
            default:
                return <Home />;
        }
    };

    return (
        <div className="container">
            <Navbar setPage={setPage} />
            <div className="page-content">{renderPage()}</div>
        </div>
    );
}

export default App;
