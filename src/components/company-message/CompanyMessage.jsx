import './company-message.scss';

import React from 'react';
import BrandLogo from '@components/brand-logo/BrandLogo.jsx';

const CompanyMessage = () => {
  return (
    <div className="company-message">
      <div className="company-message__logo">

        <BrandLogo />

      </div>

      <div className="company-message__copy">
        <p className="para-1 para-1--bold">Sign in and start saving your time today.</p>
        <p className="para-2">We provide 24/7 support with our highly dedicated professional team.</p>
        <p className="mice-1">To login : ed@mycompany.com / password</p>
      </div>
    </div>
  );
};

export default CompanyMessage;
