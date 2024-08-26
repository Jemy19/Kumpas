import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Salogs = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('admin/logs')
      .then((response) => {
        setLogs(response.data.logs);
      })
      .catch((err) => {
        setError('Error fetching logs');
      });
  }, []);

  return (
    <div>
      <h1>Application Logs</h1>
      {error && <p>{error}</p>}
      <div
        className="logs-container"
        style={{
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace',
          padding: '10px',
          background: '#f5f5f5',
          borderRadius: '5px',
        }}
      >
        {logs.map((log, index) => (
          <p key={index}>{`${log.timestamp}: ${log.message}`}</p>
        ))}
      </div>
    </div>
  );
};

export default Salogs;
