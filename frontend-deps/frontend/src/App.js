import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [services, setServices] = useState({});

    const fetchStatus = async () => {
        const res = await axios.get("http://localhost:5000/api/services");
        setServices(res.data);
    };

    const controlService = async (name, action) => {
        await axios.post(`http://localhost:5000/api/service/${name}/${action}`);
        fetchStatus();
    };

    useEffect(() => {
        fetchStatus();
    }, []);

    return (
        <div>
            <h1>AI-IDPS Console -TietoEvry</h1>
            <table>
                <thead>
                    <tr><th>Service</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                    {Object.entries(services).map(([name, data]) => (
                        <tr key={name}>
                            <td>{name}</td>
                            <td>{data.status}</td>
                            <td>
                                <button onClick={() => controlService(name, 'start')}>Start</button>
                                <button onClick={() => controlService(name, 'stop')}>Stop</button>
                                <button onClick={() => controlService(name, 'restart')}>Restart</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
