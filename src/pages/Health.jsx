import { useState } from "react";

function Health() {
    const [health, setHealth] = useState(null);

    const fetchHealth = async (detailed = false) => {
        const res = await fetch(
            `https://cost-system-backend.onrender.com/api/health?detailed=${detailed}`
        );
        const data = await res.json();
        setHealth(data);
    };

    return (
        <div>
            <h2>Health Check</h2>
            <button onClick={() => fetchHealth(false)}>Basic</button>
            <button onClick={() => fetchHealth(true)}>Detailed</button>
            {health && <pre>{JSON.stringify(health, null, 2)}</pre>}
        </div>
    );
}

export default Health;
