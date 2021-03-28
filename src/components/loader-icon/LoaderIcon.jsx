import './loader-icon.scss';

import React, { useState, useEffect } from 'react';

const LoaderIcon = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    setInit(true);
  }, []);

  return (
    <div style={{'display':`${init ? 'inline-block' : 'none'}`}} className="loader">
      <div className="loader__spin">

        <svg version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 80 80"
          xmlSpace="preserve">
          <path
            id="spinner"
            fill="#000000"
            d="M40,72C22.4,72,8,57.6,8,40C8,22.4,
            22.4,8,40,8c17.6,0,32,14.4,32,32c0,1.1-0.9,2-2,2
            s-2-0.9-2-2c0-15.4-12.6-28-28-28S12,24.6,12,40s12.6,
            28,28,28c1.1,0,2,0.9,2,2S41.1,72,40,72z"
          />
        </svg>

      </div>
      <p className="loader__message vh">Currently loading, please wait.</p>
    </div>
  );
};

export default LoaderIcon;
