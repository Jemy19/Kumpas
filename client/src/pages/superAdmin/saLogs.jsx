// components/Salogs.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Salogs = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/admin/logs')
      .then(response => {
        console.log('Logs fetched successfully:', response.data); // Log data for debugging
        setLogs(response.data.logs);
      })
      .catch(err => {
        console.error('Error fetching logs:', err); // Log error for debugging
        setError('Error fetching logs');
      });
  }, []);

  return (
    <div>
      <h1>Application Logs</h1>
      {error && <p>{error}</p>}
      <div className="logs-container" style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', padding: '10px', background: '#f5f5f5', borderRadius: '5px' }}>
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
};

export default Salogs;
