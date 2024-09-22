// Spinner.js
import React from 'react';
import './spinner.css'; // Add your spinner styles here

const Spinner = () => {
    return <div class="spinner-container">
    <div class="lds-roller">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div>
</div>

};

export default Spinner;
