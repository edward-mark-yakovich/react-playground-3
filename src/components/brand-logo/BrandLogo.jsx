import './brand-logo.scss';

import React from 'react';

const BrandLogo = ({theme = 'light'}) => {
  return (
    <div className={`brand-logo brand-logo--${theme}`}>
      <div className="grid">
        <span className="brand-logo__icon" />
        <h3 className="brand-logo__copy heading-2">ACME</h3>
      </div>
    </div>
  );
};

export default BrandLogo;
