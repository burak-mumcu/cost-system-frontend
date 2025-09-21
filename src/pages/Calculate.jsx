import { useState } from "react";

function Calculate() {
    const [input, setInput] = useState({});
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:4000/api/calculate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input),
            });
            const data = await res.json();
            setResult(data);
        } catch (err) {
            setResult({ error: err.message });
        }
    };

    return (
        <div>
            <h2>Calculate</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Key"
                    onChange={(e) => setInput({ ...input, key: e.target.value })}
                />
                <button type="submit">Send</button>
            </form>
            {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
        </div>
    );
}

export default Calculate;
