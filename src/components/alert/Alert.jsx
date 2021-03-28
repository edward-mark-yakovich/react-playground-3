import './alert.scss';

import React, { useState, useEffect } from 'react';

const Alert = ({active = false, icon = '', copy = ''}) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    setInit(true);
  }, []);

  return (
    <div style={{'display':`${init ? 'inline-block' : 'none'}`}} className={`alert ${active ? 'alert--active' : ''}`}>
      <div className="grid">
        <div className="alert__icon">{icon}</div>
        <p className="alert__copy">{copy}</p>
      </div>
    </div>
  );
};

export default Alert;
