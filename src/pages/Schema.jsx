import { useState } from "react";

function Schema() {
    const [schema, setSchema] = useState(null);

    const fetchSchema = async () => {
        const res = await fetch("https://cost-system-backend.onrender.com/api/schema");
        const data = await res.json();
        setSchema(data);
    };

    return (
        <div>
            <h2>Schema</h2>
            <button onClick={fetchSchema}>Load Schema</button>
            {schema && <pre>{JSON.stringify(schema, null, 2)}</pre>}
        </div>
    );
}

export default Schema;
