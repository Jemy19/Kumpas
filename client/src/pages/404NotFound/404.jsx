import "./404.css";
import React from "react";
import Logo from '@/assets/LOGOKUMPAS.svg'
import { useEffect } from 'react';

function Notfound() {
  useEffect(() => {
    document.body.classList.add('dashboard-body');
    return () => {
      document.body.classList.remove('dashboard-body');
    };
  }, []);

  return (
    <div className="display">
      <div className="display__img select-none pointer-events-none">
        <img src={Logo}/>
      </div>
      <div className="display__content">
        <h2 className="display__content--info">I have bad news for you!</h2>
        <p className="display__content--text">
          The page you are looking for might be removed or is temporarily
          unavailable
        </p>

      </div>
    </div>
  );
}

export default Notfound;